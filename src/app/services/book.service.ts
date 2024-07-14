import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBook(id: string): Observable<Book | undefined> {
    return of(this.books.find((book) => book.id === id));
  }

  addBook(book: Book): Observable<void> {
    this.books.push({ ...book, id: this.books.length.toString() });
    return of();
  }

  updateBook(id: string, updatedBook: Book): Observable<void> {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books[index] = { ...updatedBook, id };
    }
    return of();
  }

  deleteBook(id: string): Observable<void> {
    this.books = this.books.filter((book) => book.id !== id);
    return of();
  }
}
