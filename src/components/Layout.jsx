// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const Layout = () => (
 /* outlet function to dynamiclly render components between the header and footer */
  <div>
   <Header/>
        <main>
          <Outlet/>
        </main>
    <Footer/>
  </div>
);

export default Layout;
