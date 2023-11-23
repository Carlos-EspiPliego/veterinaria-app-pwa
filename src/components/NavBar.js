import '@styles/NavBar.scss'
import Logo from '@assets/images/ImagotipoTransparente.svg'

import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

import { Link } from 'react-router-dom';
import { useState } from 'react';

import { logout } from '@features/auth/authSlice'

const NavBar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [activeNavItem, setActiveNavItem] = useState('Citas');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Citas",
    "Clientes",
    "Mascotas",
    "Historial",
  ]
  const onToggleTheme = () => {
    dispatch(toggleTheme()); // Llama a la acción para cambiar el tema
  };

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  const onLogout = () => {
    dispatch(logout());
  }

  return (
    <Navbar isBordered shouldHideOnScroll maxWidth='xl' onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ]
      }}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img src={Logo} alt="PetCare" className="w-12 h-12 me-3" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeNavItem === 'Citas'}>
          <Link color="foreground" to="/Citas" isDisabled={true} onClick={() => handleNavItemClick('Citas')}>
            Citas
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeNavItem === 'Clientes'}>
          <Link color="foreground" to="/Clientes" isDisabled={true} onClick={() => handleNavItemClick('Clientes')}>
            Clientes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeNavItem === 'Mascotas'}>
          <Link color="foreground" to="/Mascotas" isDisabled={true} onClick={() => handleNavItemClick('Mascotas')}>
            Mascotas
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeNavItem === 'Historial'}>
          <Link color="foreground" to="/Historial" isDisabled={true} onClick={() => handleNavItemClick('Historial')}>
            Historial
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
        <NavbarItem className="">
          <Link to={"/"}>
            <Button color="danger" variant="flat" onPress={onLogout}>
              Cerrar Sesión
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              to="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavBar