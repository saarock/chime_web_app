
import { Footer, Header, PageWrapContainer } from './components'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {  
  return (
    <>
      <Header />
      <PageWrapContainer>
        <ToastContainer position='top-left' />
        <Outlet />
      </PageWrapContainer>
      <Footer />
    </>
  )
}

export default Layout