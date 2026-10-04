// import { defineCollection } from 'astro:content';
import { defineCollection } from 'astro:content';
import githubReposLoader from 'github-repos-astro-loader';

// Define a collection called 'projects' that gets its data from GitHub
const projects = defineCollection({
    loader: githubReposLoader({
        // Read the token from the .env file
        apiToken: import.meta.env.GITHUB_TOKEN,
        // Your GitHub username
        username: 'your-github-username',
        // (Optional) Filter out forks and only show repos with at least 1 star
        filter: (repo) => !repo.fork && repo.stargazers_count! > 0,
    }),
});

export const collections = { projects };
