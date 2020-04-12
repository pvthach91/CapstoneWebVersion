import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user.model";
import {UserSearchCriteria} from "../../model/user-search-criteria.model";
import {AdminService} from "../../services/admin.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {configuration} from "../../model/configuration.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users:Array<User> = new Array<User>();
  criteria: UserSearchCriteria;

  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private adminService: AdminService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (!this.tokenStorage.hasAdminRole()) {
      window.location.href = 'management/403';
    }
    this.currentPage = 0;
    this.form.role = 0;
    this.form.isActive = null;
    this.form.sort = 1;
    this.search(1);
  }

  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    this.criteria = new UserSearchCriteria(
        null,
        null,
        null,
        1,
        page,
        configuration.pageSize
    );
    // this.spinnerService.show();
    this.adminService.getUsers(this.criteria).subscribe(
        data => {
          this.users = data.data;
          this.currentPage = data.current;
          this.totalPage = data.total;
          this.makePages();
          // this.spinnerService.hide();
        },
        error => {
          console.log(error);
          // alert(JSON.stringify(error));
          // this.spinnerService.hide();
        }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.search(page);
  }

}
