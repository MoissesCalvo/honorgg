import { supabase } from "./supabase";
import { ContentType, TierRank } from "./wow-data";
import { TierEntryRow } from "./database.types";

export interface TierEntry {
  specId: string;
  rank: TierRank;
  score: number;
  notes?: string;
}

export interface TierList {
  contentType: ContentType;
  patch: string;
  updatedAt: string;
  entries: TierEntry[];
}

// Cache per content type for the duration of a server render
const cache = new Map<ContentType, TierList>();

export async function getTierList(contentType: ContentType): Promise<TierList | null> {
  if (cache.has(contentType)) return cache.get(contentType)!;

  const { data: raw, error } = await supabase
    .from("tier_entries")
    .select("spec_id, rank, score, notes, patch, updated_at")
    .eq("content_type", contentType)
    .order("score", { ascending: false });

  const data = raw as TierEntryRow[] | null;
  if (error || !data || data.length === 0) return null;

  const tierList: TierList = {
    contentType,
    patch: data[0].patch,
    updatedAt: data[0].updated_at.slice(0, 10),
    entries: data.map((row) => ({
      specId: row.spec_id,
      rank: row.rank as TierRank,
      score: row.score,
      notes: row.notes ?? undefined,
    })),
  };

  cache.set(contentType, tierList);
  return tierList;
}

export async function getEntriesByRank(contentType: ContentType, rank: TierRank): Promise<TierEntry[]> {
  const tl = await getTierList(contentType);
  if (!tl) return [];
  return tl.entries.filter((e) => e.rank === rank);
}
