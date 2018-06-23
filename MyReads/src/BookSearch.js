import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import {PropTypes} from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
  state = {
    booksResultList: [],
    query: ''
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired
  }

  handleChange = (event) => {
    var value = event.target.value
    this.setState(() => {
      return {query: value}
    })
    this.searchForBook(value)
  }



  searchForBook = (val) => {
    const MAX_BOOK_PER_PAGE = 20
    if (val.length !== 0) {
      BooksAPI.search(val,MAX_BOOK_PER_PAGE).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books =this.updateBookShelf(books)

          this.setState(() => {
            return {booksResultList: books}
          })

        }
        else {
         this.setState({booksResultList: [], query: ''})
       }
      })
    }
  }
updateBookShelf = (books) =>{
  for(let book of books){
    book.shelf ='none'
  }

  for(let book of books){
    for(let bo of this.props.myBooks){
      if(book.id === bo.id){
        book.shelf = bo.shelf
      }
    }
  }
  return books
}


  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(this.state.query.length > 0 && this.state.booksResultList.length > 0) && this.state.booksResultList.map((book, index) => (<Book book={book} books ={this.state.booksResultList} shelf={book.shelf} key={index}  onShelfChange={this.props.onChange}

            />))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch;
