import { getSupabaseClient } from "@/app/lib/supabase";

export async function POST() {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from("checklist_state").delete().neq("id", "");

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error resetting checklist:", error);
    return Response.json({ error: "Failed to reset checklist" }, { status: 500 });
  }
}
