import  "./Layout.css";
import Header from "./Header";

const Layout = ({ children, isMapPage = false }) => {
  return (
    <div className={`app-container ${isMapPage ? "map-page-for-app-container" : ""}`}>
      <Header />
        <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
