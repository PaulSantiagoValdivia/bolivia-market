// components/ErrorPage.js
import React from 'react';
import styles from './error.module.css';
import Logo from '@/components/atoms/Logo';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Logo/>
      <div className={styles.text}>

        <h1 className={styles.title}>Esta página no existe</h1>
        <button className={styles.button} onClick={() => router.push("/")}>regresar</button>
      </div>
    </div>

  );
};

export default ErrorPage;
