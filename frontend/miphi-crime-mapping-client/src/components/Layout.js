import  "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, isMapPage = false }) => {
  return (
    <div className={`app-container ${isMapPage ? "map-page-for-app-container" : ""}`}>
      <Header />
        <main className="main-content">{children}</main>
      {!isMapPage &&<Footer/>}
    </div>
  );
};

export default Layout;
