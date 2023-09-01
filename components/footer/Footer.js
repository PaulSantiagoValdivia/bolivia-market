import styles from './footer.module.css'
import { useRouter } from 'next/router';
const Footer = () => {
  const router = useRouter();
  return (
    <div className={styles.footerContent}>
      <p className={styles.inicio} onClick={() => router.push("/inicio")}>
        si eres provedor da click aca para inicar session
      </p>
      <o className={styles.create}>Pagina creada por Santiago Valdivia - 2023</o>
    </div>
  )
}

export default Footer;