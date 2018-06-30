import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

  render() {
      return(
              <div className="list-books-content">
                  <div>
                      <div className="bookshelf">
                          <h2 className="bookshelf-title">{this.props.headingTitle}</h2>
                          <div className="bookshelf-books">
                              <ol className="books-grid">
                                  {
                                    this.props.bookList.map((book, index)=>(
                                        <li key={index}>
                                            <Book
                                                image={(book.imageLinks) ? book.imageLinks.thumbnail : ''}
                                                title={book.title}
                                                authors={(book.authors)? book.authors : []}
                                                shelf={book.shelf}
                                                book={book}
                                                changeShelf={this.props.handleChange}
                                            />
                                        </li>
                                    ))
                                  }
                              </ol>
                          </div>
                      </div>
                  </div>
              </div>
          
      )
  }
}

export default BookShelf