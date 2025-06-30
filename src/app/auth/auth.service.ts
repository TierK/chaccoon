import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; 

interface AuthResponse {
  token: string; // or userID in case you need it
 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  baseApiUrl: string = 'http://localhost:3000/accounts';

  //Method to check if the user is authenticated
  // We use BehaviorSubject to hold the authentication state
  // This allows us to emit the current authentication state and also listen for changes
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken()); 
  // Observable to expose the authentication state
  // This will allow components to subscribe to authentication state changes
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    //Initializing the authentication state based on the presence of a token
    // When the service is created, we check if a token exists in localStorage
    this.isAuthenticatedSubject.next(this.hasToken());
  }
  //Method to check if a token exists in localStorage
  //Method for logging in the user
  // It takes a payload with username and password, sends it to the server, and handles
  login(payload: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseApiUrl}`, payload)
      .pipe(
        tap(response => {
          // If the login is successful, we store the token in localStorage
          localStorage.setItem('authToken', response.token);
          this.isAuthenticatedSubject.next(true); // Update the authentication state
          console.log('User logged in successfully! Token stored.');
        }),
        catchError(this.handleError) // Handle any errors that occur during the HTTP request
      );
  }

  //Method for logging out the user
  // It removes the token from localStorage and updates the authentication state
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']); // Redirect to the login page after logout
    console.log('User logged out.');
  }

  // Method to get the token from localStorage
  // This method retrieves the token from localStorage, which is used for authentication
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  //Method to check if the user is authenticated
  hasToken(): boolean {
    return !!this.getToken();
  }

  //Method to handle errors from HTTP requests
  // This method processes the error response from the server and returns an observable with an error message
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
      if (error.status === 401) {
        errorMessage = 'Invalid username or password.';
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}