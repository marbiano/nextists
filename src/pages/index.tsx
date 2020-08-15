import { GetStaticProps, GetStaticPaths } from 'next';

interface PageProps {}

const IndexPage: React.FC<PageProps> = () => {
  return <h1>Hello, fellow Nextronaut!</h1>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default IndexPage;
