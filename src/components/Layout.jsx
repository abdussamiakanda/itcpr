import Header from './Header';
import Footer from './Footer';
import '../assets/css/root.css';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;

