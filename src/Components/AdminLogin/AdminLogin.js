import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './AdminLogin.css';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from '../firebase.config/firebase.config';
import { useHistory, useLocation } from 'react-router';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks] = useContext(UserContext);
    const checkRef = useRef();
    const [user, setUser] = useState("admin");
    const history = useHistory();
    const location = useLocation();
    let { pathname } = location;
    if (pathname === "/login?user=admin") {
        pathname = pathname.replace("/login?user=", '');
    }
    const role = pathname;
    useEffect(() => {
        if (role === "admin" && user === "admin") {
            setUser(role);
        }
        else {
            setUser('user');
        }
    }, [])

    const { from } = location.state || { from: { pathname: "/" } };
    const [wrongMessage, setWrongMessage] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let userType = evt.target.name.value;
        const currentUser = user;
        if (currentUser === "user") {
            userType = "user";
            setWrongMessage(false);
        }
        else {
            setWrongMessage(true);
            checkRef.current.value = null;
            return;
        }

        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                const curUser = result.user;
                const { displayName, email, photoURL } = curUser;
                const myUser = {
                    email,
                    displayName,
                    photoURL,
                    userType: userType
                }
                setLoggedInUser(myUser); 
                fetch(`https://guarded-beach-77012.herokuapp.com/user-books?email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        setUserBooks(data);
                    })
                if (role === 'admin' && user === 'user') {
                    history.push('/');
                }
                else if (user === "admin") {
                    history.push('/admin/admin');
                }
                else {
                    history.replace(from);
                }

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div className="p-5">
            <h3 style={{ marginTop: '50px' }} className="text-center mb-4">Login</h3>
            <div className="jumbotron mx-auto rounded shadow bg-light login-field">
                {
                    <form onSubmit={handleSubmit}>
                        Email
                        <br />
                        <input type="text" name="email" id="" />
                        <br />
                        Password
                        <br />
                        <input type="text" name="password" id="" />
                        <button type="submit" className="btn btn-primary w-100 mx-auto" style={{ borderRadius: '30px', marginTop: '20px' }} > Submit</button>
                        <button type="submit" className="btn btn-primary w-100 mx-auto" style={{ borderRadius: '30px', marginTop: '20px' }} > Continue With Google</button>
                    </form>
                }
            </div>
        </div>
    );
};

export default Login;