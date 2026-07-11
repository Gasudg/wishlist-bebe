"use client";

import { useEffect, useState } from "react";
import {
  CHECKLIST_SECTIONS,
  getAllItems,
} from "@/app/data/checklist";
import { ChecklistItemState } from "@/app/lib/types";
import { ChecklistSection } from "./ChecklistSection";
import { ProgressBar } from "./ProgressBar";
import jsPDF from "jspdf";

export function Checklist() {
  const [states, setStates] = useState<Map<string, ChecklistItemState[]>>(
    new Map()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    fetchStatesSilent();
    const pollInterval = setInterval(fetchStatesSilent, 5000);

    // Scroll animations
    setTimeout(() => {
      const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    }, 100);

    // WebGL Shader
    initShader();

    return () => clearInterval(pollInterval);
  }, []);

  async function fetchStatesSilent() {
    try {
      const response = await fetch("/api/checklist/state");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();

      const newStates = new Map<string, ChecklistItemState[]>();
      getAllItems().forEach((item) => {
        const itemStates = data[item.id] || [];
        newStates.set(item.id, itemStates);
      });

      setStates(newStates);
      setLastSync(new Date());
    } catch (error) {
      console.error("Failed to fetch checklist state:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchStates() {
    setIsSyncing(true);
    try {
      const response = await fetch("/api/checklist/state");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();

      const newStates = new Map<string, ChecklistItemState[]>();
      getAllItems().forEach((item) => {
        const itemStates = data[item.id] || [];
        newStates.set(item.id, itemStates);
      });

      setStates(newStates);
      setLastSync(new Date());
    } catch (error) {
      console.error("Failed to fetch checklist state:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSyncing(false), 800);
    }
  }

  async function handleItemChange(
    itemId: string,
    unitIndex: number,
    checked: boolean
  ) {
    const newStates = new Map(states);
    const itemStates = [...(newStates.get(itemId) || [])];
    itemStates[unitIndex] = { id: itemId, unitIndex, checked };
    newStates.set(itemId, itemStates);
    setStates(newStates);

    try {
      await fetch("/api/checklist/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, unitIndex, checked }),
      });
      fetchStates();
    } catch (error) {
      console.error("Failed to update item:", error);
      fetchStates();
    }
  }

  async function handleReset() {
    if (
      !confirm(
        "¿Estás segura de que querés reiniciar el checklist? Se borrarán todos los ítems marcados."
      )
    ) {
      return;
    }

    try {
      await fetch("/api/checklist/reset", { method: "POST" });
      setStates(new Map());
      fetchStates();
    } catch (error) {
      console.error("Failed to reset checklist:", error);
    }
  }

  function initShader() {
    try {
      const canvas = document.getElementById("hero-shader") as HTMLCanvasElement;
      if (!canvas) return;
      const gl = canvas.getContext("webgl");
      if (!gl) return;

      const vsSource = `attribute vec4 aVertexPosition; void main() { gl_Position = aVertexPosition; }`;
      const fsSource = `precision mediump float; uniform vec2 u_resolution; uniform float u_time;
        float noise(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float n = sin(uv.x * 3.0 + u_time * 0.1) * cos(uv.y * 2.0 - u_time * 0.05);
          n = n * 0.5 + 0.5;
          vec3 color1 = vec3(1.0, 0.97, 0.96);
          vec3 color2 = vec3(0.99, 0.93, 0.95);
          vec3 finalColor = mix(color1, color2, n);
          gl_FragColor = vec4(finalColor, 1.0);
        }`;

      function createShader(type: number, src: string) {
        const s = gl!.createShader(type);
        if (!s) return null;
        gl!.shaderSource(s, src);
        gl!.compileShader(s);
        return s;
      }

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return;

      const prog = gl.createProgram();
      if (!prog) return;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(prog, "aVertexPosition");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(prog, "u_time");
      const uRes = gl.getUniformLocation(prog, "u_resolution");

      function syncSize() {
        const w = canvas.clientWidth || 1280;
        const h = canvas.clientHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
      }

      function render(t: number) {
        syncSize();
        gl!.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) gl!.uniform1f(uTime, (t * 0.001) % 1000);
        if (uRes) gl!.uniform2f(uRes, canvas.width, canvas.height);
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    } catch (e) {
      console.error("Shader error:", e);
    }
  }

  function exportPDF() {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    let yPos = margin;
    const lineHeight = 5;

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Wishlist de Juanita", margin, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    const today = new Date().toLocaleDateString("es-AR");
    pdf.text(`Generado: ${today}`, margin, yPos);
    yPos += 8;

    pdf.setDrawColor(249, 168, 212);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;

    CHECKLIST_SECTIONS.forEach((section) => {
      const pendingItems = section.items.filter((item) => {
        const itemStates = states.get(item.id) || [];
        const checkedCount = itemStates.filter((s) => s.checked).length;
        return checkedCount < item.quantity;
      });

      if (pendingItems.length === 0) return;

      if (yPos > pageHeight - 30) {
        pdf.addPage();
        yPos = margin;
      }

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${section.name}`, margin, yPos);
      yPos += 6;

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");

      pendingItems.forEach((item) => {
        const itemStates = states.get(item.id) || [];
        const checkedCount = itemStates.filter((s) => s.checked).length;
        const remaining = item.quantity - checkedCount;

        const text = `• ${item.label} — faltan ${remaining} de ${item.quantity}`;
        const lines = pdf.splitTextToSize(text, maxWidth - 10) as string[];

        lines.forEach((line: string) => {
          if (yPos > pageHeight - 15) {
            pdf.addPage();
            yPos = margin;
          }
          pdf.text(line, margin + 5, yPos);
          yPos += lineHeight;
        });
      });

      yPos += 4;
    });

    const fileName = `wishlist-pendientes-${today.replace(/\//g, "-")}.pdf`;
    pdf.save(fileName);
  }

  if (isLoading) {
    return <div style={{ textAlign: "center", padding: "2rem", color: "#999" }}>Cargando...</div>;
  }

  const allItems = getAllItems();
  const totalChecked = Array.from(states.values()).reduce(
    (acc, itemStates) => acc + itemStates.filter((s) => s.checked).length,
    0
  );
  const totalItems = allItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ background: "#fff8f4", minHeight: "100vh", paddingTop: "70px" }}>
      <header className="sticky-header">
        <div className="header-content">
          <div className="brand-name">Wishlist de Juanita</div>
          <div className="header-actions">
            <button className="header-btn" onClick={exportPDF}>
              Exportar PDF
            </button>
            <button className="header-btn" onClick={handleReset}>
              Reiniciar
            </button>
          </div>
        </div>
      </header>

      <section style={{
        position: "relative",
        maxWidth: "1280px",
        width: "100%",
        margin: "0 auto",
        padding: "0 1.25rem",
        aspectRatio: "1310 / 240",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundImage: "url('/hero.webp')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#faf7f3"
      }}>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "48rem", margin: "0 auto", width: "100%" }}>
          <span className="hero-tag">Preparativos para bebé</span>
          <h1 className="hero-title-fancy">Wishlist de Juanita</h1>
          <p className="hero-subtitle" style={{ marginBottom: 0 }}>Checklist por talle · nace en enero</p>
        </div>
      </section>

      <main className="main-content" style={{ gap: "1.5rem" }}>
        <section className="section">
          <div className="card">
            <h2 className="section-title">Progreso general</h2>
            <div className="progress-container">
              <ProgressBar checked={totalChecked} total={totalItems} label="Total" />
              {lastSync && <p style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.5rem" }}>Última actualización: {lastSync.toLocaleTimeString("es-AR")}</p>}
            </div>
          </div>
        </section>

        {CHECKLIST_SECTIONS.map((section) => (
          <ChecklistSection key={section.name} section={section} states={states} onItemChange={handleItemChange} />
        ))}
      </main>

      <div
        className="sync-badge"
        title={isSyncing ? "Sincronizando..." : lastSync ? `Sincronizado ${lastSync.toLocaleTimeString("es-AR")}` : ""}
      >
        {isSyncing ? (
          <span style={{ display: "inline-block", width: "12px", height: "12px", border: "2px solid #e8b8a8", borderRadius: "50%", borderTop: "2px solid transparent", animation: "spin 0.6s linear infinite" }} />
        ) : (
          <span style={{ color: "#c8a898", fontSize: "0.8rem" }}>✓</span>
        )}
      </div>
    </div>
  );
}
