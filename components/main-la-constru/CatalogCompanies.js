import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import styles from './catalog.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function CatalogCompanies({companies}) {
  const [images, setImages] = useState({});
  const router = useRouter();
  


  useEffect(() => {
    const fetchImages = async () => {
      const companyIds = companies.map((company) => company.id);
      const imagePromises = companyIds.map(async (companyId) => {
        const { data: companyData, error } = await supabase
          .from('companies')
          .select('imagen_portada')
          .eq('id', companyId)
          .single();

        if (error) {
          console.error(error);
          return null;
        }

        const imageName = companyData.imagen_portada;
        if (!imageName) return null;

        const { data, error: downloadError } = await supabase.storage
          .from('comp')
          .download(`${companyId}/${imageName}`);

        if (downloadError) {
          console.error(downloadError);
          return null;
        }

        return { companyId, data };
      });

      const downloadedImages = await Promise.all(imagePromises);
      const images = downloadedImages.reduce((acc, image) => {
        if (image) {
          acc[image.companyId] = URL.createObjectURL(image.data);
        }
        return acc;
      }, {});

      setImages(images);

    };

    fetchImages();
  }, [companies]);

  const redirectToCatalog = (companyName) => {
    router.push(`/proveedor/${encodeURIComponent(companyName)}`);
  };

  return (
    <div className={styles.container}>
      {companies.map((company) => {
        const companyImage = images[company.id];
        return (
          <div
            className={styles.containerCompanies}
            key={company.id}
            onClick={() => redirectToCatalog(company.name)}
          >
            {companyImage && (
              <Image
                className={styles.imgCompanies}
                src={companyImage}
                alt={company.name}
                width={100}
                height={225}
                loading="lazy"
              />
            )}
            <a className={styles.nameCompanies}>
              {company?.name?.charAt(0).toUpperCase() + company?.name?.substring(1)}
            </a>
          </div>
        );
      })}
    </div>
  );
}
