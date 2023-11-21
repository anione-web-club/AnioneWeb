"use client";
import Link from "next/link";
import styles from "./styles/SideMenu.module.css";

const SideMenuList = [
  {
    name: "동아리 정보",
    path: "/clubinfo",
  },
  {
    name: "작품 목록",
    path: "#projects",
  },
  {
    name: "게임 랭킹",
    path: "#ranking",
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
