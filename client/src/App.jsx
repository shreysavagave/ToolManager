import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/Layout';
import AuthLogin from './pages/auth/Login';
import AuthRegister from './pages/auth/Register';
import DevEngLayout from './components/dev-eng/Layout';
import SupervisorLayout from './components/supervisor/Layout';
import OperatorLayout from './components/operator/Layout';
import ShopLayout from './components/shop/Layout';
import ShopHome from './pages/shop/home';
import ShopListing from './pages/shop/listing';
import ShopAccount from './pages/shop/account';
import ShopCheckout from './pages/shop/checkout';
import NotFound from './pages/not-found';
import CheckAuth from './components/common/check-auth';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "@/components/ui/skeleton";
import './index.css';
import DevPage from './pages/admin/DevPage';
import CostCentrePage from './pages/admin/DevCostCentres';
import DevToolsPage from './pages/admin/DevToolPage';
import SupervisorPlantPage from './pages/supervisor/plant';
import SupervisorCostCentrePage from './pages/supervisor/costCentre';
import SupervisorToolsPage from './pages/supervisor/Tool';
import OperatorPlantPage from './pages/operator/Plant';
import OperatorCostCentrePage from './pages/operator/costCentre';
import OperatorToolsPage from './pages/operator/tool';


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="h-[600px] w-[800px] bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">


      <Routes>

      {/* <Route path="/" element={<AuthLogin />} /> */}


        {/* Auth Routes */}
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* DevEng Routes */}
        <Route path="/dev-eng" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <DevEngLayout />
          </CheckAuth>
        }>
          <Route path="Home" element={<DevPage />} />
          <Route path="costcentres" element={<CostCentrePage />} />
          <Route path="tools" element={<DevToolsPage />} />

        </Route>

        {/* Supervisor Routes */}
        <Route path="/supervisor" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <SupervisorLayout />
          </CheckAuth>
        }>
          <Route path="Home" element={<SupervisorPlantPage />} />
          <Route path="costcentres" element={<SupervisorCostCentrePage />} />
          {/* <Route path="tools" element={<SupervisorToolsPage />} /> */}
          <Route path="tools" element={<SupervisorToolsPage />} />
        </Route>

        {/* Operator Routes */}
        <Route path="/operator" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <OperatorLayout />
          </CheckAuth>
        }>
          <Route path="Home" element={<OperatorPlantPage />} />
          <Route path="costcentres" element={<OperatorCostCentrePage />} />
          <Route path="tools" element={<OperatorToolsPage />} />
        </Route>

        {/* Shop Routes */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShopHome />} />
          <Route path="listing" element={<ShopListing />} />
          <Route path="account" element={<ShopAccount />} />
          <Route path="checkout" element={<ShopCheckout />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
