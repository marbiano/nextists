import Link from 'next/link';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto mt-24">
      <header className="mb-16">
        <h1 className="text-3xl font-bold text-pink-600">
          <Link href="/">
            <a className="hover:text-black">Nextists</a>
          </Link>
        </h1>
        <h2 className="text-gray-600">
          Public list of <a href="https://nextjs.org">Next.js</a> developers
          available for hire
        </h2>
      </header>
      {children}
    </div>
  );
};

export default Layout;
