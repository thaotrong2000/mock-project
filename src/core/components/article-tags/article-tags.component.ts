import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-article-tags',
  templateUrl: './article-tags.component.html',
  styleUrls: ['./article-tags.component.css'],
})
export class ArticleTagsComponent implements OnInit {
  @Input() nameTag: string = '';
  clickTag: boolean = false;
  @Input() checkTag: BehaviorSubject<any> = new BehaviorSubject(false);
  @Input() tagSelected: BehaviorSubject<string> = new BehaviorSubject('');
  @Output() clickTagChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.checkTag.subscribe((data) => {
      this.clickTag = data;
    });

    this.tagSelected.subscribe((data) => {
      console.log('ban da thay doi ' + data);
    });
  }

  public demoClick(): void {
    this.clickTag = !this.clickTag;
    this.tagSelected.next('');
  }
}
