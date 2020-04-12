import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const FULLNAME_KEY = 'AuthFullName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveFullName(username: string) {
    window.sessionStorage.removeItem(FULLNAME_KEY);
    window.sessionStorage.setItem(FULLNAME_KEY, username);
  }

  public getFullName(): string {
    return sessionStorage.getItem(FULLNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public hasFarmerRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_FARMER') {
        result = true;
      }
    });
    return result;
  }

  public hasAdminRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_ADMIN') {
        result = true;
      }
    });
    return result;
  }

  public hasPMRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_PM') {
        result = true;
      }
    });
    return result;
  }

  public hasBuyerRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_BUYER') {
        result = true;
      }
    });
    return result;
  }

  public isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  public getDefaultPage(): string {
    if (this.hasAdminRole()) {
      return 'my-account/user';
    } else if (this.hasBuyerRole()) {
      return 'home';
    }if (this.hasFarmerRole()) {
      return 'my-account/my-store';
    }else if (this.hasPMRole()) {
      return 'my-account/order';
    }
  }
}
