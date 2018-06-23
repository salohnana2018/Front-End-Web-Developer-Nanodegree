import React,{Component} from 'react'
import Book from './Book'
import {PropTypes} from 'prop-types'
class BookShelf extends React.Component {
  static propTypes ={
     allBooks:PropTypes.array.isRequired,
     onShelfChange:PropTypes.func.isRequired
  }
 render(){

   console.log(this.props.allBooks)
   return (
      <div className="bookshelf">
       <h2 className="bookshelf-title">{this.props.title}</h2>
       <div className="bookshelf-books">
         <ol className="books-grid">
         {this.props.allBooks.map((book, index) => (<Book book={book} key={index} books={this.props.allBooks} onShelfChange={this.props.onShelfChange}/>))}

         </ol>
       </div>
     </div>
   )

 }
}
export default BookShelf
