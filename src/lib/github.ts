import { CONFIG } from "@/data/config";

export interface GitHubProject {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links: {
    type: string;
    href: string;
    iconName?: string;
  }[];
  image?: string;
  video?: string;
  stars?: number;
}

export async function fetchFeaturedGitHubRepos(): Promise<GitHubProject[]> {
  const { username, featuredRepos } = CONFIG.github;

  if (!username || !featuredRepos || featuredRepos.length < 1) {
    return [];
  }

  const projects: GitHubProject[] = [];

  for (const repoName of featuredRepos) {
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Astro-Starfolio-App",
        },
      });

      if (!response.ok) {
        console.warn(`[GitHub Integration] Failed to fetch repo ${repoName}: ${response.statusText}`);
        continue;
      }

      const repo = await response.json();

      const tags: string[] = [];
      if (repo.language) tags.push(repo.language);
      if (Array.isArray(repo.topics)) {
        tags.push(...repo.topics.slice(0, 4));
      }

      const links: GitHubProject["links"] = [
        {
          type: "Source",
          href: repo.html_url,
          iconName: "github",
        },
      ];

      if (repo.homepage) {
        links.unshift({
          type: "Website",
          href: repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`,
          iconName: "globe",
        });
      }

      const updatedYear = repo.updated_at ? new Date(repo.updated_at).getFullYear().toString() : "";

      projects.push({
        title: repo.name,
        href: repo.homepage || repo.html_url,
        dates: updatedYear ? `Updated ${updatedYear}` : "Active",
        active: !repo.archived,
        description: repo.description || "GitHub repository",
        technologies: tags,
        links,
        stars: repo.stargazers_count,
      });
    } catch (err) {
      console.warn(`[GitHub Integration] Error fetching repo ${repoName}:`, err);
    }
  }

  return projects;
}
