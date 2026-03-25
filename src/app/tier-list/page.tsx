import { TierListView } from "@/components/TierListView";
import { CONTENT_TYPES } from "@/lib/wow-data";

export const metadata = {
  title: "Tier Lists — Honor.gg",
  description: "WoW Midnight class tier lists for Mythic+, Raid, and PvP.",
};

export default function TierListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="wow-gold">Tier Lists</span>
        </h1>
        <p className="text-muted-foreground">
          Class & spec rankings for patch <span className="text-foreground font-mono">12.0.5</span> — Midnight
        </p>
      </div>
      <TierListView contentTypes={CONTENT_TYPES} />
    </div>
  );
}
