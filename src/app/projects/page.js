import Project from "@/components/Project";
import styles from "@/styles/projects.module.css";

export default function Projects() {
  const projects = [
    { path: "/projects/speedy", name: "Speedy" },
    { path: "/projects/worrrd", name: "WORRRD!" },
    { path: "/projects/meteor-impact", name: "MeteorImpact" },
    { path: "/projects/", name: "기숙사 102호" },

    { path: "/projects/anione-gpt", name: "애니원GPT" },
    { path: "/projects/camera", name: "웹생네컷" },

    { path: "/projects/gunchemist", name: "건케미스트" },

    { path: "/projects/spike-rush", name: "SpikeRush" },
    { path: "/projects/dino-rush", name: "DinoRush" },
    { path: "/projects/ordinary-rhythm", name: "OrdinaryRhythm" },
    { path: "/projects/stars-way", name: "별들의 길" },
    { path: "/projects/elite-pilot", name: "엘리트 파일럿" },

    { path: "/projects/quiz", name: "맞춰라! 퀴즈" },
    { path: "/projects/escape-maze", name: "미로 탈출" },
    { path: "/projects/dino-game", name: "구글 공룡게임" },
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
