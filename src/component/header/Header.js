import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


class Header extends Component {
    render() {
        return (
            <div className="header-content">
                <header>
                    <nav>
                        <Link to="/corrida">Corrida</Link>
                        <Link to="/corrida">Motorista</Link>
                        <Link to="/corrida">Passageiro</Link>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;
