import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import { Person } from '../../lib/types';
import { fetchAllPeople, fetchPersonByHandle } from '../../lib/api';
import Layout from '../../components/Layout';

interface PageProps {
  person: Person;
}

const ResourcePage: React.FC<PageProps> = ({ person }) => {
  const router = useRouter();
  const { isFallback } = router;

  if (isFallback) {
    return <div>Loading...</div>;
  }

  if (!person) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const { fields } = person;

  return (
    <Layout>
      <h3 className="text-xl mt-16">{fields.name}</h3>
      <div className="text-l hover:underline">
        <a
          href={`https://twitter.com/${fields.handle}`}
          className="text-blue-500"
        >
          @{fields.handle}
        </a>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle } = params;
  const person = await fetchPersonByHandle(
    Array.isArray(handle) ? handle[0] : handle,
  );

  return {
    props: {
      person,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const people: Person[] = await fetchAllPeople();
  return {
    paths: people.map((person) => ({
      params: { handle: person.fields.handle },
    })),
    fallback: true,
  };
};

export default ResourcePage;
