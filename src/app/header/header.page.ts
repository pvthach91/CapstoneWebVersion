import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.href = 'home';
  }

}
