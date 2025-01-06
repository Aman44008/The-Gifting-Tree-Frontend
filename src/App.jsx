import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/notFound/NotFound";
import PersonalizedPage from "./pages/personalized/PersonalizedPage";
import OccasionsPage from "./pages/occasions/OccasionsPage";
import ProductsPage from "./pages/products/ProductsPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import SingleProductPage from "./pages/products/singleProduct/SingleProductPage";
import Cart from "./pages/cart/Cart";
import Account from "./pages/profile/Account";

function App  () {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <RegisterPage />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/personalized"
            element={
              <Layout>
                <PersonalizedPage />
              </Layout>
            }
          />
          <Route
            path="/occasions"
            element={
              <Layout>
                <OccasionsPage />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <Layout>
                <SingleProductPage />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/account"
            element={
              <Layout>
                <Account />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
