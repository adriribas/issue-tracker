import Pagination from './components/Pagination';

const Home: React.FC = () => {
  return (
    <>
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
    </>
  );
};

export default Home;
