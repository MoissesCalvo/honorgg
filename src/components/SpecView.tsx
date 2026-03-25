"use client";

import Image from "next/image";
import { useState } from "react";
import { WowClass, WowSpec, CONTENT_TYPES, TIER_CONFIG, ContentType, TierRank } from "@/lib/wow-data";
import { SpecBuild } from "@/lib/spec-data";

interface TierBadge {
  contentType: ContentType;
  rank: TierRank | null;
}

interface Props {
  spec: WowSpec;
  cls: WowClass;
  builds: SpecBuild[];
  tierBadges: TierBadge[];
  defaultContent: ContentType;
}

export function SpecView({ spec, cls, builds, tierBadges, defaultContent }: Props) {
  const [activeContent, setActiveContent] = useState<ContentType>(defaultContent);

  const build = builds.find((b) => b.contentType === activeContent) ?? null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <Image
          src={spec.iconUrl}
          alt={spec.name}
          width={72}
          height={72}
          className="rounded-xl shrink-0"
          unoptimized
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold" style={{ color: cls.color }}>
            {spec.name}{" "}
            <span className="text-foreground">{cls.name}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {tierBadges.map(({ contentType, rank }) => {
              const ct = CONTENT_TYPES.find((c) => c.id === contentType);
              const config = rank ? TIER_CONFIG[rank] : null;
              return (
                <span
                  key={contentType}
                  className="text-xs px-2.5 py-1 rounded-lg border font-semibold"
                  style={
                    config
                      ? {
                          backgroundColor: config.bg,
                          color: config.color,
                          borderColor: `${config.color}40`,
                        }
                      : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
                  }
                >
                  {ct?.id === "mythic_plus" ? "🔑" : ct?.id === "raid" ? "⚔️" : "🏆"}{" "}
                  {ct?.label}: {rank ?? "—"}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content type tabs */}
      <div className="flex gap-2 mb-8 border-b border-border pb-4">
        {CONTENT_TYPES.map((ct) => (
          <button
            key={ct.id}
            onClick={() => setActiveContent(ct.id)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              activeContent === ct.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {ct.id === "mythic_plus" ? "🔑" : ct.id === "raid" ? "⚔️" : "🏆"} {ct.label}
          </button>
        ))}
      </div>

      {build ? (
        <div className="space-y-8">
          {/* Build header */}
          <div
            className="border rounded-xl p-5 bg-card"
            style={{ borderColor: `${cls.color}30` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: cls.color }}>
                  {build.buildName}
                </h2>
                {build.buildDescription && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {build.buildDescription}
                  </p>
                )}
              </div>
              <span className="text-xs text-muted-foreground shrink-0 mt-1">
                Patch {build.patch}
              </span>
            </div>
            {build.talentImport && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-1.5 font-medium">
                  Talent Import String
                </p>
                <code className="text-xs bg-secondary px-3 py-2 rounded-lg block break-all font-mono">
                  {build.talentImport}
                </code>
              </div>
            )}
          </div>

          {/* Stat Priority */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Stat Priority
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {build.statPriority.map((stat, i) => [
                <span
                  key={stat}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold border"
                  style={{
                    backgroundColor: i === 0 ? `${cls.color}20` : i === 1 ? `${cls.color}12` : `${cls.color}08`,
                    color: i <= 1 ? cls.color : undefined,
                    borderColor: i === 0 ? `${cls.color}50` : `${cls.color}20`,
                  }}
                >
                  {stat}
                </span>,
                i < build.statPriority.length - 1 ? (
                  <span key={`sep-${i}`} className="text-muted-foreground text-sm">
                    →
                  </span>
                ) : null,
              ])}
            </div>
          </section>

          {/* Key Talents */}
          {build.keyTalents.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Key Talents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {build.keyTalents.map((t) => (
                  <div
                    key={t.name}
                    className="flex gap-3 p-3 rounded-lg border bg-card"
                    style={{ borderColor: `${cls.color}20` }}
                  >
                    <div
                      className="w-1 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: cls.color }}
                    />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hero Talents */}
          {build.heroTalents && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Hero Talents
              </h3>
              <div
                className="border rounded-xl p-5"
                style={{
                  borderColor: `${cls.color}35`,
                  backgroundColor: `${cls.color}08`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">✦</span>
                  <p className="font-bold" style={{ color: cls.color }}>
                    {build.heroTalents.path}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {build.heroTalents.reason}
                </p>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Key nodes</p>
                  <div className="flex flex-wrap gap-2">
                    {build.heroTalents.keyNodes.map((node) => (
                      <span
                        key={node}
                        className="text-xs px-2.5 py-1 rounded-full border font-medium"
                        style={{
                          borderColor: `${cls.color}35`,
                          backgroundColor: `${cls.color}12`,
                          color: cls.color,
                        }}
                      >
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Gear */}
          {build.gearSlots.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Gear
              </h3>
              <div className="border rounded-xl overflow-hidden">
                {build.gearSlots.map((gear, i) => (
                  <div
                    key={gear.slot}
                    className={`flex gap-4 px-4 py-3 text-sm ${
                      i !== 0 ? "border-t border-border/50" : ""
                    }`}
                  >
                    <span className="text-muted-foreground w-28 shrink-0 text-xs pt-0.5">
                      {gear.slot}
                    </span>
                    <span className="font-medium flex-1">{gear.item}</span>
                    {gear.notes && (
                      <span className="text-xs text-muted-foreground text-right max-w-[180px]">
                        {gear.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-4xl mb-4">🛠</p>
          <p className="font-semibold text-foreground">Build guide coming soon</p>
          <p className="text-sm mt-2">
            No guide available yet for{" "}
            {CONTENT_TYPES.find((c) => c.id === activeContent)?.label}.
          </p>
        </div>
      )}
    </div>
  );
}
