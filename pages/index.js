import Footer from "@/components/footer/Footer";
import Loading from "@/components/loading/Loading";
import CatalogCompanies from "@/components/main-la-constru/CatalogCompanies";
import NavBar from "@/components/navl-la-constru/NavBar"
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import styles from "./error.module.css"

export default function LaConstru() {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [images, setImages] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: companiesData, error: companiesError } = await supabase.from('companies').select('*');
        if (companiesError) {
          console.error(companiesError);
          return;
        }

        const companyIds = companiesData.map((company) => company.id);
        const imagePromises = companyIds.map(async (companyId) => {
          const { data: companyData, error: imageError } = await supabase
            .from('companies')
            .select('imagen_portada')
            .eq('id', companyId)
            .single();

          if (imageError) {
            console.error(imageError);
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

        setCompanies(companiesData);
        setImages(images);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const redirectToCatalog = (companyName) => {
    router.push(`/proveedor/${encodeURIComponent(companyName)}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.content}>
          <NavBar />
          <CatalogCompanies images={images} redirectToCatalog={redirectToCatalog} companies={companies} />
          <Footer />
        </div>
      )}
    </>
  );
}
