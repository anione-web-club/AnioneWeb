import textStyle from "@/styles/text.module.css";
import Link from 'next/link';

export default function Home() {
  const projectList = [
    { name: 'Speedy', path: '/projects/speedy' },
    { name: 'WORRRD', path: '/projects/worrrd' },
    { name: 'MeteorImpact', path: '/projects/meteor-impact' },
    { name: 'DormitoryRoom', path: '/projects/dormitory-room' },
    { name: 'AnioneGPT', path: '/anione-gpt' },
    { name: 'WebCam', path: '/camera' },
  ]

  return (
    <div className={textStyle.textAlignCenter}>
      <h1>Web Programming Club</h1>
      <h2>웹 프로그래밍 동아리</h2>
      <hr />
      <p>이 페이지는 웹 프로그래밍 동아리에서 보늬축제를 위해 2023.11.17 부터 제작했습니다.</p>
      <hr />
      <h3>작품 제작 일정</h3>
      <p>23.11.17 ~ 23.11.19 / 페이지 기획 및 구상</p>
      <p>23.11.20 ~ 23.11.30 / 개인 웹 게임 제작 및 페이지 제작</p>
      <p>23.12.01 / 보늬축제, 작품 시연</p>
      <hr />
      <h3> [ 작품 목록 ]</h3>
      {projectList.map((project, index) => (
        <>
          <Link key={index} href={project.path} className={textStyle.textMargin}>
            {project.name}
          </Link>
          <br />
        </>
      ))}
    </div>
  );
}
