export type WowRole = "tank" | "healer" | "melee" | "ranged";
export type ContentType = "mythic_plus" | "raid" | "pvp";
export type TierRank = "S" | "A" | "B" | "C" | "D";

const CDN = "https://render.worldofwarcraft.com/us/icons/56";

export interface WowClass {
  id: string;
  blizzardId: number;
  name: string;
  color: string;
  iconUrl: string;
}

export interface WowSpec {
  id: string;
  blizzardId: number;
  classId: string;
  name: string;
  role: WowRole;
  iconUrl: string;
}

export const WOW_CLASSES: WowClass[] = [
  { id: "death_knight",  blizzardId: 6,  name: "Death Knight",  color: "#C41E3A", iconUrl: `${CDN}/spell_deathknight_classicon.jpg` },
  { id: "demon_hunter",  blizzardId: 12, name: "Demon Hunter",  color: "#A330C9", iconUrl: `${CDN}/classicon_demonhunter.jpg` },
  { id: "druid",         blizzardId: 11, name: "Druid",         color: "#FF7C0A", iconUrl: `${CDN}/classicon_druid.jpg` },
  { id: "evoker",        blizzardId: 13, name: "Evoker",        color: "#33937F", iconUrl: `${CDN}/classicon_evoker.jpg` },
  { id: "hunter",        blizzardId: 3,  name: "Hunter",        color: "#AAD372", iconUrl: `${CDN}/classicon_hunter.jpg` },
  { id: "mage",          blizzardId: 8,  name: "Mage",          color: "#3FC7EB", iconUrl: `${CDN}/classicon_mage.jpg` },
  { id: "monk",          blizzardId: 10, name: "Monk",          color: "#00FF98", iconUrl: `${CDN}/classicon_monk.jpg` },
  { id: "paladin",       blizzardId: 2,  name: "Paladin",       color: "#F48CBA", iconUrl: `${CDN}/classicon_paladin.jpg` },
  { id: "priest",        blizzardId: 5,  name: "Priest",        color: "#FFFFFF", iconUrl: `${CDN}/classicon_priest.jpg` },
  { id: "rogue",         blizzardId: 4,  name: "Rogue",         color: "#FFF468", iconUrl: `${CDN}/classicon_rogue.jpg` },
  { id: "shaman",        blizzardId: 7,  name: "Shaman",        color: "#0070DD", iconUrl: `${CDN}/classicon_shaman.jpg` },
  { id: "warlock",       blizzardId: 9,  name: "Warlock",       color: "#8788EE", iconUrl: `${CDN}/classicon_warlock.jpg` },
  { id: "warrior",       blizzardId: 1,  name: "Warrior",       color: "#C69B3A", iconUrl: `${CDN}/classicon_warrior.jpg` },
];

export const WOW_SPECS: WowSpec[] = [
  // Death Knight
  { id: "blood_dk",      blizzardId: 250, classId: "death_knight", name: "Blood",        role: "tank",   iconUrl: `${CDN}/spell_deathknight_bloodpresence.jpg` },
  { id: "frost_dk",      blizzardId: 251, classId: "death_knight", name: "Frost",        role: "melee",  iconUrl: `${CDN}/spell_deathknight_frostpresence.jpg` },
  { id: "unholy_dk",     blizzardId: 252, classId: "death_knight", name: "Unholy",       role: "melee",  iconUrl: `${CDN}/spell_deathknight_unholypresence.jpg` },
  // Demon Hunter
  { id: "havoc_dh",      blizzardId: 577,  classId: "demon_hunter", name: "Havoc",      role: "melee",  iconUrl: `${CDN}/ability_demonhunter_specdps.jpg` },
  { id: "vengeance_dh",  blizzardId: 581,  classId: "demon_hunter", name: "Vengeance",  role: "tank",   iconUrl: `${CDN}/ability_demonhunter_spectank.jpg` },
  { id: "devourer_dh",   blizzardId: 1480, classId: "demon_hunter", name: "Devourer",   role: "melee",  iconUrl: `${CDN}/classicon_demonhunter_void.jpg` },
  // Druid
  { id: "balance_druid",      blizzardId: 102, classId: "druid", name: "Balance",      role: "ranged", iconUrl: `${CDN}/spell_nature_starfall.jpg` },
  { id: "feral_druid",        blizzardId: 103, classId: "druid", name: "Feral",        role: "melee",  iconUrl: `${CDN}/ability_druid_catform.jpg` },
  { id: "guardian_druid",     blizzardId: 104, classId: "druid", name: "Guardian",     role: "tank",   iconUrl: `${CDN}/ability_racial_bearform.jpg` },
  { id: "restoration_druid",  blizzardId: 105, classId: "druid", name: "Restoration",  role: "healer", iconUrl: `${CDN}/spell_nature_healingtouch.jpg` },
  // Evoker
  { id: "devastation_evoker",   blizzardId: 1467, classId: "evoker", name: "Devastation",   role: "ranged", iconUrl: `${CDN}/classicon_evoker_devastation.jpg` },
  { id: "preservation_evoker",  blizzardId: 1468, classId: "evoker", name: "Preservation",  role: "healer", iconUrl: `${CDN}/classicon_evoker_preservation.jpg` },
  { id: "augmentation_evoker",  blizzardId: 1473, classId: "evoker", name: "Augmentation",  role: "ranged", iconUrl: `${CDN}/classicon_evoker_augmentation.jpg` },
  // Hunter
  { id: "beast_mastery_hunter",  blizzardId: 253, classId: "hunter", name: "Beast Mastery",  role: "ranged", iconUrl: `${CDN}/ability_hunter_bestialdiscipline.jpg` },
  { id: "marksmanship_hunter",   blizzardId: 254, classId: "hunter", name: "Marksmanship",   role: "ranged", iconUrl: `${CDN}/ability_hunter_focusedaim.jpg` },
  { id: "survival_hunter",       blizzardId: 255, classId: "hunter", name: "Survival",       role: "melee",  iconUrl: `${CDN}/ability_hunter_camouflage.jpg` },
  // Mage
  { id: "arcane_mage", blizzardId: 62, classId: "mage", name: "Arcane", role: "ranged", iconUrl: `${CDN}/spell_holy_magicalsentry.jpg` },
  { id: "fire_mage",   blizzardId: 63, classId: "mage", name: "Fire",   role: "ranged", iconUrl: `${CDN}/spell_fire_firebolt02.jpg` },
  { id: "frost_mage",  blizzardId: 64, classId: "mage", name: "Frost",  role: "ranged", iconUrl: `${CDN}/spell_frost_frostbolt02.jpg` },
  // Monk
  { id: "brewmaster_monk",  blizzardId: 268, classId: "monk", name: "Brewmaster",  role: "tank",   iconUrl: `${CDN}/spell_monk_brewmaster_spec.jpg` },
  { id: "mistweaver_monk",  blizzardId: 270, classId: "monk", name: "Mistweaver",  role: "healer", iconUrl: `${CDN}/spell_monk_mistweaver_spec.jpg` },
  { id: "windwalker_monk",  blizzardId: 269, classId: "monk", name: "Windwalker",  role: "melee",  iconUrl: `${CDN}/spell_monk_windwalker_spec.jpg` },
  // Paladin
  { id: "holy_paladin",         blizzardId: 65, classId: "paladin", name: "Holy",         role: "healer", iconUrl: `${CDN}/spell_holy_holybolt.jpg` },
  { id: "protection_paladin",   blizzardId: 66, classId: "paladin", name: "Protection",   role: "tank",   iconUrl: `${CDN}/ability_paladin_shieldofthetemplar.jpg` },
  { id: "retribution_paladin",  blizzardId: 70, classId: "paladin", name: "Retribution",  role: "melee",  iconUrl: `${CDN}/spell_holy_auraoflight.jpg` },
  // Priest
  { id: "discipline_priest", blizzardId: 256, classId: "priest", name: "Discipline", role: "healer", iconUrl: `${CDN}/spell_holy_powerwordshield.jpg` },
  { id: "holy_priest",       blizzardId: 257, classId: "priest", name: "Holy",       role: "healer", iconUrl: `${CDN}/spell_holy_guardianspirit.jpg` },
  { id: "shadow_priest",     blizzardId: 258, classId: "priest", name: "Shadow",     role: "ranged", iconUrl: `${CDN}/spell_shadow_shadowwordpain.jpg` },
  // Rogue
  { id: "assassination_rogue", blizzardId: 259, classId: "rogue", name: "Assassination", role: "melee", iconUrl: `${CDN}/ability_rogue_deadlybrew.jpg` },
  { id: "outlaw_rogue",        blizzardId: 260, classId: "rogue", name: "Outlaw",        role: "melee", iconUrl: `${CDN}/ability_rogue_waylay.jpg` },
  { id: "subtlety_rogue",      blizzardId: 261, classId: "rogue", name: "Subtlety",      role: "melee", iconUrl: `${CDN}/ability_stealth.jpg` },
  // Shaman
  { id: "elemental_shaman",    blizzardId: 262, classId: "shaman", name: "Elemental",    role: "ranged", iconUrl: `${CDN}/spell_nature_lightning.jpg` },
  { id: "enhancement_shaman",  blizzardId: 263, classId: "shaman", name: "Enhancement",  role: "melee",  iconUrl: `${CDN}/spell_shaman_improvedstormstrike.jpg` },
  { id: "restoration_shaman",  blizzardId: 264, classId: "shaman", name: "Restoration",  role: "healer", iconUrl: `${CDN}/spell_nature_magicimmunity.jpg` },
  // Warlock
  { id: "affliction_warlock",   blizzardId: 265, classId: "warlock", name: "Affliction",   role: "ranged", iconUrl: `${CDN}/spell_shadow_deathcoil.jpg` },
  { id: "demonology_warlock",   blizzardId: 266, classId: "warlock", name: "Demonology",   role: "ranged", iconUrl: `${CDN}/spell_shadow_metamorphosis.jpg` },
  { id: "destruction_warlock",  blizzardId: 267, classId: "warlock", name: "Destruction",  role: "ranged", iconUrl: `${CDN}/spell_shadow_rainoffire.jpg` },
  // Warrior
  { id: "arms_warrior",       blizzardId: 71, classId: "warrior", name: "Arms",       role: "melee", iconUrl: `${CDN}/ability_warrior_savageblow.jpg` },
  { id: "fury_warrior",       blizzardId: 72, classId: "warrior", name: "Fury",       role: "melee", iconUrl: `${CDN}/ability_warrior_innerrage.jpg` },
  { id: "protection_warrior", blizzardId: 73, classId: "warrior", name: "Protection", role: "tank",  iconUrl: `${CDN}/ability_warrior_defensivestance.jpg` },
];

export const CONTENT_TYPES = [
  { id: "mythic_plus" as ContentType, label: "Mythic+" },
  { id: "raid" as ContentType, label: "Raid" },
  { id: "pvp" as ContentType, label: "PvP" },
];

export const ROLES = [
  { id: "tank" as WowRole,   label: "Tank",   color: "#3b82f6" },
  { id: "healer" as WowRole, label: "Healer", color: "#22c55e" },
  { id: "melee" as WowRole,  label: "Melee",  color: "#ef4444" },
  { id: "ranged" as WowRole, label: "Ranged", color: "#f97316" },
];

export const TIER_CONFIG: Record<TierRank, { label: string; color: string; bg: string; description: string }> = {
  S: { label: "S", color: "#FFD700", bg: "rgba(255,215,0,0.12)",   description: "Meta — Strongest in slot" },
  A: { label: "A", color: "#4ade80", bg: "rgba(74,222,128,0.10)",  description: "Strong — Top tier performer" },
  B: { label: "B", color: "#60a5fa", bg: "rgba(96,165,250,0.10)",  description: "Good — Solid and viable" },
  C: { label: "C", color: "#fb923c", bg: "rgba(251,146,60,0.10)",  description: "Average — Needs optimization" },
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
