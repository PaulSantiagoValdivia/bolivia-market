import Logo from "../atoms/Logo";
import { useRouter } from "next/router";
import styles from './nav.module.css'

const NavCompany = ({companyName})=> {
  const router = useRouter();
  const redirectToCatalog = (companyName) => {
    router.push(`${encodeURIComponent(companyName)}`);
    console.log(companyName);
  };
  return (
    <>
      <nav className={styles.container} NavContainer>
      <Logo/>
      <button  onClick={() => redirectToCatalog(companyName)} className={styles.button}>ver pagina</button>
      </nav>
    </>
  )
}

export default NavCompany;