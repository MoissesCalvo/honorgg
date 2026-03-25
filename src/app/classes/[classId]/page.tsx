import Image from "next/image";
import { notFound } from "next/navigation";
import { WOW_CLASSES, WOW_SPECS, CONTENT_TYPES, TIER_CONFIG, ROLES } from "@/lib/wow-data";
import { getTierList } from "@/lib/tier-data";

interface Props {
  params: Promise<{ classId: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return WOW_CLASSES.map((cls) => ({ classId: cls.id }));
}

export async function generateMetadata({ params }: Props) {
  const { classId } = await params;
  const cls = WOW_CLASSES.find((c) => c.id === classId);
  if (!cls) return { title: "Not Found" };
  return { title: `${cls.name} — Honor.gg`, description: `Tier list and guide for ${cls.name} in WoW Midnight.` };
}

export default async function ClassPage({ params }: Props) {
  const { classId } = await params;
  const cls = WOW_CLASSES.find((c) => c.id === classId);
  if (!cls) notFound();

  const specs = WOW_SPECS.filter((s) => s.classId === classId);
  const tierLists = await Promise.all(CONTENT_TYPES.map((ct) => getTierList(ct.id)));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Image
          src={cls.iconUrl}
          alt={cls.name}
          width={64}
          height={64}
          className="rounded-xl shrink-0"
          unoptimized
        />
        <div>
          <h1 className="text-4xl font-bold" style={{ color: cls.color }}>{cls.name}</h1>
          <p className="text-muted-foreground mt-1">
            {specs.length} specialization{specs.length !== 1 ? "s" : ""} &bull; Midnight 12.0.5
          </p>
        </div>
      </div>

      {/* Specs across content types */}
      <div className="space-y-10">
        {CONTENT_TYPES.map((ct, i) => {
          const tierList = tierLists[i];
          if (!tierList) return null;

          return (
            <section key={ct.id}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>{ct.id === "mythic_plus" ? "🔑" : ct.id === "raid" ? "⚔️" : "🏆"}</span>
                {ct.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((spec) => {
                  const entry = tierList.entries.find((e) => e.specId === spec.id);
                  const roleConfig = ROLES.find((r) => r.id === spec.role);
                  const tier = entry?.rank ?? null;
                  const config = tier ? TIER_CONFIG[tier] : null;

                  return (
                    <div
                      key={spec.id}
                      className="border rounded-xl p-5 bg-card"
                      style={{ borderColor: config ? `${config.color}30` : "var(--border)" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={spec.iconUrl}
                            alt={spec.name}
                            width={40}
                            height={40}
                            className="rounded-lg shrink-0"
                            unoptimized
                          />
                          <div>
                            <p className="font-bold" style={{ color: cls.color }}>{spec.name}</p>
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: `${roleConfig?.color}20`, color: roleConfig?.color }}
                            >
                              {spec.role}
                            </span>
                          </div>
                        </div>
                        {tier && config && (
                          <span
                            className="text-2xl font-black px-2 py-0.5 rounded"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {tier}
                          </span>
                        )}
                      </div>
                      {entry?.notes && <p className="text-xs text-muted-foreground mb-2">{entry.notes}</p>}
                      {entry && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Score</span>
                            <span>{entry.score}/100</span>
                          </div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${entry.score}%`, backgroundColor: config?.color ?? "#888" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
