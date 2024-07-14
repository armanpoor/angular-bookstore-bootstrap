import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddBookComponent {
  addBookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.addBookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      summary: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addBookForm.valid) {
      this.bookService.addBook(this.addBookForm.value).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
