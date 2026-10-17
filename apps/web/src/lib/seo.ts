import type { Metadata } from "next";

export const indexingEnabled = process.env.SEO_INDEXABLE === "true";
export const publicRobots: Metadata["robots"] = { index: indexingEnabled, follow: indexingEnabled };
