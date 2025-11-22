# TinaCMS Integration

This site is now integrated with [TinaCMS](https://tina.io/), a Git-backed content management system.

## Local Development

To run the site with TinaCMS locally:

```bash
npm run dev
```

This will start both the Astro development server and the TinaCMS backend. The TinaCMS admin interface will be available at:

- **Admin UI**: http://localhost:4321/admin/index.html
- **GraphQL Playground**: http://localhost:4321/admin/index.html#/graphql

## Content Collections

TinaCMS is configured to manage the following content collections:

- **Notes** (`src/content/notes`) - Blog posts and articles
- **Code Projects** (`src/content/code`) - Portfolio projects
- **Favorites** (`src/content/favorites`) - Curated favorite items

## Building for Production

For production builds without TinaCMS cloud credentials:

```bash
npm run build
```

If you have TinaCMS cloud credentials configured, use:

```bash
npm run build:tina
```

## TinaCMS Cloud Setup (Optional)

For production editing capabilities, you can set up TinaCMS Cloud:

1. Create an account at [tina.io](https://tina.io/)
2. Create a new project and get your credentials
3. Add the following environment variables:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
4. Use `npm run build:tina` to build with TinaCMS cloud integration

## Configuration

The TinaCMS configuration is located at `tina/config.ts`. This file defines:

- Content schemas for each collection
- Field types and validation
- Media management settings
- Build output configuration

## Learn More

- [TinaCMS Documentation](https://tina.io/docs/)
- [Astro + TinaCMS Guide](https://docs.astro.build/en/guides/cms/tina-cms/)
