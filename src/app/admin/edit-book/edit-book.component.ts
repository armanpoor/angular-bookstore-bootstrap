import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editBookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      summary: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe((book) => {
        if (book) {
          this.editBookForm.patchValue(book);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editBookForm.valid && this.bookId) {
      this.bookService
        .updateBook(this.bookId, this.editBookForm.value)
        .subscribe(() => {
          this.router.navigate(['/admin']);
        });
    }
  }
}
