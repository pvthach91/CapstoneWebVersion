import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private route: Router) { }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    this.route.navigate(['/home']);
  }

}
