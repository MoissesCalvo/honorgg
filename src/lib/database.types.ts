export interface TierEntryRow {
  id: number;
  spec_id: string;
  content_type: "mythic_plus" | "raid" | "pvp";
  rank: "S" | "A" | "B" | "C" | "D";
  score: number;
  notes: string | null;
  patch: string;
  updated_at: string;
}

export interface SpecBuildRow {
  id: number;
  spec_id: string;
  content_type: "mythic_plus" | "raid" | "pvp";
  build_name: string;
  build_description: string | null;
  talent_import: string | null;
  stat_priority: string[];
  key_talents: { name: string; description: string }[];
  hero_talents: { path: string; reason: string; keyNodes: string[] } | null;
  gear_slots: { slot: string; item: string; notes: string | null }[];
  patch: string;
}

export interface Database {
  public: {
    Tables: {
      tier_entries: {
        Row: TierEntryRow;
        Insert: Omit<TierEntryRow, "id" | "updated_at">;
        Update: Partial<Omit<TierEntryRow, "id">>;
      };
      spec_builds: {
        Row: SpecBuildRow;
        Insert: Omit<SpecBuildRow, "id">;
        Update: Partial<Omit<SpecBuildRow, "id">>;
      };
    };
  };
}
