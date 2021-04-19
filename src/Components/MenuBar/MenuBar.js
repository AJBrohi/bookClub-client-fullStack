import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useHistory } from 'react-router-dom';
import './MenuBar.css';
import { UserContext } from '../../App';

const MenuBar = () => {
    const [loggedInUser, setLoggedInUser, userBooks, setUserBooks, userOrders, setUserOrders] = useContext(UserContext);

    const history = useHistory();
    
    const handleLogout = () => {
        setLoggedInUser({});
        setUserBooks([]);
        setUserOrders({});
        history.push('/');
    }

    return (
        <div className="container">
            <Navbar className='' collapseOnSelect expand="lg" bg="white" variant="light">
                <Navbar.Brand>
                    <Link to='/' style={{ textDecoration: 'none' }}>AJ's Book Club</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/home" className="mr-4 nav-link">Home</Link>
                        <Link to="/order/all-books" className="mr-4 nav-link">Orders</Link>
                        <Link to="/deals" className="mr-4 nav-link">Deals</Link>
                        {
                            loggedInUser.userType !== "user" && <Link to="/admin/admin" className="mr-4 nav-link">Admin</Link>
                        }
                        {
                            loggedInUser.email
                                ? <>
                                    <p className="my-auto">
                                        <img style={{ height: "30px" }} className="rounded-circle ml-2 " src={loggedInUser.photoURL} alt="" />
                                        <small className="ml-1 mr-2 font-weight-bold">{loggedInUser.displayName}</small>
                                    </p>
                                    <span onClick={handleLogout} className="mr-0 nav-link">Logout</span>
                                </>
                                : <Link to="/login" className="mr-0 nav-link">Login</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default MenuBar;