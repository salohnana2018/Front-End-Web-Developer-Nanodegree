import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import {Route} from 'react-router-dom'
import BookList from './BookList'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     allBooks :[]

  }
fetchAllBooks = ()=>{
  BooksAPI.getAll().then((books) => {
    this.setState({allBooks: books})
  })
}
  componentDidMount(){
   this.fetchAllBooks()
  }

updateShelf = (book,shelf)=>{
  BooksAPI.update(book,shelf).then(()=>{
    book.shelf = shelf
    this.setState(state =>({
     allBooks:state.allBooks.filter(selectedBook => selectedBook.id !== book.id).concat([book])
    })
  )})

}
  render() {
    return (
    <div>
     <Route exact path = '/' render = {()=>(
       <BookList myBooks = {this.state.allBooks} onChange = {this.updateShelf} />
     )}/>
     <Route exact path="/search" render={({history}) => (<BookSearch onChange={this.updateShelf} myBooks={this.state.allBooks}/>)}/>
    </div>
    )
  }
}

export default BooksApp
