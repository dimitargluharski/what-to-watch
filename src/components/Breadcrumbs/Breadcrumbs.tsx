import { Link } from "react-router-dom";

export const Breadcrumbs = () => {
  const pages = [
    { name: 'catalog', href: '/catalog', current: false },
    { name: 'movie details', href: '#', current: true },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex py-4 items-center w-full justify-between mx-auto max-w-7xl px-2 sm:px-4 lg:px-8"
    >
      <div className="flex p-2">
        {pages.map(page => (
          <span className="border">
            <Link to={`${page.href}`} className={`mx-2 ${page.current ? 'text-red-600 cursor-default' : ''}`}>
              {`${page.name}`}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  );
};
