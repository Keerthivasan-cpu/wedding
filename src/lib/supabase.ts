import { createClient } from "@supabase/supabase-js";

export interface RsvpRecord {
  id?: string;
  guest_name: string;
  attendee_count: number;
  attending: boolean;
  side: "groom" | "bride" | "mutual_friend";
  message?: string | null;
  created_at?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Initial sample blessings if local storage is empty
const INITIAL_MOCK_BLESSINGS: RsvpRecord[] = [
  {
    id: "sample-1",
    guest_name: "Kavitha & Sundar",
    attendee_count: 2,
    attending: true,
    side: "groom",
    message: "Wishing Vijayalakshmi and Ranjith a lifetime of happiness, peace, and endless laughter! May your divine journey together be blessed abundantly.",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "sample-2",
    guest_name: "Dr. Ananthakrishnan",
    attendee_count: 1,
    attending: true,
    side: "bride",
    message: "Warmest congratulations to the lovely couple! May your marriage be filled with divine light, harmony, and joy.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "sample-3",
    guest_name: "Priya & Karthik (UX Team)",
    attendee_count: 2,
    attending: true,
    side: "mutual_friend",
    message: "So thrilled for you both! Ranjith & Viji, you two make such a perfect pair. Can't wait to celebrate in Thiruverkadu!",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

// In-memory / localStorage fallback when Supabase keys are not set
function getLocalRsvps(): RsvpRecord[] {
  if (typeof window === "undefined") return INITIAL_MOCK_BLESSINGS;
  try {
    const data = localStorage.getItem("viji_ranjith_wedding_rsvps");
    if (!data) {
      localStorage.setItem("viji_ranjith_wedding_rsvps", JSON.stringify(INITIAL_MOCK_BLESSINGS));
      return INITIAL_MOCK_BLESSINGS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_MOCK_BLESSINGS;
  }
}

function saveLocalRsvp(record: RsvpRecord) {
  if (typeof window === "undefined") return;
  try {
    const list = getLocalRsvps();
    const newRecord = {
      ...record,
      id: "local-" + Date.now(),
      created_at: new Date().toISOString(),
    };
    const updated = [newRecord, ...list];
    localStorage.setItem("viji_ranjith_wedding_rsvps", JSON.stringify(updated));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

export async function submitRsvp(record: Omit<RsvpRecord, "id" | "created_at">): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    const { error } = await supabase.from("rsvps").insert([record]);
    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } else {
    // Fallback mode
    saveLocalRsvp(record);
    return { success: true };
  }
}

export async function fetchBlessings(): Promise<RsvpRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .eq("attending", true)
      .not("message", "is", null)
      .neq("message", "")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return getLocalRsvps();
    }
    return (data as unknown as RsvpRecord[]) || [];
  } else {
    return getLocalRsvps();
  }
}
