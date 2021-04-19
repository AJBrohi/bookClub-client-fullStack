import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import './ShowBook.css';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const ShowBook = ({ idx, book }) => {
    const [loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks] = useContext(UserContext);

    const history = useHistory();

    const handleAddBook = (keyId) => {
        fetch('https://guarded-beach-77012.herokuapp.com/all-users-books')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllUsersBooks(data);
            })
        history.push(`/order/${keyId}`);
    }

    const { _id, bookName, authorName, bookPrice, imgUrl } = book;

    return (
        <div className="book-card card col-lg-3 col-md-5 col-sm-5 m-2 w-100 justify-content-center">
            <div className="bg-special text-center rounded my-2 py-3">
                <img src={imgUrl} className="book-img img-fluid rounded" alt="" />
            </div>
            <h6>{bookName}</h6>
            <p>{authorName}</p>
            <div className="d-flex justify-content-between py-2 mb-2">
                <h4 className="text-primary font-weight-bold">${bookPrice}</h4>
                <button onClick={() => handleAddBook(_id)} className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    );
};

export default ShowBook;