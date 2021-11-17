import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/core/services/store.service';
import { AuthService } from 'src/services/AuthService/auth.service';
import { LoginService } from 'src/services/LoginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup = this.fb.group({
    userName: this.fb.control('', Validators.required),
    passWord: this.fb.control('', Validators.required),
  });

  loginFail: boolean = false;

  constructor(
    private authService: AuthService,
    private storeService: StoreService,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginService.setCheckRouterLogin(true);
    this.storeService.setUrlCurrent(this.router.url);
  }

  public checkSubmit(): void {
    this.authService
      .getToken({
        user: {
          email: this.formGroup.value.userName,
          password: this.formGroup.value.passWord,
        },
      })
      .subscribe(
        (data) => {
          localStorage.setItem('token', data.user.token);
          this.storeService.setTokenCurrent(localStorage.getItem('token'));
          if (localStorage.getItem('token')) {
            this.storeService.setCreateArticleSuccess({
              status: true,
              text: 'Login successful',
              type: 'success',
            });
            this.router.navigate(['']);
          }
          this.storeService.setToken(data.user.token);
        },
        (err) => {
          this.loginFail = true;
        }
      );
  }
}
