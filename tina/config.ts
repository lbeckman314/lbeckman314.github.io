import { defineConfig, type TinaField } from "tinacms";

// TinaCMS - https://tina.io/docs/
// Admin UI: /admin/index.html. Locally, `npm run dev:tina` starts Astro plus
// Tina's local content server and saves straight to files on disk. In
// production, editing goes through Tina Cloud, which needs TINA_CLIENT_ID and
// TINA_TOKEN (see .github/workflows/build.yaml).

// Note: Tina saves dates as full ISO timestamps (2026-07-19T00:00:00.000Z)
// rather than the existing plain YYYY-MM-DD. Astro's schema reads both.
const dateField = (
  name: string,
  label: string,
  required = false,
): TinaField => ({
  type: "datetime",
  name,
  label,
  required,
  ui: { dateFormat: "YYYY-MM-DD" },
});

const frontmatter: TinaField[] = [
  {
    type: "string",
    name: "title",
    label: "Title",
    isTitle: true,
    required: true,
  },
  { type: "string", name: "subtitle", label: "Subtitle" },
  dateField("date", "Date", true),
  {
    type: "string",
    name: "description",
    label: "Description",
    ui: { component: "textarea" },
  },
  dateField("updated", "Updated"),
  { type: "string", name: "series", label: "Series" },
  { type: "boolean", name: "draft", label: "Draft" },
  { type: "boolean", name: "archive", label: "Archive" },
  { type: "string", name: "tags", label: "Tags", list: true },
  { type: "string", name: "socials", label: "Socials", list: true },
];

export default defineConfig({
  branch:
    process.env.TINA_BRANCH ||
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF_NAME ||
    "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Repo-based media: uploads are committed to public/assets/images and
  // written into posts as /assets/images/<file>.
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "assets/images",
    },
  },

  schema: {
    collections: [
      {
        name: "notes",
        label: "Notes",
        path: "src/content/notes",
        format: "md",
        fields: [
          ...frontmatter,
          { type: "rich-text", name: "body", label: "Content", isBody: true },
        ],
      },
      {
        name: "notes_mdx",
        label: "Notes (MDX)",
        path: "src/content/notes",
        format: "mdx",
        fields: [
          ...frontmatter,
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
            // Components editors can insert from the toolbar's "Embed" menu.
            // Each one also has to be passed to <Content components={...} />
            // in src/pages/notes/[...slug].astro.
            templates: [
              {
                name: "Strava",
                label: "Strava activity",
                fields: [
                  {
                    type: "string",
                    name: "id",
                    label: "Activity ID",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "token",
                    label: "Embed token (from Strava's Share → Embed code)",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
