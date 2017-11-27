import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = { };
  loggedIn: boolean = false;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    //logout before logging in a user
    this.authenticationService.logout()
  }

  login() {
    this.authenticationService.login(this.model)
                              .subscribe(
                                data => {
                                  console.log("currentUser in logincomponent: ", JSON.parse(localStorage.getItem('currentUser')))
                                  this.alertService.success('Login successfull', true)
                                  this.loggedIn = true;
                                  this.router.navigate(['/'])
                                },
                                error => {
                                  this.alertService.error(error);
                                  this.loggedIn = false;
                                }
                              )
  }



}
