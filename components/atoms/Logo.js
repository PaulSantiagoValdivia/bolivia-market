import styles from './logo.module.css'
import { useRouter } from 'next/router'
export default function Logo() {
  const router = useRouter();
  return (
    <div className={styles.logo}>
    La<span className={styles.title} onClick={() => router.push("/")}>Constru.com</span>
    </div>
  )
}