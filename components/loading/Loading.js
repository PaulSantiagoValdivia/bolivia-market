import styles from  './loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingText}>
        <span className={styles.yellowText}>Bolivia</span>
        <span className={styles.blackText}>Market</span>
      </div>
    </div>
  );
};

export default  Loading;