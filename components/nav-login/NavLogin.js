import Logo from "../atoms/Logo";
import styles from './nav.module.css'
import { useRouter } from "next/router";
const NavLogin = () => {
  const router= useRouter();
  return (
    <nav className={styles.navContainer}>
    <Logo />
    <p className={styles.navInfo} >ingreso de provedores</p>
  </nav>
  );
}
export default NavLogin;