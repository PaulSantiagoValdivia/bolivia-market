import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './catalog.module.css';
import Image from 'next/image';

export default function CatalogProducts({ catalogs, companyId }) {
  const [images, setImages] = useState({});
  
  useEffect(() => {
    const fetchImages = async () => {
      const { data: imagesData, error } = await supabase.storage
        .from('img2')
        .list(`${companyId}/`);

      if (error) {
        console.error(error);
        return;
      }

      const imageUrls = {};

      await Promise.all(imagesData.map(async (image) => {
        const { data, error: downloadError } = await supabase.storage
          .from('img2')
          .download(`${companyId}/${image.name}`);

        if (!downloadError) {
          imageUrls[image.name] = URL.createObjectURL(data);
        }
      }));

      setImages(imageUrls);
    };

    fetchImages();
  }, [companyId]);

  return (
    <div className={styles.container}>
      {catalogs.map((catalog) => (
        <div className={styles.containerProducts} key={catalog.id}>
          <Image
            className={styles.imgProducts}
            src={images[catalog.image]}
            alt={catalog.name}
            width={173}
            height={173}
            loading="lazy"
          />
          <h3 className={styles.nameProducts}>{catalog.name}</h3>
          <p className={styles.descriptionProducts}>{catalog.description}</p>
          <p className={styles.categoryProducts}>
            {catalog.price} {catalog.currency_type}
          </p>
        </div>
      ))} 
    </div>
  );
}
