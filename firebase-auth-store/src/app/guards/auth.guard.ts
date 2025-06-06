import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkUserAuth().pipe(
    map((user) => !!user),
    tap((bool) => {
      if (!bool) {
        router.navigate(['/']);
      }
    })
  );
};
