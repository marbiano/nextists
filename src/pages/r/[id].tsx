import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';

interface PageProps {
  resource: {
    id: string;
  };
}

const ResourcePage: React.FC<PageProps> = ({ resource }) => {
  const router = useRouter();
  const { isFallback } = router;

  if (isFallback) {
    return <div>Loading...</div>;
  }

  if (!resource) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <div>Resource ID: {resource.id}</div>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  return {
    props: {
      resource: { id },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'foo' } }, { params: { id: 'bar' } }],
    fallback: true,
  };
};

export default ResourcePage;
