import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'

import SearchBar from './SearchBar'
import BookShelf from './BookShelf'

const AddButton = (props) => (
    <div className="open-search">
      <Link to='/search'>Add a book</Link>
    </div>
)

class App extends React.Component {
  state = {
    currentlyReading : [],
    wantToRead : [],
    read : []

  }

  getAndFilterAllBooks = () =>{
    BooksAPI.getAll().then((books)=> {
      const currentlyReading = books.filter(book=>(book.shelf === "currentlyReading"));
      const wantToRead = books.filter(book=>(book.shelf === "wantToRead"));
      const read = books.filter(book=>(book.shelf === "read"));
      return(
          this.setState({
            currentlyReading : currentlyReading,
            wantToRead : wantToRead,
            read : read
          })
      )
    });
  }

    componentWillReceiveProps(props) {
        console.log('props: ', props);
    }

  componentDidMount() {
    this.getAndFilterAllBooks();
  }

 handleBookShelf = (book, shelf) => {
   BooksAPI.update(book,shelf).then(()=>{
     this.getAndFilterAllBooks();
   })
 }

  render() {
    console.log(this.state)
    return (
      <div className="app">
         <Route exact path='/' key='/' render={() => (
         <div className="list-books">
            <div className="list-books-title">
                  <h1>MyReads</h1>
            </div>
            <BookShelf
              headingTitle="Currently Reading"
              bookList={this.state.currentlyReading}
              handleChange={this.handleBookShelf}
            />
            <BookShelf
              headingTitle="Want To Read"
              bookList={this.state.wantToRead}
              handleChange={this.handleBookShelf}
            />
            <BookShelf
              headingTitle="Read"
              bookList={this.state.read}
              handleChange={this.handleBookShelf}
            />
          </div>
         )}/>
         <Route path='/search' render={()=>(
            <SearchBar
                parentRefresh={this.getAndFilterAllBooks}
            />)}
         />
         <AddButton/>
      </div>
    )
  }
}

export default App
