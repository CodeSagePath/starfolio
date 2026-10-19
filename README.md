<div align="center">

# CodeSagePath

**The portfolio of Rishi Garg** — software engineer building AI products, mobile applications, backend systems, and open-source tools.

[Visit CodeSagePath](https://codesagepath.dev) · [Projects](https://codesagepath.dev/#projects) · [GitHub](https://github.com/CodeSagePath) · [LinkedIn](https://www.linkedin.com/in/codesagepath)

</div>

## About

CodeSagePath presents selected product work, infrastructure, and developer tools. The portfolio includes individual project pages with engineering challenges, implementation details, and outcomes, alongside a writing section for software engineering notes.

Featured projects include:

- [AskZentic](https://codesagepath.dev/projects/askzentic) — multi-tenant document Q&A with hybrid retrieval and local language model inference.
- [AnantYatra](https://codesagepath.dev/projects/anantyatra) — map-first road trip planning with self-hosted routing.
- [Whisper Kit](https://codesagepath.dev/projects/whisper-kit) — a Flutter package for on-device speech-to-text using whisper.cpp.

## Built with

- [Astro](https://astro.build) for static site generation
- [React](https://react.dev) for interactive UI components
- [Tailwind CSS](https://tailwindcss.com) for styling
- [MDX](https://mdxjs.com) for articles

## SEO and search reporting

The site generates page titles, descriptions, canonical links, Open Graph and X cards, structured data, an XML sitemap, and a crawlable `robots.txt`. Project pages are statically generated and include their own canonical URLs and structured data.

Google Search Console and Bing Webmaster Tools provide search performance reports. Those reports are reviewed in the tools’ dashboards; this site does not install server-side analytics software.

## Run locally

**Requirements:** Node.js `>=22.12.0` and pnpm.

```bash
git clone https://github.com/CodeSagePath/starfolio.git
cd starfolio
pnpm install
pnpm dev
```

Open <http://localhost:4321>.

## Update portfolio content

- `src/data/resume.tsx` contains the profile, social links, education, skills, and project content.
- `src/data/config.ts` contains the site URL, SEO title settings, theme, and typography.
- `src/content/blog/` contains MDX articles.
- `src/pages/projects/[slug].astro` renders the static project detail pages.

## Build and deploy

Build the static site locally with:

```bash
pnpm build
```

Astro writes the production site to `dist/`. On the VPS, run the repository deployment script from the checkout:

```bash
./scripts/deploy.sh
```

The script pulls the configured branch, builds the site, validates the Nginx configuration, publishes the generated `dist/` files, and reloads Nginx.

## License

See [LICENSE](LICENSE).
