import { getSupabaseClient } from "@/app/lib/supabase";
import { getAllItems } from "@/app/data/checklist";

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("checklist_state")
      .select("*");

    if (error && error.code !== "PGRST116") {
      // PGRST116 = table doesn't exist
      throw error;
    }

    // Group by item_id and unit
    const states: Record<string, Array<{ unitIndex: number; checked: boolean }>> =
      {};
    const allItems = getAllItems();

    // Initialize all items with unchecked states
    allItems.forEach((item) => {
      states[item.id] = Array.from({ length: item.quantity }, (_, idx) => ({
        unitIndex: idx,
        checked: false,
      }));
    });

    // Apply DB data
    if (data) {
      data.forEach((row: any) => {
        if (states[row.item_id]) {
          const unitIndex = row.unit_index || 0;
          if (states[row.item_id][unitIndex]) {
            states[row.item_id][unitIndex].checked = row.checked;
          }
        }
      });
    }

    return Response.json(states);
  } catch (error) {
    console.error("Error fetching checklist state:", error);
    return Response.json({ error: "Failed to fetch state" }, { status: 500 });
  }
}
