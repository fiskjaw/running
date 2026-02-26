import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // For testing, we start as a normal user (false). 
  // You will toggle this from the navbar to test admin features.
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  get isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  toggleRole() {
    this.isAdminSubject.next(!this.isAdminSubject.value);
  }
}