import React from 'react';
import {Link} from 'react-router-dom';

import styled from 'styled-components';

const NavbarWrapper = styled.div`
  & > * {
    margin-right: 10px;
  }
  padding: 10px;
`;

export interface INavbarProps {

}


export const Navbar: React.FC<INavbarProps> = () => {
    return (
        <NavbarWrapper>
            <Link to="/">Home</Link>
            <Link to="/Auth">Auth</Link>
        </NavbarWrapper>
    );
};

export default Navbar;