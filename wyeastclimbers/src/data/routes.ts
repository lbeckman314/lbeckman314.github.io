/**
 * Routes shown on the schematic map. Bearings are approximate compass
 * directions (degrees clockwise from north) of each route's aspect on the
 * mountain. This is a diagram, not a survey: check bearings before relying on them.
 */
export interface Route {
  id: string;
  name: string;
  bearing: number;
  kind: "first-ascent" | "reopened" | "standard";
  summary: string;
  /** milestone id on the timeline */
  milestone?: string;
}

export const routes: Route[] = [
  { id: "north-face", name: "North Face", bearing: 355, kind: "first-ascent", summary: "Russ McJury & Bill Hackett, 1936.", milestone: "1936-north-face" },
  { id: "eliot", name: "Eliot Glacier Headwall", bearing: 30, kind: "first-ascent", summary: "Russ McJury & Joe Leuthold, 1938 (or 1935).", milestone: "1938-eliot-headwall" },
  { id: "newton-clark", name: "Newton-Clark Headwall", bearing: 100, kind: "reopened", summary: "Reopened by the Wy'easters after years of disuse.", milestone: "undated-reopened-routes" },
  { id: "wyeast", name: "Wy'east Route", bearing: 135, kind: "first-ascent", summary: "Everett Darr, James Mount & Ralph Calkin.", milestone: "undated-wyeast-route" },
  { id: "south-side", name: "South Side", bearing: 180, kind: "standard", summary: "The standard route from Timberline, used by most parties in the 1930s." },
  { id: "leuthold", name: "Leuthold Couloir", bearing: 232, kind: "first-ascent", summary: "First ascent credited to the Wy'east Climbers; date to be confirmed.", milestone: "undated-leuthold-couloir" },
  { id: "sandy", name: "Sandy Glacier Headwall", bearing: 268, kind: "first-ascent", summary: "Russ McJury & Joe Leuthold, 1937.", milestone: "1937-sandy-headwall" },
  { id: "cathedral", name: "Cathedral Ridge", bearing: 312, kind: "reopened", summary: "Reopened by the Wy'easters after years of disuse.", milestone: "undated-reopened-routes" },
];

export const kindLabels = {
  "first-ascent": "Wy'east-era first ascent",
  reopened: "Reopened by the club",
  standard: "Standard route (for reference)",
} as const;
