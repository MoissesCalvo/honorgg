"use client";

import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ContentType,
  WowRole,
  TIER_CONFIG,
  ROLES,
  TierRank,
  getClassById,
  getSpecById,
} from "@/lib/wow-data";
import { TierList } from "@/lib/tier-data";

const TIERS: TierRank[] = ["S", "A", "B", "C", "D"];

interface Props {
  contentTypes: { id: ContentType; label: string }[];
  tierData: Record<string, TierList | null>;
}

export function TierListView({ contentTypes, tierData }: Props) {
  const [activeRole, setActiveRole] = useState<WowRole | "all">("all");

  return (
    <div>
      {/* Role Filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-sm text-muted-foreground mr-1">Filter:</span>
        <button
          onClick={() => setActiveRole("all")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeRole === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All Roles
        </button>
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => setActiveRole(role.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
              activeRole === role.id ? "opacity-100" : "opacity-60 hover:opacity-80"
            }`}
            style={
              activeRole === role.id
                ? { backgroundColor: `${role.color}25`, color: role.color, borderColor: `${role.color}60` }
                : { borderColor: "transparent" }
            }
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Content Type Tabs */}
      <Tabs defaultValue={contentTypes[0].id}>
        <TabsList className="mb-8 bg-secondary h-10">
          {contentTypes.map((ct) => (
            <TabsTrigger key={ct.id} value={ct.id} className="font-semibold">
              {ct.id === "mythic_plus" ? "🔑" : ct.id === "raid" ? "⚔️" : "🏆"} {ct.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {contentTypes.map((ct) => {
          const tierList = tierData[ct.id];
          if (!tierList) return null;

          return (
            <TabsContent key={ct.id} value={ct.id}>
              <div className="space-y-3">
                {TIERS.map((tier) => {
                  const config = TIER_CONFIG[tier];
                  const entries = tierList.entries
                    .filter((e) => e.rank === tier)
                    .filter((e) => {
                      if (activeRole === "all") return true;
                      const spec = getSpecById(e.specId);
                      return spec?.role === activeRole;
                    })
                    .sort((a, b) => b.score - a.score);

                  if (entries.length === 0) return null;

                  return (
                    <div
                      key={tier}
                      className="flex gap-0 rounded-xl border overflow-hidden"
                      style={{ borderColor: `${config.color}30` }}
                    >
                      {/* Tier Label */}
                      <div
                        className="flex items-center justify-center w-14 shrink-0 text-2xl font-black"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        {tier}
                      </div>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-2 p-3 flex-1">
                        {entries.map((entry) => {
                          const spec = getSpecById(entry.specId);
                          const cls = spec ? getClassById(spec.classId) : null;
                          if (!spec || !cls) return null;

                          return (
                            <Tooltip key={entry.specId}>
                              <TooltipTrigger>
                                <div
                                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border cursor-default transition-all hover:brightness-110"
                                  style={{
                                    borderColor: `${cls.color}35`,
                                    backgroundColor: `${cls.color}0D`,
                                  }}
                                >
                                  <Image
                                    src={spec.iconUrl}
                                    alt={`${spec.name} ${cls.name}`}
                                    width={28}
                                    height={28}
                                    className="rounded-sm shrink-0"
                                    unoptimized
                                  />
                                  <div className="leading-tight">
                                    <p className="text-xs font-bold" style={{ color: cls.color }}>
                                      {spec.name}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">{cls.name}</p>
                                  </div>
                                  <RolePip role={spec.role} />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[220px]">
                                <div className="flex items-center gap-2 mb-1">
                                  <Image
                                    src={cls.iconUrl}
                                    alt={cls.name}
                                    width={20}
                                    height={20}
                                    className="rounded-sm"
                                    unoptimized
                                  />
                                  <p className="font-semibold">{spec.name} {cls.name}</p>
                                </div>
                                {entry.notes && <p className="text-xs text-muted-foreground">{entry.notes}</p>}
                                <p className="text-xs text-muted-foreground mt-0.5">Score: {entry.score}/100</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-3">
                {TIERS.map((tier) => (
                  <div key={tier} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className="font-bold px-1.5 py-0.5 rounded text-xs"
                      style={{ backgroundColor: TIER_CONFIG[tier].bg, color: TIER_CONFIG[tier].color }}
                    >
                      {tier}
                    </span>
                    <span>{TIER_CONFIG[tier].description}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Last updated: {tierList.updatedAt} &bull; Patch {tierList.patch}
              </p>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

function RolePip({ role }: { role: WowRole }) {
  const roleConfig = ROLES.find((r) => r.id === role);
  if (!roleConfig) return null;
  const icons: Record<WowRole, string> = { tank: "🛡", healer: "💚", melee: "⚔", ranged: "🏹" };
  return (
    <span className="text-[10px] ml-0.5 opacity-50" title={roleConfig.label}>
      {icons[role]}
    </span>
  );
}
