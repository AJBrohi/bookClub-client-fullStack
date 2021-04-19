import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import './OrderProceed.css';

const OrderProceed = () => {
    const history = useHistory();

    const locationRef = useRef();
    const fromDateRef = useRef();
    const nameRef = useRef();
    const mobileRef = useRef();
    const dateRef = useRef();

    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders, setUserOrders] = useContext(UserContext);
    
    function setUserData() {
        fetch(`https://guarded-beach-77012.herokuapp.com//delete/user-books/email?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setUserBooks([]);
                }
            })

        fetch('https://guarded-beach-77012.herokuapp.com/all-users-books')
            .then(res => res.json())
            .then(data => setAllUsersBooks(data))
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const orders = {
            name: event.target.name.value, location: event.target.location.value, mobile: event.target.mobile.value, userBooks: userBooks, userEmail: loggedInUser.email
        }
        fetch(`https://guarded-beach-77012.herokuapp.com/update-user/orders?email=${loggedInUser.email}`, {
            method: "POST",
            body: JSON.stringify(orders),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                locationRef.current.value = null;
                fromDateRef.current.value = null;
                mobileRef.current.value = null;
                dateRef.current.value = null;
                nameRef.current.value = null;
                if (data._id) {
                    setUserOrders(data);
                }
                setUserData();
                history.replace(`/user-orders?email=${loggedInUser.email}`)
            })
            .catch(err => console.log(err, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, userOrders))
    }
    return (
        <div className="w-100 mx-auto my-3 mb-5">
            <h3 className='font-weight-bold'>Details</h3>
            <div style={{ marginTop: '40px' }} className="p-4 shadow bg-light card order-proceed-from mx-auto justify-content-center align-items-center">
                <form onSubmit={handleSubmit} id="checkOutForm">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input ref={nameRef} type="text" name="name" className='form-control' id="name" placeholder='Please Enter Your Name' required />
                    </div>
                    <div className="from-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input ref={mobileRef} type="tel" name="mobile" id="mobile" className="form-control" placeholder="Please Enter Your Number" required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="location">Location</label>
                        <textarea ref={locationRef} name="location" cols="10" rows="2" className='form-control' id="location" placeholder='Please Enter Your Address' required />
                    </div>
                    <div className="from-group mt-1">
                        <label htmlFor="date">Order Date</label>
                        <input ref={dateRef} type="date" name="date" id="date" className="form-control" placeholder="date" required />
                    </div>
                </form>
                <div className="d-flex justify-content-center my-3">
                    <button type="submit" form="checkOutForm" className="btn btn-success">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default OrderProceed;