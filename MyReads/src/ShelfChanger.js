import React,{Componenet} from 'react'
import {PropTypes} from 'prop-types'


class ShelfChanger extends React.Component{
  static propTypes ={
     book:PropTypes.object.isRequired,
     onUpdate:PropTypes.func.isRequired,
     books:PropTypes.array.isRequired

  }
  render(){
    const books = this.props.books
    const book = this.props.book
    let shelf
    let selectedBook 
    for(selectedBook of books){
      if(selectedBook.id === book.id){
        shelf = book.shelf
      }
    }
    return (
      <div className="book-shelf-changer">
      <select  value = {shelf} onChange = {(event)=>{
        this.props.onUpdate(this.props.book,event.target.value)

      }}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
      </div>



    )
  }
}
export default ShelfChanger
