import { supabase } from "./supabase";
import { ContentType } from "./wow-data";
import { SpecBuildRow } from "./database.types";

export interface KeyTalent {
  name: string;
  description: string;
}

export interface HeroTalents {
  path: string;
  reason: string;
  keyNodes: string[];
}

export interface GearSlot {
  slot: string;
  item: string;
  notes: string | null;
}

export interface SpecBuild {
  specId: string;
  contentType: ContentType;
  buildName: string;
  buildDescription: string | null;
  talentImport: string | null;
  statPriority: string[];
  keyTalents: KeyTalent[];
  heroTalents: HeroTalents | null;
  gearSlots: GearSlot[];
  patch: string;
}

export async function getSpecBuilds(specId: string): Promise<SpecBuild[]> {
  const { data: raw, error } = await supabase
    .from("spec_builds")
    .select("*")
    .eq("spec_id", specId);

  if (error || !raw) return [];

  return (raw as SpecBuildRow[]).map((row) => ({
    specId: row.spec_id,
    contentType: row.content_type as ContentType,
    buildName: row.build_name,
    buildDescription: row.build_description,
    talentImport: row.talent_import,
    statPriority: row.stat_priority as string[],
    keyTalents: row.key_talents as KeyTalent[],
    heroTalents: row.hero_talents as HeroTalents | null,
    gearSlots: row.gear_slots as GearSlot[],
    patch: row.patch,
  }));
}
