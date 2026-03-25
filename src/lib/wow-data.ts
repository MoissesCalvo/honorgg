export type WowRole = "tank" | "healer" | "melee" | "ranged";
export type ContentType = "mythic_plus" | "raid" | "pvp";
export type TierRank = "S" | "A" | "B" | "C" | "D";

export interface WowClass {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface WowSpec {
  id: string;
  classId: string;
  name: string;
  role: WowRole;
  icon: string;
}

export const WOW_CLASSES: WowClass[] = [
  { id: "death_knight", name: "Death Knight", color: "#C41E3A", icon: "💀" },
  { id: "demon_hunter", name: "Demon Hunter", color: "#A330C9", icon: "👁️" },
  { id: "druid", name: "Druid", color: "#FF7C0A", icon: "🐻" },
  { id: "evoker", name: "Evoker", color: "#33937F", icon: "🐉" },
  { id: "hunter", name: "Hunter", color: "#AAD372", icon: "🏹" },
  { id: "mage", name: "Mage", color: "#3FC7EB", icon: "❄️" },
  { id: "monk", name: "Monk", color: "#00FF98", icon: "🥊" },
  { id: "paladin", name: "Paladin", color: "#F48CBA", icon: "🛡️" },
  { id: "priest", name: "Priest", color: "#FFFFFF", icon: "✨" },
  { id: "rogue", name: "Rogue", color: "#FFF468", icon: "🗡️" },
  { id: "shaman", name: "Shaman", color: "#0070DD", icon: "⚡" },
  { id: "warlock", name: "Warlock", color: "#8788EE", icon: "🔮" },
  { id: "warrior", name: "Warrior", color: "#C69B3A", icon: "⚔️" },
];

export const WOW_SPECS: WowSpec[] = [
  // Death Knight
  { id: "blood_dk", classId: "death_knight", name: "Blood", role: "tank", icon: "🩸" },
  { id: "frost_dk", classId: "death_knight", name: "Frost", role: "melee", icon: "❄️" },
  { id: "unholy_dk", classId: "death_knight", name: "Unholy", role: "melee", icon: "☠️" },
  // Demon Hunter
  { id: "havoc_dh", classId: "demon_hunter", name: "Havoc", role: "melee", icon: "🔥" },
  { id: "vengeance_dh", classId: "demon_hunter", name: "Vengeance", role: "tank", icon: "🛡️" },
  // Druid
  { id: "balance_druid", classId: "druid", name: "Balance", role: "ranged", icon: "🌙" },
  { id: "feral_druid", classId: "druid", name: "Feral", role: "melee", icon: "🐱" },
  { id: "guardian_druid", classId: "druid", name: "Guardian", role: "tank", icon: "🐻" },
  { id: "restoration_druid", classId: "druid", name: "Restoration", role: "healer", icon: "🌿" },
  // Evoker
  { id: "devastation_evoker", classId: "evoker", name: "Devastation", role: "ranged", icon: "🔥" },
  { id: "preservation_evoker", classId: "evoker", name: "Preservation", role: "healer", icon: "💚" },
  { id: "augmentation_evoker", classId: "evoker", name: "Augmentation", role: "ranged", icon: "⬆️" },
  // Hunter
  { id: "beast_mastery_hunter", classId: "hunter", name: "Beast Mastery", role: "ranged", icon: "🐺" },
  { id: "marksmanship_hunter", classId: "hunter", name: "Marksmanship", role: "ranged", icon: "🎯" },
  { id: "survival_hunter", classId: "hunter", name: "Survival", role: "melee", icon: "🔱" },
  // Mage
  { id: "arcane_mage", classId: "mage", name: "Arcane", role: "ranged", icon: "💫" },
  { id: "fire_mage", classId: "mage", name: "Fire", role: "ranged", icon: "🔥" },
  { id: "frost_mage", classId: "mage", name: "Frost", role: "ranged", icon: "❄️" },
  // Monk
  { id: "brewmaster_monk", classId: "monk", name: "Brewmaster", role: "tank", icon: "🍺" },
  { id: "mistweaver_monk", classId: "monk", name: "Mistweaver", role: "healer", icon: "☁️" },
  { id: "windwalker_monk", classId: "monk", name: "Windwalker", role: "melee", icon: "💨" },
  // Paladin
  { id: "holy_paladin", classId: "paladin", name: "Holy", role: "healer", icon: "✨" },
  { id: "protection_paladin", classId: "paladin", name: "Protection", role: "tank", icon: "🛡️" },
  { id: "retribution_paladin", classId: "paladin", name: "Retribution", role: "melee", icon: "⚔️" },
  // Priest
  { id: "discipline_priest", classId: "priest", name: "Discipline", role: "healer", icon: "🕊️" },
  { id: "holy_priest", classId: "priest", name: "Holy", role: "healer", icon: "💛" },
  { id: "shadow_priest", classId: "priest", name: "Shadow", role: "ranged", icon: "🌑" },
  // Rogue
  { id: "assassination_rogue", classId: "rogue", name: "Assassination", role: "melee", icon: "🗡️" },
  { id: "outlaw_rogue", classId: "rogue", name: "Outlaw", role: "melee", icon: "⚓" },
  { id: "subtlety_rogue", classId: "rogue", name: "Subtlety", role: "melee", icon: "🌫️" },
  // Shaman
  { id: "elemental_shaman", classId: "shaman", name: "Elemental", role: "ranged", icon: "⚡" },
  { id: "enhancement_shaman", classId: "shaman", name: "Enhancement", role: "melee", icon: "🌊" },
  { id: "restoration_shaman", classId: "shaman", name: "Restoration", role: "healer", icon: "💧" },
  // Warlock
  { id: "affliction_warlock", classId: "warlock", name: "Affliction", role: "ranged", icon: "🩸" },
  { id: "demonology_warlock", classId: "warlock", name: "Demonology", role: "ranged", icon: "😈" },
  { id: "destruction_warlock", classId: "warlock", name: "Destruction", role: "ranged", icon: "💥" },
  // Warrior
  { id: "arms_warrior", classId: "warrior", name: "Arms", role: "melee", icon: "⚔️" },
  { id: "fury_warrior", classId: "warrior", name: "Fury", role: "melee", icon: "😤" },
  { id: "protection_warrior", classId: "warrior", name: "Protection", role: "tank", icon: "🛡️" },
];

export const CONTENT_TYPES = [
  { id: "mythic_plus" as ContentType, label: "Mythic+" },
  { id: "raid" as ContentType, label: "Raid" },
  { id: "pvp" as ContentType, label: "PvP" },
];

export const ROLES = [
  { id: "tank" as WowRole, label: "Tank", color: "#3b82f6" },
  { id: "healer" as WowRole, label: "Healer", color: "#22c55e" },
  { id: "melee" as WowRole, label: "Melee", color: "#ef4444" },
  { id: "ranged" as WowRole, label: "Ranged", color: "#f97316" },
];

export const TIER_CONFIG: Record<TierRank, { label: string; color: string; bg: string; description: string }> = {
  S: { label: "S", color: "#FFD700", bg: "rgba(255,215,0,0.12)", description: "Meta — Strongest in slot" },
  A: { label: "A", color: "#4ade80", bg: "rgba(74,222,128,0.10)", description: "Strong — Top tier performer" },
  B: { label: "B", color: "#60a5fa", bg: "rgba(96,165,250,0.10)", description: "Good — Solid and viable" },
  C: { label: "C", color: "#fb923c", bg: "rgba(251,146,60,0.10)", description: "Average — Needs optimization" },
  D: { label: "D", color: "#f87171", bg: "rgba(248,113,113,0.10)", description: "Weak — Situational at best" },
};

export function getClassById(id: string): WowClass | undefined {
  return WOW_CLASSES.find((c) => c.id === id);
}

export function getSpecById(id: string): WowSpec | undefined {
  return WOW_SPECS.find((s) => s.id === id);
}

export function getSpecsByClass(classId: string): WowSpec[] {
  return WOW_SPECS.filter((s) => s.classId === classId);
}
