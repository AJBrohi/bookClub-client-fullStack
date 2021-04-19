import React, { useState } from 'react';
import AddBook from '../AddBook/AddBook';
import './Admin.css';
import ManageBooks from '../ManageBooks/ManageBooks';

const Admin = () => {
    const [adminWork, setAdminWork] = useState("add-book");
    const [add_book, setAddBook] = useState('active');
    const [manage_books, setManageBook] = useState("");
    const [edit_book, setEditBook] = useState("");

    const handleAdminWork = (work) => {
        if (work === "add-book") {
            setAddBook('active');
            setManageBook("");
            setEditBook("");
        }
        else if (work === 'manage-books') {
            setAddBook('');
            setManageBook("active");
            setEditBook("");
        }
        else if (work === 'edit-book') {
            setAddBook('');
            setManageBook("");
            setEditBook("active");
        }
        setAdminWork(work);
    }
    return (
        <div className="row w-100 mx-auto">
            <div style={{ background: "grey" }} className="col-md-3 text-light text-justify mx-auto py-3">
                <div className="w-100 mx-auto">
                    <h4>AJ's Book Club</h4>
                    <br />
                    <p className={`w-100 py-2 text-center hover ${manage_books}`} onClick={() => handleAdminWork("manage-books")}> 
                        Manage Books</p>
                    <p className={`w-100 py-2 text-center hover ${add_book}`} onClick={() => handleAdminWork("add-book")}>Add Book</p>
                    <p>Edit Book</p>
                </div>
            </div>
            <div className="col-md-9 p-0 m-0">
                {
                    adminWork === 'add-book'
                        ? <AddBook />
                        : <ManageBooks />
                }
            </div>
        </div>
    );
};

export default Admin;