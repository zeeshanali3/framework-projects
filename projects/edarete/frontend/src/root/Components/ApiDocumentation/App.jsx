import Layout from './components/Layout/Layout';
import Request from './components/Workspace/Request/RequestPanel';
import LoadingOverlay from '../Loading/LoadingOverLay';
import { useSelector } from 'react-redux';

const App = () => {
   const mainData = useSelector((state) => state.main);
  const { isLoading } = mainData;
  return (
    <>
      <Layout>
        <LoadingOverlay isLoading ={isLoading} />
        <Request />
      </Layout>
    </>
  );
};

export default App;
 