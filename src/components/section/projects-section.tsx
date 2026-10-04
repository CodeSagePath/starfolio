import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { fetchFeaturedGitHubRepos, type GitHubProject } from "@/lib/github";
import { Icons } from "@/components/icons";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    const [gitHubProjects, setGitHubProjects] = useState<GitHubProject[]>([]);

    useEffect(() => {
        fetchFeaturedGitHubRepos()
            .then((repos) => setGitHubProjects(repos))
            .catch((err) => console.error("Error fetching GitHub repos:", err));
    }, []);

    const manualProjects = (DATA.projects || []).map((project) => ({
        title: project.title,
        href: project.href,
        dates: project.dates,
        description: project.description,
        technologies: project.technologies,
        image: project.image,
        video: project.video,
        links: project.links,
    }));

    const formattedGitHubProjects = gitHubProjects.map((gh) => ({
        title: gh.title,
        href: gh.href,
        dates: gh.dates,
        description: gh.description,
        technologies: gh.technologies,
        image: gh.image,
        video: gh.video,
        links: gh.links.map((l) => ({
            type: l.type,
            href: l.href,
            icon: l.iconName === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
        })),
    }));

    const allProjects = [...manualProjects, ...formattedGitHubProjects];

    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"
                        />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">{DATA.sections.projects.label}</span>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"
                        />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{DATA.sections.projects.heading}</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            {DATA.sections.projects.text}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto auto-rows-fr">
                    {allProjects.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                image={project.image}
                                video={project.video}
                                links={project.links}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
