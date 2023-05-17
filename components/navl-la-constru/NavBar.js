import Logo from "../atoms/Logo";
import styles from "./nav.module.css";
export default function NavBar() {
  return (
    <nav className={styles.navContainer}>
      <Logo />
      <p className={styles.description}>Encontra todo para tu negocio directo de proveedores, sin intermediarios</p>
      <p className={styles.description} >Cochabamba</p>
    </nav>
  );
}