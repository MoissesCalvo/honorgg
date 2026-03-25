import Image from "next/image";
import Link from "next/link";
import { WOW_CLASSES, WOW_SPECS, ROLES } from "@/lib/wow-data";
import { getTierList } from "@/lib/tier-data";

export const metadata = {
  title: "Classes — Honor.gg",
  description: "Browse all World of Warcraft classes and their specs.",
};

export default async function ClassesPage() {
  const mplusList = await getTierList("mythic_plus");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2"><span className="wow-gold">Classes</span></h1>
        <p className="text-muted-foreground">All 13 classes and their specializations — Midnight 12.0</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WOW_CLASSES.map((cls) => {
          const specs = WOW_SPECS.filter((s) => s.classId === cls.id);
          return (
            <Link key={cls.id} href={`/classes/${cls.id}`}>
              <div
                className="group border rounded-xl p-5 bg-card hover:bg-card/80 transition-all cursor-pointer"
                style={{ borderColor: `${cls.color}30` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={cls.iconUrl}
                    alt={cls.name}
                    width={36}
                    height={36}
                    className="rounded-md shrink-0"
                    unoptimized
                  />
                  <h2 className="text-lg font-bold" style={{ color: cls.color }}>{cls.name}</h2>
                </div>
                <div className="space-y-2">
                  {specs.map((spec) => {
                    const entry = mplusList?.entries.find((e) => e.specId === spec.id);
                    const roleConfig = ROLES.find((r) => r.id === spec.role);
                    return (
                      <div key={spec.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Image
                            src={spec.iconUrl}
                            alt={spec.name}
                            width={18}
                            height={18}
                            className="rounded-sm shrink-0"
                            unoptimized
                          />
                          <span className="text-foreground/80">{spec.name}</span>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: `${roleConfig?.color}20`, color: roleConfig?.color }}
                          >
                            {spec.role}
                          </span>
                        </div>
                        {entry && (
                          <span
                            className="font-bold text-xs px-2 py-0.5 rounded"
                            style={{ backgroundColor: `${getRankColor(entry.rank)}20`, color: getRankColor(entry.rank) }}
                          >
                            {entry.rank}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-4 group-hover:text-primary transition-colors">
                  View full guide →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function getRankColor(rank: string): string {
  const colors: Record<string, string> = { S: "#FFD700", A: "#4ade80", B: "#60a5fa", C: "#fb923c", D: "#f87171" };
  return colors[rank] ?? "#888";
}
