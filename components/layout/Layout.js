import Navbar from "./Navbar";
import { layout } from "@/components/layout/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={layout}>{children}</div>
    </>
  );
};

export default Layout;
