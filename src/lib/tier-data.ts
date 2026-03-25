import { ContentType, TierRank } from "./wow-data";

export interface TierEntry {
  specId: string;
  rank: TierRank;
  score: number; // 0–100 for within-tier sorting
  notes?: string;
}

export interface TierList {
  contentType: ContentType;
  patch: string;
  updatedAt: string;
  entries: TierEntry[];
}

// Seeded tier data for Midnight patch 12.0.5
const TIER_LISTS: TierList[] = [
  {
    contentType: "mythic_plus",
    patch: "12.0.5",
    updatedAt: "2026-03-20",
    entries: [
      // S Tier
      { specId: "augmentation_evoker", rank: "S", score: 99, notes: "Irreplaceable raid/M+ support" },
      { specId: "fire_mage", rank: "S", score: 97, notes: "Exceptional burst + utility" },
      { specId: "subtlety_rogue", rank: "S", score: 95, notes: "Shroud + massive single target" },
      { specId: "windwalker_monk", rank: "S", score: 93, notes: "Great burst + Ring of Peace" },
      { specId: "discipline_priest", rank: "S", score: 91, notes: "Best M+ healer currently" },
      // A Tier
      { specId: "havoc_dh", rank: "A", score: 88 },
      { specId: "affliction_warlock", rank: "A", score: 86 },
      { specId: "balance_druid", rank: "A", score: 84 },
      { specId: "restoration_druid", rank: "A", score: 82 },
      { specId: "vengeance_dh", rank: "A", score: 81 },
      { specId: "marksmanship_hunter", rank: "A", score: 80 },
      { specId: "shadow_priest", rank: "A", score: 78 },
      // B Tier
      { specId: "unholy_dk", rank: "B", score: 75 },
      { specId: "frost_dk", rank: "B", score: 73 },
      { specId: "arcane_mage", rank: "B", score: 72 },
      { specId: "holy_paladin", rank: "B", score: 70 },
      { specId: "protection_paladin", rank: "B", score: 69 },
      { specId: "mistweaver_monk", rank: "B", score: 68 },
      { specId: "elemental_shaman", rank: "B", score: 66 },
      { specId: "retribution_paladin", rank: "B", score: 65 },
      { specId: "outlaw_rogue", rank: "B", score: 63 },
      { specId: "assassination_rogue", rank: "B", score: 62 },
      // C Tier
      { specId: "beast_mastery_hunter", rank: "C", score: 58 },
      { specId: "frost_mage", rank: "C", score: 56 },
      { specId: "arms_warrior", rank: "C", score: 54 },
      { specId: "fury_warrior", rank: "C", score: 53 },
      { specId: "enhancement_shaman", rank: "C", score: 51 },
      { specId: "brewmaster_monk", rank: "C", score: 50 },
      { specId: "guardian_druid", rank: "C", score: 48 },
      { specId: "restoration_shaman", rank: "C", score: 47 },
      { specId: "demonology_warlock", rank: "C", score: 45 },
      // D Tier
      { specId: "destruction_warlock", rank: "D", score: 38 },
      { specId: "blood_dk", rank: "D", score: 36 },
      { specId: "protection_warrior", rank: "D", score: 35 },
      { specId: "feral_druid", rank: "D", score: 34 },
      { specId: "survival_hunter", rank: "D", score: 32 },
      { specId: "devastation_evoker", rank: "D", score: 30 },
      { specId: "preservation_evoker", rank: "D", score: 28 },
      { specId: "holy_priest", rank: "D", score: 26 },
    ],
  },
  {
    contentType: "raid",
    patch: "12.0.5",
    updatedAt: "2026-03-20",
    entries: [
      // S Tier
      { specId: "augmentation_evoker", rank: "S", score: 99, notes: "Must-have raid buff" },
      { specId: "discipline_priest", rank: "S", score: 96, notes: "Atonement healing dominates" },
      { specId: "shadow_priest", rank: "S", score: 94 },
      { specId: "fire_mage", rank: "S", score: 92 },
      // A Tier
      { specId: "affliction_warlock", rank: "A", score: 89 },
      { specId: "balance_druid", rank: "A", score: 87 },
      { specId: "restoration_druid", rank: "A", score: 85 },
      { specId: "holy_paladin", rank: "A", score: 83 },
      { specId: "windwalker_monk", rank: "A", score: 81 },
      { specId: "havoc_dh", rank: "A", score: 79 },
      { specId: "unholy_dk", rank: "A", score: 77 },
      // B Tier
      { specId: "elemental_shaman", rank: "B", score: 74 },
      { specId: "marksmanship_hunter", rank: "B", score: 72 },
      { specId: "mistweaver_monk", rank: "B", score: 70 },
      { specId: "retribution_paladin", rank: "B", score: 68 },
      { specId: "arcane_mage", rank: "B", score: 66 },
      { specId: "demonology_warlock", rank: "B", score: 64 },
      { specId: "restoration_shaman", rank: "B", score: 62 },
      // C Tier
      { specId: "subtlety_rogue", rank: "C", score: 57 },
      { specId: "outlaw_rogue", rank: "C", score: 55 },
      { specId: "assassination_rogue", rank: "C", score: 53 },
      { specId: "arms_warrior", rank: "C", score: 51 },
      { specId: "fury_warrior", rank: "C", score: 49 },
      { specId: "frost_mage", rank: "C", score: 47 },
      { specId: "preservation_evoker", rank: "C", score: 45 },
      { specId: "vengeance_dh", rank: "C", score: 43 },
      // D Tier
      { specId: "blood_dk", rank: "D", score: 38 },
      { specId: "protection_paladin", rank: "D", score: 36 },
      { specId: "guardian_druid", rank: "D", score: 34 },
      { specId: "brewmaster_monk", rank: "D", score: 32 },
      { specId: "protection_warrior", rank: "D", score: 30 },
      { specId: "devastation_evoker", rank: "D", score: 28 },
      { specId: "beast_mastery_hunter", rank: "D", score: 26 },
      { specId: "feral_druid", rank: "D", score: 24 },
      { specId: "enhancement_shaman", rank: "D", score: 22 },
      { specId: "frost_dk", rank: "D", score: 20 },
      { specId: "survival_hunter", rank: "D", score: 18 },
      { specId: "destruction_warlock", rank: "D", score: 16 },
      { specId: "holy_priest", rank: "D", score: 14 },
    ],
  },
  {
    contentType: "pvp",
    patch: "12.0.5",
    updatedAt: "2026-03-20",
    entries: [
      // S Tier
      { specId: "subtlety_rogue", rank: "S", score: 98 },
      { specId: "havoc_dh", rank: "S", score: 95 },
      { specId: "retribution_paladin", rank: "S", score: 93 },
      { specId: "shadow_priest", rank: "S", score: 91 },
      // A Tier
      { specId: "frost_mage", rank: "A", score: 87 },
      { specId: "windwalker_monk", rank: "A", score: 85 },
      { specId: "holy_paladin", rank: "A", score: 83 },
      { specId: "fire_mage", rank: "A", score: 81 },
      { specId: "unholy_dk", rank: "A", score: 79 },
      { specId: "discipline_priest", rank: "A", score: 77 },
      // B Tier
      { specId: "arms_warrior", rank: "B", score: 73 },
      { specId: "fury_warrior", rank: "B", score: 71 },
      { specId: "affliction_warlock", rank: "B", score: 69 },
      { specId: "feral_druid", rank: "B", score: 67 },
      { specId: "enhancement_shaman", rank: "B", score: 65 },
      { specId: "restoration_druid", rank: "B", score: 63 },
      { specId: "assassination_rogue", rank: "B", score: 61 },
      // C Tier
      { specId: "outlaw_rogue", rank: "C", score: 56 },
      { specId: "demonology_warlock", rank: "C", score: 54 },
      { specId: "balance_druid", rank: "C", score: 52 },
      { specId: "elemental_shaman", rank: "C", score: 50 },
      { specId: "mistweaver_monk", rank: "C", score: 48 },
      { specId: "frost_dk", rank: "C", score: 46 },
      { specId: "marksmanship_hunter", rank: "C", score: 44 },
      { specId: "restoration_shaman", rank: "C", score: 42 },
      // D Tier
      { specId: "destruction_warlock", rank: "D", score: 37 },
      { specId: "beast_mastery_hunter", rank: "D", score: 35 },
      { specId: "arcane_mage", rank: "D", score: 33 },
      { specId: "devastation_evoker", rank: "D", score: 31 },
      { specId: "augmentation_evoker", rank: "D", score: 29 },
      { specId: "blood_dk", rank: "D", score: 27 },
      { specId: "vengeance_dh", rank: "D", score: 25 },
      { specId: "protection_paladin", rank: "D", score: 23 },
      { specId: "guardian_druid", rank: "D", score: 21 },
      { specId: "brewmaster_monk", rank: "D", score: 19 },
      { specId: "protection_warrior", rank: "D", score: 17 },
      { specId: "survival_hunter", rank: "D", score: 15 },
      { specId: "preservation_evoker", rank: "D", score: 13 },
      { specId: "holy_priest", rank: "D", score: 11 },
    ],
  },
];

export function getTierList(contentType: ContentType): TierList | undefined {
  return TIER_LISTS.find((tl) => tl.contentType === contentType);
}

export function getEntriesByRank(contentType: ContentType, rank: TierRank): TierEntry[] {
  const tl = getTierList(contentType);
  if (!tl) return [];
  return tl.entries
    .filter((e) => e.rank === rank)
    .sort((a, b) => b.score - a.score);
}
