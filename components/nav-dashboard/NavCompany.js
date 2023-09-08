import Logo from "../atoms/Logo";
import { useRouter } from "next/router";
import styles from './nav.module.css'
import { supabase } from "@/lib/supabaseClient";
const NavCompany = ({companyName})=> {
  const router = useRouter();
  const redirectToCatalog = (companyName) => {
    router.push(`/proveedor/${companyName}`);
  };
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      router.push('/inicio'); // Redirige a la página de inicio de sesión
    }
  }
  return (
    <>
      <nav className={styles.container} NavContainer>
      <Logo/>
      <button className={styles.buttonSignOut}  onClick={signOut}>cerrar session</button>
      <button  onClick={() => redirectToCatalog(companyName)} className={styles.button}>ver pagina</button>
      </nav>
    </>
  )
}

export default NavCompany;