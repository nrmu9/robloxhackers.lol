import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { AuthProvider } from '../contexts/authContext';
import AdSense from '@/components/AdSense';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/utils/firebase';
import Script from 'next/script';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (analytics) {
                logEvent(analytics, 'page_view', { page_path: url });
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        // For logging the initial page load
        handleRouteChange(window.location.pathname);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <AuthProvider>
            <Head>
                <title>r/robloxhackers</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout>
                <GoogleAnalytics trackingId="G-815TJX7480" />
                <AdSense pId='2235454136284515'/>
                <Component {...pageProps} />
            </Layout>
            <div id="modal-root"></div>
        </AuthProvider>
    );
}

export default App;
