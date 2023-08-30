import styles from  './loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingText}>
        <span className={styles.yellowText}>L</span>
        <span className={styles.blackText}>c</span>
      </div>
    </div>
  );
};

export default  Loading;