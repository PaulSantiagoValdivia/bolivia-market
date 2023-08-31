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
    const fetchCompany = async () => {
      if (!companyName) {
        return;
      }

      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('name', companyName)
        .single();

      if (companyError) {
        console.error(companyError);
        return;
      }
      setCompany(companyData);

      const { data: catalogsData, error: catalogsError } = await supabase
        .from('catalogs')
        .select('*')
        .eq('company_id', companyData.id);

      if (catalogsError) {
        console.error(catalogsError);
        return;
      }
      setCatalogs(catalogsData);
      const { data: bannerData, error: bannerError } = await supabase
        .from('companies')
        .select('banner')
        .eq('id', companyData.id)
        .single();

      if (bannerError) {
        console.error(bannerError);
        return;
      }

      const bannerImageName = bannerData.banner;
      if (!bannerImageName) {
        console.error('No se encontró el nombre de la imagen de banner');
        return;
      }

      const { data: imageData, error: downloadError } = await supabase.storage
        .from('comp')
        .download(`${companyData.id}/${bannerImageName}`);

      if (downloadError) {
        console.error(downloadError);
        return;
      }

      const bannerImageUrl = URL.createObjectURL(imageData);
      setBannerUrl(bannerImageUrl);
      setLoading(false);
    };

    fetchCompany();
  }, [companyName]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Banner companyId={company.id} banner={bannerUrl} />
          <PresntationCompany company={company} />
          <CatalogProducts catalogs={catalogs} companyId={company.id} />
        </>
      )}
    </>
  );
};

export default CompanyCatalogPage;
