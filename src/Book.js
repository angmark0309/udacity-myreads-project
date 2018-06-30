import React from 'react'

class Book extends React.Component {

    handleChange = (event) => {
        event.preventDefault();
        const book = this.props.book;
        const shelf = event.target.value;
        this.props.changeShelf(book, shelf);
    }

    render() {
        const divCoverStyle ={
            width: 128,
            height: 193,
            backgroundImage : `url(${this.props.image})`
        }
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={divCoverStyle}></div>
                    <div className="book-shelf-changer">
                        <select value={(this.props.shelf) ? this.props.shelf : "none"} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                {
                    this.props.authors.map((author, index)=>(
                        <div  key={index} className="book-authors">{author}</div>
                    ))
                }
            </div>
        )
    }
}

export default Book