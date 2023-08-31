import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './banner.module.css';
import Image from 'next/image';

export default function Banner({banner}) {
  const [bannerUrl, setBannerUrl] = useState(banner);

  return (
    <div className={styles.container}>
      {bannerUrl && (
        <Image
        className={styles.banner}
        src={bannerUrl}
        alt="banner"
        width={1510}
        height={520}
        />
      )}
    </div>
  );
}
