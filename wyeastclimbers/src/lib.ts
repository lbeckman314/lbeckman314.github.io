import { getCollection, type CollectionEntry } from "astro:content";

export const categoryLabels: Record<CollectionEntry<"milestones">["data"]["category"], string> = {
  club: "Club life",
  climb: "Climbs",
  rescue: "Patrol & rescue",
  context: "Mount Hood context",
  legacy: "Legacy",
};

export async function getMilestones() {
  const all = await getCollection("milestones");
  const dated = all
    .filter((m) => !m.data.undated && m.data.date)
    .sort((a, b) => a.data.date!.getTime() - b.data.date!.getTime());
  const undated = all.filter((m) => m.data.undated || !m.data.date);
  return { dated, undated, all };
}

export async function getExhibits() {
  return (await getCollection("exhibits", (e) => !e.data.draft)).sort((a, b) => a.data.order - b.data.order);
}

export async function getPeople() {
  return (await getCollection("people")).sort((a, b) => a.data.order - b.data.order);
}

export const membershipLabels = {
  member: "Wy'east Climber",
  probable: "Wy'east Climber (to confirm)",
  associate: "Friend of the club",
} as const;
