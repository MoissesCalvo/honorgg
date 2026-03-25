"use client";

import { useEffect, useState } from "react";

interface BlizzardSpec {
  id: number;
  name: string;
  iconUrl: string | null;
}

interface BlizzardClass {
  id: number;
  name: string;
  iconUrl: string | null;
  specs: BlizzardSpec[];
}

interface IconMap {
  [name: string]: string | null;
}

let cache: IconMap | null = null;

export function useBlizzardIcons(): IconMap {
  const [icons, setIcons] = useState<IconMap>(cache ?? {});

  useEffect(() => {
    if (cache) return;
    fetch("/api/blizzard/classes")
      .then((r) => r.json())
      .then((data: { classes?: BlizzardClass[] }) => {
        if (!data.classes) return;
        const map: IconMap = {};
        for (const cls of data.classes) {
          if (cls.iconUrl) map[cls.name] = cls.iconUrl;
          for (const spec of cls.specs) {
            if (spec.iconUrl) map[`${spec.name} ${cls.name}`] = spec.iconUrl;
          }
        }
        cache = map;
        setIcons(map);
      })
      .catch(() => {}); // silently fall back to emoji icons
  }, []);

  return icons;
}
