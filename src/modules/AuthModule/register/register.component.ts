import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StoreService } from 'src/core/services/store.service';
import { LoginService } from 'src/services/LoginService/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef = new BsModalRef();

  @ViewChild('template')
  template!: TemplateRef<any>;

  textAttention: string = '';

  formGroup = this.fb.group({
    userName: this.fb.control('', Validators.required),
    email: this.fb.control('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      Validators.required,
    ]),
    passWord: this.fb.control('', Validators.required),
    confirmPassword: this.fb.control('', Validators.required),
  });

  constructor(
    private storeService: StoreService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    if (this.storeService.getToken()) {
      console.log(
        '%cBạn đã đăng nhập, bạn KHÔNG ĐƯỢC ở mục register!',
        'background: red; color: white'
      );
    } else {
      console.log(
        '%cBạn chưa đăng nhập - bạn ĐƯỢC PHÉP sử dụng ở Register',
        'background: red; color: white'
      );
    }
  }

  ngAfterViewInit(): void {
    (document.querySelector('.mat-typography') as HTMLElement).style.overflowY =
      'auto';
  }

  checkRegister(): void {
    console.log(this.formGroup.value);
    if (this.formGroup.value.passWord == this.formGroup.value.confirmPassword) {
      console.log('khop');
      this.loginService
        .registerUser({
          user: {
            username: this.formGroup.value.userName,
            email: this.formGroup.value.email,
            password: this.formGroup.value.passWord,
          },
        })
        .subscribe(
          (data) => {
            console.log(data);

            this.storeService.setCreateArticleSuccess({
              status: true,
              text: 'Your account has been successfully created',
              type: 'success',
            });

            this.storeService.setTokenCurrent(data.user.token);
            localStorage.setItem('token', data.user.token);

            this.router.navigate(['']);
          },
          (error) => {
            console.log(error);

            if (error.status == 422) {
              if (error.error.errors?.email) {
                this.textAttention = 'Email already exists.';
              }
              if (error.error.errors?.username) {
                this.textAttention = 'Username already exists.';
              }
              this.openModal(this.template);
            }
          }
        );
    } else {
      this.textAttention = 'Passwords do not match';
      this.openModal(this.template);
    }
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
