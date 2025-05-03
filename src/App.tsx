
// Start: Import necessary dependencies

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { Contact, Home, LoginPage, RegisterPage } from "./pages/nonProtectedIndex";
import { PageProtector } from "./components";
import { ChatsPage } from "./pages/protectedIndex";



const App = () => {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

          // Non-Protected page
            <Route index path="" element={<Home />} />
            <Route index path="/contact" element={<Contact />} />
            <Route index path="/login" element={<LoginPage />} />
            <Route index path="/register" element={<RegisterPage />} />

            // Protected page
            <Route index path="/chats" element={<PageProtector><ChatsPage /></PageProtector>} />


          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App