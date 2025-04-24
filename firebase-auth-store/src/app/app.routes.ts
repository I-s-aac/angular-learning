import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EditComponent } from './pages/edit/edit.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: 'edit',
    component: EditComponent,
    title: 'edit stuff',
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
