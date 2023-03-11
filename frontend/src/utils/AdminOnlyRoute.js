import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminOnlyRoute({ children }) {

  const { userInfo, token } = useSelector(state => state.auth)

  return token && userInfo.isAdmin ? children : <Navigate to={'/'} />
}

export default AdminOnlyRoute