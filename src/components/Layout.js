import style from "./styles/Layout.module.css";

export default function ({ children }) {
  return <div className={style.container}>{children}</div>;
}
