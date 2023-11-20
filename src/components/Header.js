"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import SideMenu from "@/components/SideMenu";
import styles from "./styles/Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <Layout>
        <Image src="/WebClubLogo.png" alt="로고" width={250} height={75} />

        <button onClick={toggleMenu} className={styles.moblieMenuBtn}>
          {isOpen ? <span className={styles.whiteText}>&#9747;</span> : <>&#9776;</>}
        </button>

        <SideMenu isOpen={isOpen} />
      </Layout>
    </header>
  );
}
