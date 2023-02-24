import { useSelector, useDispatch } from 'react-redux'
import { removedCredentials } from '../features/authSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'

const Header = () => {

  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(removedCredentials())
  }

  return (
    <header>
      <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect >
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>eShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={'/cart'}>
                <Nav.Link><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )
              :
              <LinkContainer to = { '/login' }>
                <Nav.Link><i className="fa-solid fa-user"></i> Sign In</Nav.Link>
            </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
