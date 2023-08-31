import styles from './banner.module.css';

export default function Banner({ banner}) {

  return (
    <div className={styles.container}>
      {banner && (
        <img
          className={styles.banner}
          src={banner}
          alt="banner"
          width={1510}
          height={520}
        />
      )}
    </div>
  );
}
