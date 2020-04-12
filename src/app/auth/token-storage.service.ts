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

  public hasUserRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_USER') {
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

  public hasHRRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_HR') {
        result = true;
      }
    });
    return result;
  }

  public hasAccountingRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_ACCOUNTING') {
        result = true;
      }
    });
    return result;
  }

  public hasStockRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_STOCK') {
        result = true;
      }
    });
    return result;
  }

  public hasSaleRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_SALE') {
        result = true;
      }
    });
    return result;
  }

  public hasBODRole(): boolean {
    const roles = this.getAuthorities();
    let result = false;
    roles.forEach(role => {
      if (role == 'ROLE_BOD') {
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

  getCurrentDepartment():string {
    if (this.hasAdminRole()) {
      return 'ADMIN DEPARTMENT';
    } else if (this.hasHRRole()) {
      return 'HR DEPARTMENT';
    }if (this.hasAccountingRole()) {
      return 'ACC DEPARTMENT';
    }if (this.hasStockRole()) {
      return 'STOCK DEPARTMENT';
    }if (this.hasSaleRole()) {
      return 'SALE DEPARTMENT';
    }if (this.hasBODRole()) {
      return 'BOD';
    }
  }

  public getDefaultPage(): string {
    if (this.hasAdminRole()) {
      return 'management/sysadmin';
    } else if (this.hasHRRole()) {
      return 'management/humanresource';
    }if (this.hasAccountingRole()) {
      return 'management/accounting';
    }if (this.hasStockRole()) {
      return 'management/stock';
    }if (this.hasSaleRole()) {
      return 'management/sale';
    }
  }
}
