export interface ChecklistState {
  item_id: string;
  checked: boolean;
  updated_at: string;
}

export interface ChecklistItemState {
  id: string;
  unitIndex: number; // 0-based index for multi-quantity items
  checked: boolean;
}
