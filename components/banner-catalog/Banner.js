import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './banner.module.css';
import Image from 'next/image';

export default function Banner({ companyId }) {
  const [bannerUrl, setBannerUrl] = useState('');

  const fetchImages = async () => {
    const { data: companyData, error } = await supabase
      .from('companies')
      .select('banner')
      .eq('id', companyId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    const bannerImageName = companyData.banner;
    if (!bannerImageName) {
      console.error('No se encontró el nombre de la imagen de banner');
      return;
    }

    const { data: imageData, error: downloadError } = await supabase.storage
      .from('comp')
      .download(`${companyId}/${bannerImageName}`);

    if (downloadError) {
      console.error(downloadError);
      return;
    }

    const bannerImageUrl = URL.createObjectURL(imageData);
    console.log(bannerImageUrl);
    setBannerUrl(bannerImageUrl);
  };

  useEffect(() => {
    if (companyId) {
      fetchImages();
    }
  }, [companyId]);

  return (
    <div className={styles.container}>
      {bannerUrl && (
        <div className={styles.bannerContainer}>
          <Image
            className={styles.banner}
            src={bannerUrl}
            alt="banner"
            width={1510}
            height={520}
          />
        </div>
      )}
    </div>
  );
}
