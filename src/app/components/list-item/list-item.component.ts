import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() name;
  @Input() date;
  @Input() id;
  public modified;
  constructor() {}

  ngOnInit(): void {
    this.modified = moment(this.date).format('YYYY/MM/DD h:mm:ss');
  }


}
