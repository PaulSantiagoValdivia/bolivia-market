import styles from './banner.module.css';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
export default function Banner({ banner, companyId }) {
  const [bannerImageUrl, setBannerImageUrl] = useState('');

  useEffect(() => {
    async function fetchBannerImage() {
      try {
        
        const { data: imageData, error: downloadError } = await supabase.storage
          .from('comp')
          .download(`${companyId}/${banner}`); // Cambio realizado aquí
  
        if (downloadError) {
          console.error(downloadError);
          return;
        }
        const bannerImage = URL.createObjectURL(imageData);
        setBannerImageUrl(bannerImage);
      } catch (error) {
        console.error('Error al descargar la imagen de banner:', error);
      }
    }
  
    fetchBannerImage();
  }, [companyId]); // Asegúrate de incluir bannerImageName en las dependencias
  

  return (
    <div className={styles.container}>
      {banner && (
        <img
          className={styles.banner}
          src={bannerImageUrl}
          alt="banner"
          width={1510}
          height={520}
        />
      )}
    </div>
  );
}
