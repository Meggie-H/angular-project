import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => updateProfile(response.user, { displayName: username })
      )
    );
  }

  login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        () => {}
      )
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
