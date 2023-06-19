import styles from './footer.module.css'
import { useRouter } from 'next/router';
const Footer =  ()=>{
  const router= useRouter();
return(
  <div className={styles.footerContent}> 
   <p className={styles.inicio} onClick={() => router.push("https://la-constru.vercel.app/inicio")}>
    si eres provedor da click aca para inicar session
    </p>
  </div>
)
}

export default Footer;