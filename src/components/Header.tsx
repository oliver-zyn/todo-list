import logoImg from "../assets/Logo.svg";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={logoImg} alt="Logo Todo" />
      </div>
    </header>
  );
}
