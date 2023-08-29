import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import styles from './catalog.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function CatalogCompanies() {
  const [companies, setCompanies] = useState([]);
  const [images, setImages] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from('companies').select('*');
      if (error) {
        console.error(error);
        return;
      }

      setCompanies(data);
    };

    fetchCompanies();
  }, []);

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

        return { companyId, url: URL.createObjectURL(data) };
      });

      const downloadedImages = await Promise.all(imagePromises);
      const images = downloadedImages.reduce((acc, image) => {
        if (image) {
          acc[image.companyId] = image.url;
        }
        return acc;
      }, {});

      setImages(images);
    };

    fetchImages();
  }, [companies]);

  const redirectToCatalog = (companyName) => {
    router.push(`${encodeURIComponent(companyName)}`);
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
            <Image
              className={styles.imgCompanies}
              src={companyImage} // Cargar imágenes optimizadas y de tamaño adecuado en el bucket
              alt={company.name}
              width={100}
              height={225}
              loading="lazy"
            />
            <a className={styles.nameCompanies}>
              {company?.name?.charAt(0).toUpperCase() + company?.name?.substring(1)}
            </a>
          </div>
        );
      })}
    </div>
  );
}
