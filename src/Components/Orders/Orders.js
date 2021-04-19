import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Orders.css';

const Orders = () => {
    const { key } = useParams();
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks] = useContext(UserContext);
    const { email } = loggedInUser;
    function setUserData() {
        fetch(`https://guarded-beach-77012.herokuapp.com/user-books?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setUserBooks(data);
            })

        fetch('https://guarded-beach-77012.herokuapp.com/all-users-books')
            .then(res => res.json())
            .then(data => setAllUsersBooks(data))
    }

    useEffect(() => {
        if (key === "all-books") {
            setUserData();
        }
        else {
            console.log(key);
            const userBook = books.find(book => book._id === key);
            console.log(userBook);
            const newUserBook = {
                key: key,
                bookName: userBook.bookName,
                authorName: userBook.authorName,
                bookPrice: userBook.bookPrice,
                imgUrl: userBook.imgUrl,
                quantity: 1,
                userEmail: loggedInUser.email
            }
            const userBookForId = allUsersBooks.find(allUsersBook => allUsersBook.key === key && allUsersBook.userEmail === loggedInUser.email)
            let _id;
            if (!userBookForId) {
                fetch(`https://guarded-beach-77012.herokuapp.com/user/add-book`, {
                    method: "POST",
                    body: JSON.stringify(newUserBook),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            setUserData();
                        }
                    })
                    .catch(err => console.log(err, setLoggedInUser, books, setBooks))
            }
            else {
                _id = userBookForId._id;
                fetch(`https://guarded-beach-77012.herokuapp.com/user-book/update-from-book-card/${_id}?email=${email}`, {
                    method: "POST",
                    body: JSON.stringify(newUserBook),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            setUserData();
                        }

                    })
                    .catch(err => console.log(err, setLoggedInUser, books, setBooks))
            }
        }
    }, [])
    const total = userBooks.reduce((total, book) => total + book.quantity * book.bookPrice, 0);
    return (
        <div className="container py-5">
            <h2>Checkout</h2>
            <div className="scrolling w-100 mx-auto my-3 card table-responsive">
                <div className="table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="3" className="text-muted">Book Name</th>
                                <th scope="col" className="text-center text-muted">Quantity</th>
                                <th scope="col" className="text-center text-muted">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userBooks && userBooks.map(userBook => <tr key={userBook._id}>
                                    <td colSpan="3">{userBook.bookName}</td>
                                    <td className='text-center d-flex justify-content-center'><span className="mx-1" id={userBook._id}>{userBook.quantity}</span> </td>
                                    <td className='text-center'>$ <span id={userBook._id + "-price"}>{userBook.bookPrice * userBook.quantity}</span></td>
                                </tr>)
                            }
                            <tr>
                                <td colSpan="4" className="font-weight-bold">Total</td>
                                <td className="font-weight-bold text-center">$ <span id="total">{total}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex">
                <Link to="/order-proceed" className="btn btn-primary ml-auto">PLACE ORDER</Link>
            </div>
        </div>
    );
};

export default Orders;