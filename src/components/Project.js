import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/projects.module.css";

export default function Project({ path, name }) {
  return (
    <div className={styles.flex}>
      <Link href={path} className={styles.imgCover}>
        <Image src={`/images${path}.png`} width={426} height={240} alt={name} />
      </Link>
      <h3 className={styles.subtitle}>{name}</h3>
    </div>
  );
}
