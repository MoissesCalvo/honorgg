import Link from "next/link";
import { notFound } from "next/navigation";
import { WOW_SPECS, WOW_CLASSES, CONTENT_TYPES, ContentType } from "@/lib/wow-data";
import { getTierList } from "@/lib/tier-data";
import { getSpecBuilds } from "@/lib/spec-data";
import { SpecView } from "@/components/SpecView";

interface Props {
  params: Promise<{ specId: string }>;
  searchParams: Promise<{ content?: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { specId } = await params;
  const spec = WOW_SPECS.find((s) => s.id === specId);
  if (!spec) return { title: "Not Found" };
  const cls = WOW_CLASSES.find((c) => c.id === spec.classId);
  return {
    title: `${spec.name} ${cls?.name ?? ""} — Honor.gg`,
    description: `Talents, builds, stats and gear for ${spec.name} ${cls?.name ?? ""} in WoW Midnight.`,
  };
}

export default async function SpecPage({ params, searchParams }: Props) {
  const { specId } = await params;
  const { content } = await searchParams;

  const spec = WOW_SPECS.find((s) => s.id === specId);
  if (!spec) notFound();

  const cls = WOW_CLASSES.find((c) => c.id === spec.classId);
  if (!cls) notFound();

  const defaultContent = (
    CONTENT_TYPES.find((ct) => ct.id === content)?.id ?? "mythic_plus"
  ) as ContentType;

  const [builds, ...tierLists] = await Promise.all([
    getSpecBuilds(specId),
    ...CONTENT_TYPES.map((ct) => getTierList(ct.id)),
  ]);

  const tierBadges = CONTENT_TYPES.map((ct, i) => ({
    contentType: ct.id as ContentType,
    rank: tierLists[i]?.entries.find((e) => e.specId === specId)?.rank ?? null,
  }));

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link
          href="/tier-list"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Tier List
        </Link>
      </div>
      <SpecView
        spec={spec}
        cls={cls}
        builds={builds}
        tierBadges={tierBadges}
        defaultContent={defaultContent}
      />
    </div>
  );
}
