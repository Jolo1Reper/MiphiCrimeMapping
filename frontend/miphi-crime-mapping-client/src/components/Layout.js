import  "./Layout.css";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
        <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
