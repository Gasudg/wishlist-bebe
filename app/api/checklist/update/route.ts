import { getSupabaseClient } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const { itemId, unitIndex, checked } = await request.json();

    if (!itemId || unitIndex === undefined || checked === undefined) {
      return Response.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    const recordId = `${itemId}-${unitIndex}`;

    if (checked) {
      // Upsert: insert or update
      const { error } = await supabase.from("checklist_state").upsert(
        {
          id: recordId,
          item_id: itemId,
          unit_index: unitIndex,
          checked: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) throw error;
    } else {
      // Delete if unchecking
      const { error } = await supabase
        .from("checklist_state")
        .delete()
        .eq("id", recordId);

      if (error) throw error;
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating checklist state:", error);
    return Response.json({ error: "Failed to update state" }, { status: 500 });
  }
}
