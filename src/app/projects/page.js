import Project from "@/components/Project";
import styles from "@/styles/projects.module.css";

export default function Projects() {
  const projects = [
    { path: "/projects/speedy", name: "Speedy" },
    { path: "/projects/worrrd", name: "WORRRD!" },
    { path: "/projects/gunchemist", name: "건케미스트" },
    { path: "/projects/projectHope", name: "Project: Hope" },
    { path: "/projects/spikeRush", name: "SpikeRush" },
    { path: "/projects/dinoRush", name: "DinoRush" },
    { path: "/projects/rhythmGame", name: "리듬게임" },
    { path: "/projects/quiz", name: "맞춰라! 퀴즈" },
    { path: "/projects/escapeMaze", name: "미로 탈출" },
  ];

  return (
    <div className={styles.background}>
      <h1 className={styles.title}>_Project</h1>
      {projects.map((project) => (
        <>
          <hr />
          <Project key={project.name} path={project.path} name={project.name} />
        </>
      ))}
    </div>
  );
}
