import Layout from "@/components/Layout";
import styles from "./styles/Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <Layout>
        <div className={styles.margin}>
          <div>{/* 내용 작성 */}</div>
        </div>
      </Layout>
    </footer>
  );
}
