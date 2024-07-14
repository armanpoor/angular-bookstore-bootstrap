import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  addBook(): void {
    this.router.navigate(['/admin/add']);
  }

  editBook(id: string): void {
    this.router.navigate([`/admin/edit/${id}`]);
  }

  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter((book) => book.id !== id);
      });
    }
  }
}
