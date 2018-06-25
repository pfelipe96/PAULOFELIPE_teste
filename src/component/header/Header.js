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
                        <Link to="/">Corrida</Link>
                        <Link to="/motorista">Motorista</Link>
                        <Link to="/passageiro">Passageiro</Link>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;
