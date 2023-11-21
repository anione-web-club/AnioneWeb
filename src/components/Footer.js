import Layout from "@/components/Layout";
import styles from "./styles/Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <Layout>
        <div className={styles.padding}>
          <div>제작: 웹 프로그래밍 동아리</div>
        </div>
      </Layout>
    </footer>
  );
}
