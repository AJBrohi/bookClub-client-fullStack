import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Home.css';
import ShowBook from '../ShowBook/ShowBook';
import { UserContext } from '../../App';

const Home = () => {
    const [books, setBooks, allUsersBooks, setAllUsersBooks] = useContext(UserContext);
    const [search, setSearch] = useState("");
    useEffect(()=>{
        fetch(`https://guarded-beach-77012.herokuapp.com/allBooks?search=${search}`)
        .then(res => res.json())
        .then(data => {
            setBooks(data);
        })
        
        fetch('https://guarded-beach-77012.herokuapp.com/all-users-books')
        .then(res => res.json())
        .then(data => setAllUsersBooks(data))
    
      }, []);
      
      const handleSearch =(evt)=>{
        evt.preventDefault();
        setSearch(evt.target.search.value);
    }
    return (
        <div className="container-fluid background-color mb-5">
            <br/>
            <form onSubmit={handleSearch} className="search d-flex mx-auto py-5">
                <input className="form-control search-bar"  type="search" placeholder="Search Book" name="search" id=""/>
                <button type="submit" className="btn btn-primary" >Search</button>
            </form>
            {
                !books.length
                && <div className="d-flex justify-content-center mt-5">
                    <CircularProgress color="secondary"/>
                 </div>
            }
            {
                books.length > 0 && <div className="container-fluid row w-100 mx-auto justify-content-center w-100">
                {
                    books.map((book, idx) => <ShowBook key={idx} idx={idx} book={book}/>)
                }
            </div>
            }
        </div>
    );
};

export default Home;