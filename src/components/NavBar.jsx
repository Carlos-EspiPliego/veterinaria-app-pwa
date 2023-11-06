import '@styles/NavBar.scss'
import Logo from '@assets/images/ImagotipoTransparente.svg'

import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const NavBar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const onToggleTheme = () => {
    dispatch(toggleTheme()); // Llama a la acción para cambiar el tema
  };

  return (
    <Navbar shouldHideOnScroll maxWidth='xl'>
      <NavbarBrand>
        <img src={Logo} alt="PetCare" className="w-12 h-12 me-3" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" isDisabled="true">
            Acerca de nosotros
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" isDisabled="true">
            Casos de exito
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" isDisabled="true">
            Contacto
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <button className="focus:outline-none" type="button" onClick={onToggleTheme}>
            {theme === "dark" ? (
              <IconSunFilled className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <IconMoonFilled className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Iniciar Sesión</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Registrarme
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar