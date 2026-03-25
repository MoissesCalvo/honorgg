import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WOW_CLASSES, TIER_CONFIG, CONTENT_TYPES, getClassById, getSpecById } from "@/lib/wow-data";
import { getTierList } from "@/lib/tier-data";

export default async function HomePage() {
  const mplusList = await getTierList("mythic_plus");
  const sSpecs = mplusList?.entries.filter((e) => e.rank === "S").slice(0, 4) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-20 py-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
          <span>✨</span>
          <span>Updated for Midnight 12.0.5</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight">
          <span className="wow-gold wow-gold-glow">WoW Tier Lists</span>
          <br />
          <span className="text-foreground/80">Built for Champions</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Data-driven rankings for every spec in Mythic+, Raid, and PvP.
          Always current. No fluff.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/tier-list">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
              View Tier Lists
            </Button>
          </Link>
          <Link href="/classes">
            <Button size="lg" variant="outline" className="font-semibold px-8">
              Browse Classes
            </Button>
          </Link>
        </div>
      </section>

      {/* Content Type Cards */}
      <section className="mb-16">
        <h2 className="text-sm font-semibold mb-6 text-muted-foreground uppercase tracking-widest">
          Browse by Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTENT_TYPES.map((ct) => (
            <Link key={ct.id} href={`/tier-list?content=${ct.id}`}>
              <div className="group border border-border rounded-xl p-6 bg-card hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer">
                <div className="text-3xl mb-3">
                  {ct.id === "mythic_plus" ? "🔑" : ct.id === "raid" ? "⚔️" : "🏆"}
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{ct.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {ct.id === "mythic_plus"
                    ? "Best specs for high keys and weekly vault"
                    : ct.id === "raid"
                    ? "Top performers for Awakened raid content"
                    : "Arena and battleground rankings"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* S Tier Snapshot */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            <span style={{ color: TIER_CONFIG.S.color }}>S Tier</span>{" "}
            <span className="text-muted-foreground font-normal text-base">— Mythic+</span>
          </h2>
          <Link href="/tier-list" className="text-sm text-primary hover:underline">Full list →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sSpecs.map((entry) => {
            const spec = getSpecById(entry.specId);
            const cls = spec ? getClassById(spec.classId) : null;
            if (!spec || !cls) return null;
            return (
              <div
                key={entry.specId}
                className="border rounded-lg p-4 bg-card tier-glow-s flex items-center gap-3"
                style={{ borderColor: `${cls.color}40` }}
              >
                <Image
                  src={spec.iconUrl}
                  alt={`${spec.name} ${cls.name}`}
                  width={36}
                  height={36}
                  className="rounded-md shrink-0"
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-sm" style={{ color: cls.color }}>{spec.name}</p>
                  <p className="text-xs text-muted-foreground">{cls.name}</p>
                </div>
                <span
                  className="ml-auto text-xs font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: TIER_CONFIG.S.bg, color: TIER_CONFIG.S.color }}
                >S</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Classes Grid */}
      <section>
        <h2 className="text-xl font-bold mb-6">All Classes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {WOW_CLASSES.map((cls) => (
            <Link key={cls.id} href={`/classes/${cls.id}`}>
              <div
                className="group border rounded-lg p-3 bg-card hover:bg-card/80 transition-all cursor-pointer flex items-center gap-2"
                style={{ borderColor: `${cls.color}30` }}
              >
                <Image
                  src={cls.iconUrl}
                  alt={cls.name}
                  width={28}
                  height={28}
                  className="rounded-sm shrink-0"
                  unoptimized
                />
                <span
                  className="text-sm font-medium group-hover:brightness-125 transition-all"
                  style={{ color: cls.color }}
                >
                  {cls.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
