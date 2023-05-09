import Layout from '../components/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import "../styles/globals.css";
import axios from "axios";

interface IProps {
  Component: any;
  pageProps: AppProps;
  userData: { user_id: number; log_date: string };
}



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ThemeProvider>
  )
}
