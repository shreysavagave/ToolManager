import { Navigate, useLocation } from "react-router-dom";


function CheckAuth({isAuthenticated, user , children}) {
  const location = useLocation()

 
  if(!isAuthenticated && !(
    location.pathname.includes('/login') || location.pathname.includes('/register')
  )){
    return <Navigate to='/auth/login' />
  }
  
  if(isAuthenticated && (
    location.pathname.includes('/login') || location.pathname.includes('register')
  )){
    if(user?.role === 'admin'){
      return <Navigate to="/dev-eng/Home" />
    }
    else{
      return <Navigate to="/shop/home" />
    }
  }

  if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes('dev-eng')){
    return <Navigate to='/unauth-page' />
  }

  if(isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')){
    return <Navigate to='/dev-eng/Home' />
  }

  
  if(isAuthenticated && user?.role !== 'supervisor' && location.pathname.includes('supervisor')){
    return <Navigate to='/unauth-page' />
  }

  if(isAuthenticated && user?.role === 'supervisor' && location.pathname.includes('shop')){
    return <Navigate to='/supervisor/Home' />
  }

  if(isAuthenticated && user?.role !== 'operator' && location.pathname.includes('operator')){
    return <Navigate to='/unauth-page' />
  }

  if(isAuthenticated && user?.role === 'operator' && location.pathname.includes('shop')){
    return <Navigate to='/operator/Home' />
  }


  return<> {children} </>
}

export default CheckAuth;