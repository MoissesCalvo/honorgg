/**
 * Blizzard Game Data API client
 * Docs: https://develop.battle.net/documentation/world-of-warcraft/game-data-apis
 */

const REGION = process.env.BLIZZARD_REGION ?? "us";
const TOKEN_URL = `https://oauth.battle.net/token`;
const API_BASE = `https://${REGION}.api.blizzard.com`;
const NAMESPACE_STATIC = `static-${REGION}`;
const NAMESPACE_DYNAMIC = `dynamic-${REGION}`;
const LOCALE = "en_US";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing BLIZZARD_CLIENT_ID or BLIZZARD_CLIENT_SECRET env vars");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Blizzard OAuth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000, // refresh 1 min early
  };

  return cachedToken.token;
}

async function blizzardFetch<T>(path: string, namespace: string): Promise<T> {
  const token = await getAccessToken();
  const url = `${API_BASE}${path}?namespace=${namespace}&locale=${LOCALE}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 }, // cache 1 hour
  });

  if (!res.ok) {
    throw new Error(`Blizzard API error ${res.status} for ${path}`);
  }

  return res.json();
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BlizzardClass {
  id: number;
  name: string;
  specializations: { id: number; name: string }[];
  media: { key: { href: string } };
}

export interface BlizzardSpec {
  id: number;
  name: string;
  description: string;
  role: { type: string; name: string };
  playable_class: { id: number; name: string };
  media: { key: { href: string } };
}

export interface BlizzardMedia {
  assets: { key: string; value: string }[];
}

// ─── API calls ───────────────────────────────────────────────────────────────

export async function fetchAllClasses(): Promise<{ classes: { id: number; name: string }[] }> {
  return blizzardFetch("/data/wow/playable-class/index", NAMESPACE_STATIC);
}

export async function fetchClass(classId: number): Promise<BlizzardClass> {
  return blizzardFetch(`/data/wow/playable-class/${classId}`, NAMESPACE_STATIC);
}

export async function fetchSpec(specId: number): Promise<BlizzardSpec> {
  return blizzardFetch(`/data/wow/playable-specialization/${specId}`, NAMESPACE_STATIC);
}

export async function fetchClassMedia(classId: number): Promise<BlizzardMedia> {
  return blizzardFetch(`/data/wow/media/playable-class/${classId}`, NAMESPACE_STATIC);
}

export async function fetchSpecMedia(specId: number): Promise<BlizzardMedia> {
  return blizzardFetch(`/data/wow/media/playable-specialization/${specId}`, NAMESPACE_STATIC);
}

/** Returns the icon URL from a Blizzard media response */
export function getIconUrl(media: BlizzardMedia): string | null {
  return media.assets.find((a) => a.key === "icon")?.value ?? null;
}
