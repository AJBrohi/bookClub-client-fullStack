import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createContext } from "react";
import MenuBar from "./Components/MenuBar/MenuBar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Orders from "./Components/Orders/Orders";
import Admin from "./Components/Admin/Admin";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import NotFound from "./Components/NotFound/NotFound";
import OrderProceed from "./Components/OrderProceed/OrderProceed";
import CheckOut from "./Components/CheckOut/CheckOut";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import Deals from "./Components/Deals/Deals";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [allUsersBooks, setAllUsersBooks] = useState([]);
  const [userOrders, setUserOrders] = useState({});
  
  return (
    <div className="m-0 p-0">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders, setUserOrders]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MenuBar/>
              <Home/>
            </Route>
            <Route path="/home">
              <MenuBar/>
              <Home/>
            </Route>
            <Route path="/login">
              <MenuBar/>
              <Login/>
            </Route>
            <Route path="/adminLogin">
              <MenuBar/>
              <AdminLogin/>
            </Route>
            <PrivateRoute path="/order/:key">
              <MenuBar/>
              <Orders/>
            </PrivateRoute>
            <PrivateRoute path='/admin/:key'>
              <Admin/>
            </PrivateRoute>
            <Route path='/order-proceed'>
              <MenuBar/>
              <OrderProceed/>
            </Route>
            <Route path='/deals'>
              <MenuBar/>
              <Deals/>
            </Route>
            <Route path="/user-orders">
              <MenuBar/>
              <CheckOut orders={userOrders} />
            </Route>
            <Route path='*/:page'>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
