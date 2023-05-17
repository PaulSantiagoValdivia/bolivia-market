import Logo from "../atoms/Logo";
import styles from './nav.module.css'
const NavLogin = () => {
  return (
    <nav className={styles.navContainer}>
    <Logo />
    <p className={styles.navInfo} >ingreso de provedores</p>
  </nav>
  );
}
export default NavLogin;