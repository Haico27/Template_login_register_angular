import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = { };


  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  register() {
    this.userService.create(this.model)
                    .subscribe(
                      data => {
                        this.alertService.success('Registration successfull', true)
                        this.router.navigate(['/login'])
                      },
                      error => {
                        this.alertService.error(error)
                      })
  }



}
