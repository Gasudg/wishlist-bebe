"use client";

import { ChecklistItem, ChecklistSection as IChecklistSection } from "@/app/data/checklist";
import { ChecklistItemState } from "@/app/lib/types";
import { ProgressBar } from "./ProgressBar";

interface ChecklistSectionProps {
  section: IChecklistSection;
  states: Map<string, ChecklistItemState[]>;
  onItemChange: (itemId: string, unitIndex: number, checked: boolean) => void;
}

export function ChecklistSection({
  section,
  states,
  onItemChange,
}: ChecklistSectionProps) {
  const itemsInSection = section.items;
  const checkedItems = itemsInSection.reduce((acc, item) => {
    const itemStates = states.get(item.id) || [];
    const checkedCount = itemStates.filter((s) => s.checked).length;
    return acc + checkedCount;
  }, 0);
  const totalItems = itemsInSection.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="card">
      <h2 className="section-title">{section.name}</h2>
      {section.note && <p className="section-note">{section.note}</p>}

      <div className="progress-container">
        <ProgressBar
          checked={checkedItems}
          total={totalItems}
          label={`${section.name}`}
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        {[...itemsInSection]
          .sort((a, b) => (a.quantity === 1 ? 0 : 1) - (b.quantity === 1 ? 0 : 1))
          .map((item) => (
            <ItemRenderer
              key={item.id}
              item={item}
              states={states.get(item.id) || []}
              onItemChange={onItemChange}
            />
          ))}
      </div>
    </div>
  );
}

interface ItemRendererProps {
  item: ChecklistItem;
  states: ChecklistItemState[];
  onItemChange: (itemId: string, unitIndex: number, checked: boolean) => void;
}

function ItemRenderer({
  item,
  states,
  onItemChange,
}: ItemRendererProps) {
  const allStates = Array.from({ length: item.quantity }, (_, i) => {
    return states[i] || { id: item.id, unitIndex: i, checked: false };
  });

  if (item.quantity === 1) {
    const state = allStates[0];
    return (
      <div className={`checkbox-tile ${state.checked ? "checked" : ""}`}>
        <input
          type="checkbox"
          id={item.id}
          checked={state.checked}
          onChange={(e) => onItemChange(item.id, 0, e.target.checked)}
        />
        <label htmlFor={item.id}>{item.label}</label>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div className="item-label">{item.label}</div>
      <div className="numbered-tiles">
        {allStates.map((state, idx) => (
          <button
            key={`${item.id}-${idx}`}
            className={`numbered-tile ${state.checked ? "checked" : ""}`}
            onClick={() => onItemChange(item.id, idx, !state.checked)}
            type="button"
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
