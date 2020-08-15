import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { Person } from '../lib/types';
import { fetchAllPeople } from '../lib/api';

interface PageProps {
  people: Person[];
}

const IndexPage: React.FC<PageProps> = ({ people }) => {
  return (
    <>
      <h1>Nextists</h1>
      <h2>
        Public list of <a href="https://nextjs.org">Next.js</a> developers
        available for hire
      </h2>
      <ul>
        {people.map(({ id, fields }) => (
          <li key={id}>
            <Link href={`/people/${fields.handle}`}>
              <a>{fields.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
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
