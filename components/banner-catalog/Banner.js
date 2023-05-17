import styles from './banner.module.css';

export default function Banner() {
  return (
    <div className={styles.container}>
      <img className={styles.banner} src="/images/banner.png" alt="banner" />
      </div>
  )
}