import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'
import BookShelf from './BookShelf'
class BookList extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }


  shelfBooks =(shelf)=>{
    var books
      books = this.props.myBooks.filter((book) => (book.shelf === shelf))
     return books

  }
  render(){
    const myBooks = this.props.myBooks
    const readBook = this.shelfBooks('read')
    const currentlyReadBook = this.shelfBooks('currentlyReading')
    const wantToRead = this.shelfBooks('wantToRead')
    return (
      <div className="app">

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                 <BookShelf  allBooks={readBook}     title="Read" onShelfChange={this.props.onChange}/>
                 <BookShelf allBooks={currentlyReadBook}  title="Currently Reading" onShelfChange={this.props.onChange}/>
                 <BookShelf allBooks={wantToRead} title="Want To Read" onShelfChange={this.props.onChange}/>
            <div className="open-search">
              <Link to='/search' >Add a book</Link>
            </div>
          </div>

      </div></div></div>


    )
  }
}
export default BookList
