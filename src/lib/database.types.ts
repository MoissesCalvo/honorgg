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

export interface Database {
  public: {
    Tables: {
      tier_entries: {
        Row: TierEntryRow;
        Insert: Omit<TierEntryRow, "id" | "updated_at">;
        Update: Partial<Omit<TierEntryRow, "id">>;
      };
    };
  };
}
