import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Liam's Homepage",
  URL: "https://liambeckman.com",
  AUTHOR: "Liam Beckman",
  DESCRIPTION:
    "This and that!",
  EMAIL: "0b0a0c0900010c005c4145321419141f1b561a1516",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 4,
};

// GitHub account that owns the projects (used for build-time star counts) and
// the discussions repo behind comments.
export const GITHUB_USERNAME = "lbeckman314";

// This site's own repo - used to build "Edit on GitHub" links back to a
// page's source file.
export const REPO_NAME = "website";
export const REPO_BRANCH = "main";

// User-Agent sent with build-time GitHub API requests.
export const USER_AGENT = "lbeckman314";

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "The Doors of Durin, Lord of Moria. Speak, friend, and enter.",
};

export const NOTES: Metadata = {
  TITLE: "Notes",
  DESCRIPTION: "This and that!",
};

export const NOTE_TAGS: Metadata = {
  TITLE: "Note Tags",
  DESCRIPTION: "A collection of tags for my notes.",
};

export const NOTE_SERIES: Metadata = {
  TITLE: "Note Series",
  DESCRIPTION: "A collection of series for my notes.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const PROJECT_TAGS: Metadata = {
  TITLE: "Project Tags",
  DESCRIPTION: "A collection of tags for my projects.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    ICON: "tabler:brand-github",
    HREF: "https://github.com/lbeckman314",
  },
  {
    NAME: "LinkedIn",
    ICON: "tabler:brand-linkedin",
    HREF: "https://www.linkedin.com/in/liam-beckman-ab3183a6",
  },
];
