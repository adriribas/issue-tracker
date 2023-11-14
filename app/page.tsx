import Pagination from './components/Pagination';

const Home: React.FC<{ searchParams: { page: string } }> = ({
  searchParams,
}) => {
  if (!searchParams.page) return null;
  return (
    <>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
};

export default Home;
