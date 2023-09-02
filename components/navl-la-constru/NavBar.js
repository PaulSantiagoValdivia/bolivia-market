import Logo from "../atoms/Logo";
import styles from "./nav.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
export default function NavBar() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.div}>
      <Logo />
      <p className={styles.p}>Encontra todo para tu negocio directo de proveedores, sin intermediarios</p>
      </div>
      <div className={styles.div}>
      <p className={styles.description}>
          <FaMapMarkerAlt/>
          Cochabamba
        </p>
      </div>
    </nav>
  );
}