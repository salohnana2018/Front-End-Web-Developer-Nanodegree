import React,{Componenet} from 'react'
import {PropTypes} from 'prop-types'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component{
  static propTypes ={
     book:PropTypes.object.isRequired,
     onShelfChange:PropTypes.func.isRequired,
     books :PropTypes.array.isRequired

  }
render(){

  const book = this.props.book
  return(
    <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
        <ShelfChanger  book ={this.props.book} shelf ={this.props.shelf} books ={this.props.books} onUpdate ={this.props.onShelfChange} />
    </div>

    <div className="book-title">{book.title}</div>
    <div className="book-authors" >{book.authors}</div>
    </div>
  </li>
)
}
}
export default Book
