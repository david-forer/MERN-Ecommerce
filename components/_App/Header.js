import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = ( ) => NProgress.start()

function Header() {
  const router = useRouter()
  const user = true

  function isActive(route) {
    return route === router.pathname
  }
    
  return (
    <Menu stackable fluid ui="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1em" }}
            />
            ReactReserve
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon name="cart" size="small" />
            Cart
          </Menu.Item>
        </Link>

        {user && (
          <Link href="/create">
            <Menu.Item header active={isActive('/create')}>
              <Icon name="add square" size="small" />
              Create
            </Menu.Item>
          </Link>
        )}

       
        {user ? (<>
          <Link href="/account">
            <Menu.Item header active={isActive('/account')}>
              <Icon name="user" size="small" />
              Account
            </Menu.Item>
          </Link>

          <Menu.Item header >
            <Icon name="sign out" size="small" />
            Logout
          </Menu.Item>
        </>)
:
        (<>
          <Link href="/login">
              <Menu.Item header active={isActive('/login')}>
              <Icon name="sign in" size="small" />
              Login
            </Menu.Item>
          </Link>
          <Link href="/signup">
              <Menu.Item header active={isActive('/signup')}>
              <Icon name="signup" size="small"  />
              Signup
            </Menu.Item>
          </Link>
        </>)}
      </Container>
    </Menu>
  );
}

export default Header;
