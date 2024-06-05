// components/GoogleAnalytics.tsx
import { useEffect } from 'react';
import Script from 'next/script';

const GoogleAnalytics = ({ trackingId }: { trackingId: string }) => {
  useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  }, [trackingId]);

  return (
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
    />
  );
};

export default GoogleAnalytics;
