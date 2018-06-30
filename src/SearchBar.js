import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'

class SearchBar extends React.Component {

    state = {
       query : '',
       books: [],
       allBooks: []
    }

    assignShelfToBooks = (books) => {

        let allBooksObject =  this.state.allBooks.reduce((obj, item) => {
            obj[item.id] = item
            return obj
        }, {});

        books = books.map((book)=>{
            if(allBooksObject[book.id])
            {
              book = allBooksObject[book.id]
            }
            return book
        });
        return books
    }

    componentDidMount() {
        BooksAPI.getAll().then((allBooks)=> {
            return(
                this.setState({allBooks})
            )
        });
    }

    filterBookList = (event) => {
        const newQuery = event.target.value;
        this.setState({query : newQuery});
        if(newQuery.length > 0) {
            BooksAPI.search(newQuery).then((books)=>{
               if (books.length > 0) {
                   books = this.assignShelfToBooks(books);
                   this.setState({books : books})
               }
                else {
                   this.setState({books : []})
               }
            });
        }
        else {
            this.setState({query: '', books: []})
        }
    }

    handleBookShelf = (book, shelf) => {
        BooksAPI.update(book,shelf).then(()=>{
            BooksAPI.getAll().then((allBooks)=> {
                this.setState({allBooks});
                const books = this.assignShelfToBooks(this.state.books);
                this.setState({books : books})
                this.props.parentRefresh();
            });
        })
    }

    render() {
        const {books, query} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                    >
                        Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                         NOTES: The search from BooksAPI is limited to a particular set of search terms.
                         You can find these search terms here:
                         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                         you don't find a specific author or title. Every search is limited by search terms.
                         */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.filterBookList}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                        {
                            (
                                query.length !== 0 && books.length === 0 &&
                                <div> <h3>No Results Found </h3></div>
                            )
                        }
                        <BookShelf
                        headingTitle=""
                        bookList={this.state.books}
                        handleChange={this.handleBookShelf}
                        />
                </div>
            </div>
        )
    }
}

export default SearchBar