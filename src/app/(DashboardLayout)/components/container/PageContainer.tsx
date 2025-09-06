import Head from 'next/head';
import { Box } from '@mantine/core';


type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <Box>
      {children}
    </Box>
  </>
);

export default PageContainer;
