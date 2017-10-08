import React from 'react'
import './App.css'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }
  changeShelf = ({ book, shelf }) => {
    BooksAPI.update(book, shelf).then((b) => {
      BooksAPI.get(book.id).then((updatedBook) => {
        // Update state based on previous state
        this.setState((state) => {
          state.books = state.books
            .filter((cb) => cb.id !== book.id)
            .concat(updatedBook)
        })
      })
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Currently Reading" books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                  changeShelf={this.changeShelf}/>
                <Bookshelf title="Want to Read" books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                  changeShelf={this.changeShelf}/>
                <Bookshelf title="Read" books={this.state.books.filter((book) => book.shelf === "read")}
                  changeShelf={this.changeShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      )}/>
      </div>
    )
  }
}

export default BooksApp
