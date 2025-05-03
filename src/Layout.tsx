
import { Footer, Header, PageWrapper } from './components'
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <>
      <Header />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
      <Footer />
    </>
  )
}

export default Layout