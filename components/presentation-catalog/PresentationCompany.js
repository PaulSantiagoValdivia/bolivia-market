import { useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './company.module.css';
export default function PresntationCompany({ company }) {
  const router = useRouter();
  const ref = useRef(null);

  const handleViewProducts = () => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div className={styles.presentation}>
        <div className={styles.container}>
          <h1 className={styles.nameCompany}>{company?.name?.charAt(0).toUpperCase() + company?.name?.substring(1)}
          </h1>
          <p className={styles.slogan}>{company.titulo_catalogo}</p>
        </div>
        <p className={styles.p}>{company.descripcion}</p>
        <a className={styles.viewProducts} onClick={handleViewProducts} >Ver productos</a>
      </div>
      <p className={styles.info}>PRODUCTOS DESTACADOS</p>
      <button className={styles.backCatalog} onClick={() => router.push("https://la-constru.vercel.app/")}>
        <p className={styles.backText}>ver otros catálogos</p>
        <p className={styles.date}>abril 2023</p>
      </button>
      <div ref={ref} />
    </>
  );
}
