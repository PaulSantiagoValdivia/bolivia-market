import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './catalog.module.css';
export default function CatalogProducts({catalogs, companyId}) {
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

      const images = {};
      for (const image of imagesData) {
        const { data, error: downloadError } = await supabase.storage
          .from('img2')
          .download(`${companyId}/${image.name}`);
        if (downloadError) {
          console.error(downloadError);
          continue;
        }
        images[image.name] = URL.createObjectURL(data);
      }
      setImages(images);
    };

    fetchImages();
  }, [companyId]);

  return (
    <div className={styles.container}>
      {catalogs.map((catalog) => {
        return (
          <div className={styles.containerProducts} key={catalog.id}>
            <img className={styles.imgProducts} src={images[catalog.image]} alt={catalog.name} />
            <h3 className={styles.nameProducts}> {catalog.name}</h3>
            <p className={styles.descriptionProducts}> {catalog.description}</p>
            <p className={styles.categoryProducts}> {catalog.price} {catalog.currency_type}</p>
          </div>
        )
      }
      )}
    </div>
  );
}
