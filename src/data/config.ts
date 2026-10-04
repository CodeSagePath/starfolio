export const CONFIG = {
  // ---------------------------------------------------------------------------
  // Site Settings
  // ---------------------------------------------------------------------------
  site: {
    url: "https://codesagepath.dev",
    locale: "en_US",
    twitterHandle: "@rishi__garg",
  },

  // ---------------------------------------------------------------------------
  // GitHub Integration Settings
  // Specify your GitHub username and the specific repositories you want to showcase.
  // ---------------------------------------------------------------------------
  github: {
    username: "CodeSagePath",
    featuredRepos: [],
  },

  // ---------------------------------------------------------------------------
  // SEO Settings
  // ---------------------------------------------------------------------------
  seo: {
    titleTemplate: "%s | %n", // %s = page title, %n = DATA.name
    twitterCard: "summary_large_image" as const,
    robots: "index, follow",
  },

  // ---------------------------------------------------------------------------
  // Typography
  // ---------------------------------------------------------------------------
  typography: {
    // Base font size as a percentage. 100 = browser default (16px).
    // 110 = 10% larger or 90 = 10% smaller, across all text, headings, and links simultaneously.
    baseFontSize: 115,
  },

  // ---------------------------------------------------------------------------
  // Blog Settings
  // ---------------------------------------------------------------------------
  blog: {
    postsPerPage: 10,
  },

  // ---------------------------------------------------------------------------
  // Font Settings
  // See https://fontsource.org/?variable=true for fonts that can be installed via package registry
  // To change fonts:
  // 1. pnpm install @fontsource-variable/<font-name> (for example 'pnpm add @fontsource-variable/inter'). Install BOTH the sans and mono fonts.
  // 2. Edit src/styles/global.css - swap the @import and --font-sans and --font-mono values
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Design Settings
  // 1. Pick a theme at ui.shadcn.com/themes or generate one with a tool like tweakcn.com
  // 2. Copy the CSS variables block
  // 3. Paste into BELOW with the naming conversion already used
  // ---------------------------------------------------------------------------

  theme: {
    radius: "0.625rem",

    light: {
      background: "oklch(0.985 0.012 260)",
      foreground: "oklch(0.18 0.03 260)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.18 0.03 260)",
      popover: "oklch(1 0 0)",
      popoverForeground: "oklch(0.18 0.03 260)",
      primary: "oklch(0.52 0.24 277)",
      primaryForeground: "oklch(0.985 0.012 260)",
      secondary: "oklch(0.95 0.03 277)",
      secondaryForeground: "oklch(0.3 0.12 277)",
      muted: "oklch(0.96 0.02 260)",
      mutedForeground: "oklch(0.45 0.05 260)",
      accent: "oklch(0.93 0.07 80)",
      accentForeground: "oklch(0.25 0.06 80)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.89 0.035 260)",
      input: "oklch(0.89 0.035 260)",
      ring: "oklch(0.58 0.2 277)",
    },

    dark: {
      background: "oklch(0.15 0.025 260)",
      foreground: "oklch(0.96 0.015 260)",
      card: "oklch(0.2 0.035 260)",
      cardForeground: "oklch(0.96 0.015 260)",
      popover: "oklch(0.2 0.035 260)",
      popoverForeground: "oklch(0.96 0.015 260)",
      primary: "oklch(0.72 0.17 277)",
      primaryForeground: "oklch(0.16 0.035 260)",
      secondary: "oklch(0.27 0.06 277)",
      secondaryForeground: "oklch(0.95 0.02 277)",
      muted: "oklch(0.25 0.035 260)",
      mutedForeground: "oklch(0.72 0.04 260)",
      accent: "oklch(0.32 0.08 80)",
      accentForeground: "oklch(0.94 0.05 80)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 12%)",
      input: "oklch(1 0 0 / 16%)",
      ring: "oklch(0.65 0.16 277)",
    },
  },

} as const;
