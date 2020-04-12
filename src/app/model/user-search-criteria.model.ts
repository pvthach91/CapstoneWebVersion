export class UserSearchCriteria {
  username: string;
  isActive: boolean;
  role: number;
  sort: number;
  currentPage: number;
  pageSize: number;

  constructor(username: string, isActive: boolean, role: number, sort: number, currentPage: number, pageSize: number) {
    this.username = username;
    this.isActive = isActive;
    this.role = role;
    this.sort = sort;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
