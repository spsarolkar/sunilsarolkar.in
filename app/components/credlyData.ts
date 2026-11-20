export const CREDLY_FEED_URL = "https://raw.githubusercontent.com/spsarolkar/spsarolkar.github.io/master/_data/credly_badges.json";
export const CREDLY_PROFILE_URL = "https://www.credly.com/users/sunil-sarolkar/badges";
const professionalOrigin = "https://spsarolkar.github.io";

export type CredlyBadge = {
  id: string;
  name: string;
  issuer: string;
  image: string;
  url: string;
  issued?: string;
  issuedLabel?: string;
};

export function normaliseBadges(value: unknown): CredlyBadge[] {
  if (!Array.isArray(value)) return [];
  const badges = new Map<string, CredlyBadge>();
  for (const record of value) {
    if (!record || typeof record !== "object") continue;
    const text = (key: string) => typeof record[key] === "string" ? record[key].trim() : "";
    try {
      const name = text("name");
      const url = new URL(text("url"));
      const id = url.pathname.match(/^\/badges\/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})(?:\/public_url)?\/?$/i)?.[1];
      const image = new URL(text("image340") || text("image"), professionalOrigin);
      if (!name || !id || url.protocol !== "https:" || !["www.credly.com", "credly.com"].includes(url.hostname)) continue;
      if (image.protocol !== "https:" || !(image.hostname === "images.credly.com" || (image.origin === professionalOrigin && image.pathname.startsWith("/assets/")))) continue;
      const issued = text("issued");
      badges.set(id, {
        id, name, issuer: text("issuer"), image: image.href, url: url.href,
        ...(issued ? { issued, issuedLabel: text("issuedLabel") || issued } : {}),
      });
    } catch {
      // Invalid records cannot replace usable saved credentials.
    }
  }
  return [...badges.values()];
}

export async function loadCredlyBadges(fetcher: typeof fetch = fetch, signal?: AbortSignal): Promise<CredlyBadge[]> {
  const response = await fetcher(CREDLY_FEED_URL, { cache: "no-store", credentials: "omit", signal });
  if (!response.ok) throw new Error("Badge feed unavailable");
  const payload: unknown = await response.json();
  if (!Array.isArray(payload) || payload.some((record) => normaliseBadges([record]).length !== 1)) {
    throw new Error("Badge feed contains invalid credentials");
  }
  const badges = normaliseBadges(payload);
  if (!badges.length) throw new Error("Badge feed contains no usable credentials");
  return badges;
}
