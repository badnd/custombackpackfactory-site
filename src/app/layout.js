import './globals.css';
import Script from 'next/script';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { siteData } from '@/data/site-data';
import { JsonLd } from '@/components/JsonLd';
import { assetPath, organizationSchema } from '@/lib/paths';

export const metadata = {
  metadataBase: new URL('https://www.custombackpackfactory.com'),
  title: {
    default: 'Custom Backpack Factory | OEM/ODM Backpack Manufacturer',
    template: '%s | Custom Backpack Factory'
  },
  description: 'Tianjin Junyi Premium Trading Co.,Ltd. supplies OEM/ODM custom backpacks for B2B buyers, including custom backpacks, laptop backpacks, school backpacks and outdoor bags.',
  openGraph: {
    type: 'website',
    siteName: 'Custom Backpack Factory',
    images: [assetPath('/assets/img/products/custom-laptop-backpack-oem-logo-solutions.webp')]
  },
  twitter: {
    card: 'summary_large_image',
    images: [assetPath('/assets/img/products/custom-laptop-backpack-oem-logo-solutions.webp')]
  },
  icons: {
    icon: assetPath('/favicon.svg'),
    apple: assetPath('/favicon.svg')
  },
  verification: {
    google: 'IjmZEiftgnyfAb1Mfe5tGCwXfz75BPdq3Y0IkPR8AWg',
    other: {
      'msvalidate.01': 'AD12B57AA450C181C4A8D6F90403CA06'
    }
  }
};

export default function RootLayout({ children }) {
  const ga4 = siteData.analytics?.ga4;

  return (
    <html lang="en">
      <body>
        {ga4 ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4}');
        `}</Script>
          </>
        ) : null}
        <JsonLd data={organizationSchema(siteData)} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
