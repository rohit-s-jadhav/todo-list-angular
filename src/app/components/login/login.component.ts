import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  username!: string;
  password!: string;
  errorMessage = 'Invalid Username or Password!';
  invalidLogin = false;
  sessionId!: string;

  ngOnInit(): void {
  }

  constructor(private loginService: LoginService, private router: Router){}

  handleLogin() {

    // validation 
    if (!this.username && !this.password) {
      this.invalidLogin = true;
      return;
    }

    let user = {'username': this.username, 'password': this.password};

    this.loginService.login(user).subscribe((resp) => {
      this.invalidLogin = false;
      this.sessionId = resp.sessionId;
      sessionStorage.setItem('accessToken', this.sessionId);
      sessionStorage.setItem('user', this.username);
      this.router.navigate(['/todo']);
    }, () => {
      this.invalidLogin = true;
    });
  }

}
