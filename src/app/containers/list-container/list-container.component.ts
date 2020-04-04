import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../httpService/http-service.service';
import {select, Store} from '@ngrx/store';
import {setTemplates} from './listContainer.actions';

interface List {
  data: [];
}

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {
  public data;
  constructor(private httpService: HttpService, private store: Store<{list: List}>) {
    store.pipe(select(state => state.list.data)).subscribe(data => this.data = data);
  }

  ngOnInit(): void {
    if (!this.data.length) {
      this.httpService.get('/templates').subscribe((data: List)  => this.store.dispatch(setTemplates({data})));
    }
  }


}
