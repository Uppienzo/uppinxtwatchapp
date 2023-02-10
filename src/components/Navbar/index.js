import {withRouter, Link} from 'react-router-dom'

import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import Hamberger from '../HamberMenu'
import Context from '../../Context'

import {
  NavbarContainer,
  Logo,
  NavOptions,
  Profile,
  Logout,
  ThemeButton,
  HomeButton,
  LogOutContainer,
  Header,
  Buttons,
  Cancel,
  Confirm,
  LogoutSmall,
  Menu,
  CloseButton,
  SidebarContainer,
  SideBar,
  CloseIcon,
  Myself,
  Me,
  Role,
} from './styledComponents'

const Navbar = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Context.Consumer>
      {value => {
        const {isDark, changeTheme, shiftTab} = value

        const WebsiteLogo = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const onChangeTheme = () => {
          changeTheme()
        }
        const onClickLogo = () => {
          shiftTab('HOME')
        }

        return (
          <NavbarContainer isDark={isDark}>
            <Link to="/">
              <HomeButton type="button" onClick={onClickLogo}>
                <Logo src={WebsiteLogo} alt="website logo" />
              </HomeButton>
            </Link>

            <NavOptions>
              <ThemeButton
                onClick={onChangeTheme}
                isDark={isDark}
                data-testid="theme"
              >
                {!isDark && <FaMoon />}
                {isDark && <FiSun />}
              </ThemeButton>
              <Profile
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />

              <Popup
                modal
                trigger={
                  <Menu type="button" isDark={isDark}>
                    <GiHamburgerMenu />
                  </Menu>
                }
              >
                {close => (
                  <SidebarContainer isDark={isDark}>
                    <SideBar>
                      <CloseButton
                        isDark={isDark}
                        type="button"
                        onClick={() => close()}
                      >
                        <CloseIcon />
                      </CloseButton>
                      <Hamberger />
                    </SideBar>
                    <Myself>
                      <Me>S.Upendra</Me>
                      <Role isDark={isDark}>Aspiring Software Developer</Role>
                    </Myself>
                  </SidebarContainer>
                )}
              </Popup>
              <Popup
                modal
                trigger={
                  <div>
                    <Logout type="button" isDark={isDark}>
                      Logout
                    </Logout>
                    <LogoutSmall type="button" isDark={isDark}>
                      <FiLogOut />
                    </LogoutSmall>
                  </div>
                }
              >
                {close => (
                  <>
                    <LogOutContainer isDark={isDark}>
                      <Header isDark={isDark}>
                        Are you sure, you want to logout ?
                      </Header>
                      <Buttons>
                        <Cancel
                          isDark={isDark}
                          type="button"
                          onClick={() => close()}
                        >
                          Cancel
                        </Cancel>
                        <Confirm
                          isDark={isDark}
                          type="button"
                          onClick={onLogout}
                        >
                          Confirm
                        </Confirm>
                      </Buttons>
                    </LogOutContainer>
                  </>
                )}
              </Popup>
            </NavOptions>
          </NavbarContainer>
        )
      }}
    </Context.Consumer>
  )
}

export default withRouter(Navbar)
