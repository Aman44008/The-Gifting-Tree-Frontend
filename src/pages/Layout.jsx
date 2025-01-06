import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from '../components/ThemeProvider';

const Layout = ({ children }) => {
    return (
      <ThemeProvider>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-grow bg-primary100">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  };
  
  export default Layout;