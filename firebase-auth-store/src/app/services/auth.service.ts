import {
  EnvironmentInjector,
  Injectable,
  inject,
  runInInjectionContext,
} from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  user,
} from '@angular/fire/auth';
import { Observable, catchError, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private injector = inject(EnvironmentInjector);
  currentUser$: Observable<any>;

  constructor() {
    this.currentUser$ = user(this.auth);
  }

  login(email: any, password: any) {
    return runInInjectionContext(this.injector, () => {
      this.currentUser$ = from(
        signInWithEmailAndPassword(this.auth, email, password)
      ).pipe(
        catchError((err) => {
          console.error(err);
          return err;
        })
      );
      return this.currentUser$;
    });
  }

  signUp(email: any, password: any) {
    return runInInjectionContext(this.injector, () => {
      this.currentUser$ = from(
        createUserWithEmailAndPassword(this.auth, email, password)
      ).pipe(
        catchError((err) => {
          console.error(err);
          return err;
        })
      );

      return this.currentUser$;
    });
  }

  signOut() {
    this.auth.signOut();
  }

  checkUserAuth(): Observable<User | null> {
    return authState(this.auth)
  }
}
