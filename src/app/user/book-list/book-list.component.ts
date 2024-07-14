import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})

export class BookListComponent implements OnInit {
  books: Book[] = [];
  filter: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  filterBooks(): Book[] {
    return this.books.filter((book) =>
      book.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}
