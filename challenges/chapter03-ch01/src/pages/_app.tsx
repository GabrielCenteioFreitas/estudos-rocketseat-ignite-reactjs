import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '../prismicio'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <PrismicPreview repositoryName={repositoryName} />
    </>
  );
}

export default MyApp;
