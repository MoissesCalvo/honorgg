import { NextResponse } from "next/server";
import { fetchAllClasses, fetchClass, fetchClassMedia, fetchSpecMedia, getIconUrl } from "@/lib/blizzard-api";

export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const index = await fetchAllClasses();

    const classes = await Promise.all(
      index.classes.map(async (c) => {
        const [cls, media] = await Promise.all([
          fetchClass(c.id),
          fetchClassMedia(c.id),
        ]);

        const specs = await Promise.all(
          cls.specializations.map(async (s) => {
            const specMedia = await fetchSpecMedia(s.id);
            return {
              id: s.id,
              name: s.name,
              iconUrl: getIconUrl(specMedia),
            };
          })
        );

        return {
          id: cls.id,
          name: cls.name,
          iconUrl: getIconUrl(media),
          specs,
        };
      })
    );

    return NextResponse.json({ classes });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
