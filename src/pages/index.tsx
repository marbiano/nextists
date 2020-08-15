import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { Person } from '../lib/types';
import { fetchAllPeople } from '../lib/api';
import Layout from '../components/Layout';

interface PageProps {
  people: Person[];
}

const IndexPage: React.FC<PageProps> = ({ people }) => {
  return (
    <Layout>
      <ul className="divide-y divide-gray-400 w-2/5">
        {people.map(({ id, fields }) => (
          <li key={id} className="leading-10 hover:bg-gray-100 pl-4">
            <Link href={`/people/${fields.handle}`}>
              <a className="hover:text-pink-600 block">{fields.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const people: Person[] = await fetchAllPeople();
  return {
    props: {
      people,
    },
    revalidate: 1,
  };
};

export default IndexPage;
