import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import styles from './catalog.module.css';
import { useRouter } from 'next/router';
const imgCompany = [
  {
    id: 17,
    image: '/images/company1.png'
  },
  {
    id: 18,
    image: '/images/company2.png'
  },
  {
    id: 19,
    image: '/images/company3.png'
  },
  {
    id: 20,
    image: '/images/company4.png'
  }
];
export default function CatalogCompanies() {
  const [companies, setCompanies] = useState([]);
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

  const redirectToCatalog = (companyName) => {
    router.push(`${encodeURIComponent(companyName)}`);
    console.log(companyName);
  };
  
  return (
    <div className={styles.container}>
      {companies.map((company) => {
        const companyImage = imgCompany.find((img) => img.id === company.id);
        return (
          <div className={styles.containerCompanies} key={company.id} onClick={() => redirectToCatalog(company.name)}>
            <img className={styles.imgCompanies} src={companyImage.image} alt={company.name} />
            <a className={styles.nameCompanies}> {company?.name?.charAt(0).toUpperCase() + company?.name?.substring(1)}
        </a>
          </div>
        )
      })}
    </div>
  );
}

