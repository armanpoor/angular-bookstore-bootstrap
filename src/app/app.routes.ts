import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/book-list/book-list.component').then(
        (m) => m.BookListComponent
      ),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/add',
    loadComponent: () =>
      import('./admin/add-book/add-book.component').then(
        (m) => m.AddBookComponent
      ),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/edit/:id',
    loadComponent: () =>
      import('./admin/edit-book/edit-book.component').then(
        (m) => m.EditBookComponent
      ),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./user/book-list/book-list.component').then(
        (m) => m.BookListComponent
      ),
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'user/book/:id',
    loadComponent: () =>
      import('./user/book-details/book-details.component').then(
        (m) => m.BookDetailsComponent
      ),
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export const appRoutes = routes;
