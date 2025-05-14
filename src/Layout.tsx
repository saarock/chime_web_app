
import { Footer, Header, PageWrapContainer } from './components'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {  
  return (
    <>
      <Header />
      <PageWrapContainer>
        <ToastContainer />
        <Outlet />
      </PageWrapContainer>
      <Footer />
    </>
  )
}

export default Layout