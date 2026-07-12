export interface ChecklistItem {
  id: string;
  label: string;
  quantity: number;
  section: string;
}

export interface ChecklistSection {
  name: string;
  note?: string;
  items: ChecklistItem[];
}

export const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    name: "RN",
    note: "Recién nacido · 0–1 mes",
    items: [
      { id: "rn_1", label: "Bodies manga corta", quantity: 7, section: "RN" },
      { id: "rn_2", label: "Bodies manga larga", quantity: 3, section: "RN" },
      {
        id: "rn_3",
        label: "Mamelucos/enteritos livianos de algodón",
        quantity: 5,
        section: "RN",
      },
      {
        id: "rn_4",
        label: "Mantitas de muselina livianas",
        quantity: 2,
        section: "RN",
      },
      {
        id: "rn_5",
        label: "Gorritos de algodón fino",
        quantity: 2,
        section: "RN",
      },
      {
        id: "rn_6",
        label: "Escarpines/medias finitas",
        quantity: 5,
        section: "RN",
      },
      { id: "rn_7", label: "Baberos", quantity: 3, section: "RN" },
      {
        id: "rn_8",
        label: "Remeras manga corta",
        quantity: 3,
        section: "RN",
      },
      {
        id: "rn_9",
        label: "Remeras manga larga",
        quantity: 2,
        section: "RN",
      },
      {
        id: "rn_10",
        label: "Camperita liviana",
        quantity: 1,
        section: "RN",
      },
    ],
  },
  {
    name: "1–3M",
    note: "1 a 3 meses · verano",
    items: [
      {
        id: "1_3m_1",
        label: "Bodies manga corta",
        quantity: 7,
        section: "1–3M",
      },
      { id: "1_3m_2", label: "Mamelucos livianos", quantity: 5, section: "1–3M" },
      {
        id: "1_3m_3",
        label: "Conjuntos remera+short o musculosa",
        quantity: 3,
        section: "1–3M",
      },
      {
        id: "1_3m_4",
        label: "Gorrito con visera",
        quantity: 1,
        section: "1–3M",
      },
      { id: "1_3m_5", label: "Traje de baño", quantity: 1, section: "1–3M" },
      {
        id: "1_3m_6",
        label: "Toalla con capucha",
        quantity: 1,
        section: "1–3M",
      },
      {
        id: "1_3m_7",
        label: "Medias finitas",
        quantity: 5,
        section: "1–3M",
      },
      {
        id: "1_3m_8",
        label: "Bodies musculosa",
        quantity: 5,
        section: "1–3M",
      },
      {
        id: "1_3m_9",
        label: "Pantalones livianos",
        quantity: 3,
        section: "1–3M",
      },
      {
        id: "1_3m_10",
        label: "Remeras manga corta",
        quantity: 5,
        section: "1–3M",
      },
      {
        id: "1_3m_11",
        label: "Remeras manga larga",
        quantity: 2,
        section: "1–3M",
      },
      {
        id: "1_3m_12",
        label: "Camperita liviana",
        quantity: 1,
        section: "1–3M",
      },
    ],
  },
  {
    name: "3–6M",
    note: "3 a 6 meses · otoño/invierno",
    items: [
      {
        id: "3_6m_1",
        label: "Bodies manga larga",
        quantity: 7,
        section: "3–6M",
      },
      {
        id: "3_6m_2",
        label: "Mamelucos o conjuntos abrigados",
        quantity: 5,
        section: "3–6M",
      },
      {
        id: "3_6m_3",
        label: "Camperitas o sweaters livianos",
        quantity: 3,
        section: "3–6M",
      },
      {
        id: "3_6m_4",
        label: "Campera abrigada",
        quantity: 1,
        section: "3–6M",
      },
      {
        id: "3_6m_5",
        label: "Gorrito de lana",
        quantity: 1,
        section: "3–6M",
      },
      {
        id: "3_6m_6",
        label: "Medias y escarpines abrigados",
        quantity: 5,
        section: "3–6M",
      },
      {
        id: "3_6m_7",
        label: 'Pijamas enteros con pie "pilita"',
        quantity: 4,
        section: "3–6M",
      },
      {
        id: "3_6m_8",
        label: "Pantalones abrigados",
        quantity: 5,
        section: "3–6M",
      },
      {
        id: "3_6m_9",
        label: "Remeras manga larga",
        quantity: 5,
        section: "3–6M",
      },
      {
        id: "3_6m_10",
        label: "Remeras manga corta",
        quantity: 2,
        section: "3–6M",
      },
    ],
  },
  {
    name: "Equipo esencial",
    items: [
      { id: "equipo_1", label: "Cochecito", quantity: 1, section: "Equipo esencial" },
      {
        id: "equipo_2",
        label: "Sillita de auto",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_3",
        label: "Espejo retrovisor para auto",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_4",
        label: "Bañera para bebé",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_5",
        label: "Moisés o cuna de colecho",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_6",
        label: "Sacaleches",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_7",
        label: "Esterilizador de biberones",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_8",
        label: "Monitor de bebé",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_9",
        label: "Termómetro corporal digital",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_10",
        label: "Portabebé/fular o mochila ergonómica",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_11",
        label: "Cambiador portátil",
        quantity: 1,
        section: "Equipo esencial",
      },
      {
        id: "equipo_12",
        label: "Botiquín básico",
        quantity: 1,
        section: "Equipo esencial",
      },
    ],
  },
  {
    name: "Alimentación",
    items: [
      {
        id: "alim_1",
        label: "Bolso maternal/pañalera",
        quantity: 1,
        section: "Alimentación",
      },
      { id: "alim_2", label: "Mamaderas", quantity: 4, section: "Alimentación" },
      {
        id: "alim_3",
        label: "Bolsas para conservar leche materna",
        quantity: 20,
        section: "Alimentación",
      },
      {
        id: "alim_4",
        label: "Calienta biberones",
        quantity: 1,
        section: "Alimentación",
      },
      {
        id: "alim_5",
        label: "Almohada de lactancia",
        quantity: 1,
        section: "Alimentación",
      },
      { id: "alim_6", label: "Chupetes", quantity: 3, section: "Alimentación" },
      {
        id: "alim_7",
        label: "Babitas/paños de provechito",
        quantity: 6,
        section: "Alimentación",
      },
    ],
  },
  {
    name: "Higiene y consumibles",
    items: [
      {
        id: "hig_1",
        label: "Pañales talle RN (paquete inicial)",
        quantity: 1,
        section: "Higiene y consumibles",
      },
      {
        id: "hig_2",
        label: "Pañales talle 1 (paquete inicial)",
        quantity: 1,
        section: "Higiene y consumibles",
      },
      {
        id: "hig_3",
        label: "Toallitas húmedas",
        quantity: 1,
        section: "Higiene y consumibles",
      },
      {
        id: "hig_4",
        label: "Crema para la colita",
        quantity: 1,
        section: "Higiene y consumibles",
      },
      {
        id: "hig_5",
        label: "Cortaúñas de bebé",
        quantity: 1,
        section: "Higiene y consumibles",
      },
      {
        id: "hig_6",
        label: "Cepillo suave para el pelo",
        quantity: 1,
        section: "Higiene y consumibles",
      },
    ],
  },
  {
    name: "Descanso y cuna",
    items: [
      {
        id: "des_1",
        label: "Sábanas ajustables extra",
        quantity: 3,
        section: "Descanso y cuna",
      },
      {
        id: "des_2",
        label: "Protector de colchón impermeable",
        quantity: 1,
        section: "Descanso y cuna",
      },
      {
        id: "des_3",
        label: "Muselinas/paños para upar",
        quantity: 5,
        section: "Descanso y cuna",
      },
    ],
  },
  {
    name: "Estimulación y confort",
    items: [
      {
        id: "est_1",
        label: "Hamaca o mecedora",
        quantity: 1,
        section: "Estimulación y confort",
      },
      {
        id: "est_2",
        label: "Gimnasio de actividades/manta de juego",
        quantity: 1,
        section: "Estimulación y confort",
      },
      {
        id: "est_3",
        label: "Móvil para la cuna",
        quantity: 1,
        section: "Estimulación y confort",
      },
    ],
  },
  {
    name: "Bolso mamá",
    items: [
      {
        id: "bmama_1",
        label: "Camisones cortos con abrochador adelante",
        quantity: 3,
        section: "Bolso mamá",
      },
      { id: "bmama_2", label: "Pantuflas", quantity: 1, section: "Bolso mamá" },
      {
        id: "bmama_3",
        label: "Juegos de ropa interior",
        quantity: 6,
        section: "Bolso mamá",
      },
      { id: "bmama_4", label: "Gorra de ducha", quantity: 1, section: "Bolso mamá" },
      {
        id: "bmama_5",
        label: "Artículos de higiene personal",
        quantity: 1,
        section: "Bolso mamá",
      },
      {
        id: "bmama_6",
        label: "Documentos (carné perinatal)",
        quantity: 1,
        section: "Bolso mamá",
      },
      { id: "bmama_7", label: "Salto de cama", quantity: 1, section: "Bolso mamá" },
    ],
  },
  {
    name: "Bolso bebé",
    items: [
      {
        id: "bbebe_1",
        label: "Batitas de algodón y/o bodies",
        quantity: 4,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_2",
        label: "Batitas de lana y drálon",
        quantity: 4,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_3",
        label: "Peleles de algodón",
        quantity: 4,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_4",
        label: "Peleles de lana y drálon",
        quantity: 4,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_5",
        label: "Pañales RN",
        quantity: 12,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_6",
        label: "Pares de medias",
        quantity: 4,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_7",
        label: "Rebozos: 1 lana + 1 algodón",
        quantity: 2,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_8",
        label: "Cambiador",
        quantity: 1,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_9",
        label: "Cepillo de pelo",
        quantity: 1,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_10",
        label: "Batitas de nansú",
        quantity: 3,
        section: "Bolso bebé",
      },
      {
        id: "bbebe_11",
        label: "Chiripás",
        quantity: 4,
        section: "Bolso bebé",
      },
    ],
  },
  {
    name: "1° muda",
    note: "En bolsa ziploc, identificada",
    items: [
      { id: "muda_1", label: "Rebozo", quantity: 1, section: "1° muda" },
      { id: "muda_2", label: "Batita de lana", quantity: 1, section: "1° muda" },
      { id: "muda_3", label: "Batita de algodón", quantity: 1, section: "1° muda" },
      { id: "muda_4", label: "Pañal", quantity: 1, section: "1° muda" },
      { id: "muda_5", label: "Par de medias", quantity: 1, section: "1° muda" },
      { id: "muda_6", label: "Batita de nansú", quantity: 1, section: "1° muda" },
      { id: "muda_7", label: "Chiripá", quantity: 1, section: "1° muda" },
    ],
  },
];

export function getAllItems(): ChecklistItem[] {
  return CHECKLIST_SECTIONS.flatMap((section) => section.items);
}

export function getItemById(id: string): ChecklistItem | undefined {
  return getAllItems().find((item) => item.id === id);
}
