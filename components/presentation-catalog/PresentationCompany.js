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
        <p className={styles.slogan}>Agosto es el mes <br /> del interiorismo</p>
        </div>
        <p className={styles.p}>En agosto te presentamos un nuevo catalogo de sofas y sillas a tu disposicion, manteniendo el estilo y clase que nos corresponde</p>
        <a className={styles.viewProducts} onClick={handleViewProducts} >Ver productos</a>
      </div>
        <p className={styles.info}>PRODUCTOS DESTACADOS</p>
        <button className={styles.backCatalog} onClick={() => router.back()}>
        <p className={styles.backText}>ver otros catalogos</p>
        <p className={styles.date}>abril2023</p>
        </button>
        <div ref={ref}/>
      </>
      );
}
