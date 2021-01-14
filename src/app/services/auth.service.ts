import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenName = 'inter-city-bus-token';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isUserAdmin$ = new BehaviorSubject<boolean>(false);
  isUserProprietor$ = new BehaviorSubject<boolean>(false);
  jwt = new JwtHelperService();


  constructor() {}

  getToken(): string | null {
    // console.log(localStorage.getItem('token'));
    return localStorage.getItem(this.tokenName);
  }

  getTokenInfo(): any {
    const token = this.getToken();
    if (token) {
      try {
        return this.jwt.decodeToken(token).data;
      } catch (error) {
        return null;
      }
    } else {
      // console.log('token doesnt exist', token);
      return null;
    }
  }

  isUserLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      this.isUserLoggedIn$.next(false);
      return false;
    }
    let tokenData: any;
    try {
      tokenData = this.jwt.decodeToken(token);
    } catch (error) {
      this.isUserLoggedIn$.next(false);
      return false;
    }
    if (tokenData) {
      this.isUserLoggedIn$.next(true);
      return true;
    } else {
      this.isUserLoggedIn$.next(false);
      return false;
    }
  }

  isUserProprietor(): boolean {
    const userData = this.getTokenInfo();
    if (userData && userData.role === 'proprietor') {
      this.isUserProprietor$.next(true);
      return true;
    } else {
      this.isUserProprietor$.next(false);
      return false;
    }
  }


  isUserAdmin(): boolean {
    const userData = this.getTokenInfo();
    if (userData && userData.role === 'admin') {
      this.isUserAdmin$.next(true);
      return true;
    } else {
      this.isUserAdmin$.next(false);
      return false;
    }
  }

  userProprietoryBusName(): string {
    const userData = this.getTokenInfo();
    if ( userData && userData.role === 'proprietor') {
      return userData.busName;
    } else {
      return null;
    }
  }

  userUid(): string | null {
    const data = this.getTokenInfo();
    if (data) {
      return data.uid;
    } else {
      return null;
    }
  }

saveToken(token: string): void {
    if (!this.getToken()) {
      localStorage.setItem(this.tokenName, token);
      // console.log('saved token');
      this.initialUserAuthStatus();
      return;
    }
    // console.log('token existed');
  }

  logout(): void {
    localStorage.removeItem(this.tokenName);
    this.isUserLoggedIn$.next(false);
    this.isUserAdmin$.next(false);
    this.isUserProprietor$.next(false);
  }


  initialUserAuthStatus(): void {
    this.isUserLoggedIn();
    this.isUserProprietor();
    this.isUserAdmin();
  }
}
