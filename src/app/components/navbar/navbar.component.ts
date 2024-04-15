import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public userservice: UserService, 
    public dataService: DataService,
    private router: Router,
  ) {

  }

  logOut() {
    this.userservice.logout()
    .then(() => {
      this.router.navigate(['']);
    })
    .catch(error => console.log(error));
  }

  isAdmin() {
    if (this.dataService.getUserRol() === 'ADMIN') {
      return true
    } else {
      return false
    }
  }

}