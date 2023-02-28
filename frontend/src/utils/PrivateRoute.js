import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({ children }) {
  const { pathname } = useLocation()

  // check if the user is authenticated
  const { token } = useSelector(state => state.auth)

  // redirect to login page if not authenticated

  return token ? children : <Navigate to={`/login?redirect=${pathname}`} />
  // if (!token) {
  //   return <Navigate to={`/login?redirect=${pathname}`} />
  // }

  // return children
}

export default PrivateRoute