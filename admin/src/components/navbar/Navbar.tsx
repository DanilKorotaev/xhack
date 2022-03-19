import React from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarWrapper = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  
  & > * {
    margin-bottom: 23px;
  }
`;

export interface INavbarItem {
  to: string;
  title: string;
  exact?: boolean;
}

export interface INavbarProps {
  items: INavbarItem[];
}

const NAVBAR_ITEM_ACTIVE_CLASSNAME = 'active';
const NavbarItem = styled(NavLink).attrs({ activeClassName: NAVBAR_ITEM_ACTIVE_CLASSNAME })`
  color: #828282;
  font-family: Roboto, sans-serif;
  font-size: 24px;
  text-decoration: none;
  font-weight: 300;

  &.${NAVBAR_ITEM_ACTIVE_CLASSNAME} {
    color: #ffffff;
  }

  &:hover {
    color: #ffffff;
  }
`;

export const Navbar: React.FC<INavbarProps> = ({ items }) => {
  return (
    <NavbarWrapper>
      {items.map((item) => (
        <NavbarItem exact={item.exact} to={item.to}>
          {item.title}
        </NavbarItem>
      ))}
    </NavbarWrapper>
  );
};

export default Navbar;
