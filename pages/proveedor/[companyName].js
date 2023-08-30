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

  useEffect(() => {
    const fetchCompany = async () => {
      // Utilizar el parámetro `companyName` en la consulta a la base de datos
      const { data: companyData, error } = await supabase
        .from('companies')
        .select('*')
        .eq('name', companyName)
        .single();

      if (error) {
        console.error(error);
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
      setLoading(false)
    };

    if (companyName) {
      fetchCompany();
    }
  }, [companyName]);

  return (
    <>
      {loading ? ( // Mostrar pantalla de carga si loading es true
        <Loading />
      ) : (
        <>
          <Banner companyId={company.id} />
          <PresntationCompany company={company} />
          <CatalogProducts catalogs={catalogs} companyId={company.id} loading={setLoading} />
        </>
      )}
    </>
  )
};

export default CompanyCatalogPage;
