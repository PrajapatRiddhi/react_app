import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
// import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </Layout>
  );
}

export default App;
