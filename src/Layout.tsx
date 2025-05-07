
import { Footer, Header, PageWrapper } from './components'
import { Outlet } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

const Layout = () => {
  return (
    <>
      <Header />
      <PageWrapper>
      <ToastContainer />
        <Outlet />
      </PageWrapper>
      <Footer />
    </>
  )
}

export default Layout