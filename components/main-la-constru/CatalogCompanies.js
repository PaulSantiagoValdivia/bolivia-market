import React from 'react';
import styles from './catalog.module.css';
import Image from 'next/image';

export default function CatalogCompanies({ companies, images, redirectToCatalog }) {
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
