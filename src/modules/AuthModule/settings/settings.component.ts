import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StoreService } from 'src/core/services/store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  checkClick: number = 1;

  checkLogin: boolean = false;
  // 1 - default: Change Background  2- Check Profile   3 - Security   4-Switch Account  5-LogOut

  modalRef: BsModalRef = new BsModalRef();

  constructor(
    private storeService: StoreService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // Check login:
    this.storeService.getTokenCurrent().subscribe((data) => {
      if (data) {
        this.checkLogin = true;
      } else {
        this.checkLogin = false;
      }
    });

    // get Url Current
    this.storeService.setUrlCurrent(this.router.url);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Thực hiện việc Logout
   * Created by: THAONT119
   * */
  public logOut(): void {
    localStorage.removeItem('token');
    this.storeService.setTokenCurrent(localStorage.getItem('token'));
    this.modalRef.hide();
    this.router.navigate(['/']);
  }
}
