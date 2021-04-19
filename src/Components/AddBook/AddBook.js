import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../App';

const AddBook = () => {
    const [loggedInUser, setLoggedInUser, books, setBooks] = useContext(UserContext);
    const [addedBook, setAddedBook] = useState({});

    const nameRef = useRef();
    const authorRef = useRef();
    const priceRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const bookName = event.target.bookName.value;
        const authorName = event.target.authorName.value;
        const bookPrice = event.target.bookPrice.value;

        const imgData = new FormData();
        imgData.set("key", "be7ca2067d9bc23c404a850e0f63b13a");
        imgData.append('image', event.target.file.files[0]);

        fetch("https://api.imgbb.com/1/upload", {
            method: 'POST',
            body: imgData,
        })
            .then(res => res.json())
            .then(data => {
                const bookDetails = {
                    bookName,
                    authorName,
                    bookPrice,
                    imgUrl: data.data.display_url
                }
                setAddedBook(bookDetails);
                fetch('https://guarded-beach-77012.herokuapp.com/addBook', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bookDetails)
                })
                    .then(res => res.json())
                    .then(data => {
                        nameRef.current.value = null;
                        authorRef.current.value = null;
                        priceRef.current.value = null;
                        alert("Book Uploaded")

                fetch('https://guarded-beach-77012.herokuapp.com/allBooks')
                    .then(res => res.json())
                    .then(data => console.log("allbooks er data", data))
                })
                .catch(err => console.log(err, loggedInUser, setLoggedInUser, books));
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="mb-5">
            <h4 className="mt-5 ml-2">Add a Book</h4>
            <div className="input-form p-3">
                <form onSubmit={handleSubmit} className="card shadow py-3 px-4" id="useForm">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>Book Name</label>
                            <input ref={nameRef} type="text" className="form-control" placeholder="Enter Name" name="bookName" required />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Author Name</label>
                            <input ref={authorRef} type="text" className="form-control" placeholder="Enter Author" name="authorName" required />
                        </div>
                        <br /><br />
                        <div className="col-md-6 form-group">
                            <label>Add Price</label>
                            <input ref={priceRef} type="text" className="form-control" placeholder="Enter Price" name="bookPrice" required />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Picture of Book</label>
                            <input type="file" name="file" className="d-none" id="upload-file" required /><br />
                            <label className='btn btn-primary  form-control overflow-hidden' id="upload-label" htmlFor="upload-file" style={{ width: 'fit-content' }} title='Upload image'>Upload </label>
                        </div>
                    </div>
                </form>
                <div className='d-flex'>
                    <button className="btn btn-primary my-3 ml-auto px-4" type="submit" form="useForm" >Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddBook;