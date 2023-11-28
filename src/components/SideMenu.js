"use client";
import Link from "next/link";
import styles from "./styles/SideMenu.module.css";

const SideMenuList = [
  {
    name: "ClubInfo",
    path: "/clubinfo",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Game Ranking",
    path: "/ranking",
  },
  {
    name: "Guest Book",
    path: "/guestbook",
  },
  {
    name: "Camera",
    path: "/camera",
  },
];

export default function SideMenu({ isOpen }) {
  return (
    <div className={`${styles.sideMenu} ${isOpen ? styles.open : ""}`}>
      <div className={styles.menuList}>
        {SideMenuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
