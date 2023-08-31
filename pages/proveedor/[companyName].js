import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Banner from '@/components/banner-catalog/Banner';
import PresntationCompany from '@/components/presentation-catalog/PresentationCompany';
import CatalogProducts from '@/components/catalog-products/CatalogProducts';
import Loading from '@/components/loading/Loading';

const CompanyCatalogPage = () => {
  const router = useRouter();
  const { companyName } = router.query;
  const [company, setCompany] = useState({});
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!companyName) {
        return;
      }

      try {
        const response = await fetch(`/api/company?companyName=${companyName}`);
        const data = await response.json();

        const { data: imageData, error: downloadError } = await supabase.storage
          .from('comp')
          .download(`${data.company.id}/${data.company.banner}`); // Cambio realizado aquí

        if (downloadError) {
          console.error(downloadError);
          return;
        }
        const bannerImage = URL.createObjectURL(imageData);
        setBannerUrl(bannerImage);
        setCompany(data.company);
        setCatalogs(data.catalogs);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyName]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Banner banner={bannerUrl} companyId={company.id} />
          <PresntationCompany company={company} />
          <CatalogProducts catalogs={catalogs} companyId={company.id} />
        </>
      )}
    </>
  );
};

export default CompanyCatalogPage;
