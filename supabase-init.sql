-- Create checklist_state table
CREATE TABLE IF NOT EXISTS checklist_state (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  unit_index INTEGER DEFAULT 0,
  checked BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_checklist_item_id ON checklist_state(item_id);

-- Enable RLS (Row Level Security) if needed
ALTER TABLE checklist_state ENABLE ROW LEVEL SECURITY;

-- Create policy allowing all read/write access (for public checklist)
CREATE POLICY "Allow all access" ON checklist_state
  FOR ALL USING (TRUE) WITH CHECK (TRUE);
