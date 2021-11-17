import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreService } from 'src/core/services/store.service';
import { LoginService } from 'src/services/LoginService/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() checkLogin: boolean = false;
  @Input() newArticle: boolean = false;
  @Output() clickNewArticle: EventEmitter<any> = new EventEmitter();

  checkUrl: string = '';

  user: any;

  constructor(
    private storeService: StoreService,
    private loginService: LoginService
  ) {
    this.loginService.getCurrenUser().subscribe((user) => {
      this.user = user.user;
    });
  }

  ngOnInit(): void {
    this.storeService.getUrlCurrent().subscribe((url) => {
      this.checkUrl = url;
      console.log(this.checkUrl);
    });
  }

  public clickCheckNew(): void {
    this.clickNewArticle.emit(true);
  }
}
