import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {changeTemplates, setTemplates} from '../list-container/listContainer.actions';
import {HttpService} from '../../httpService/http-service.service';
import {ids} from './inputIds';

interface List {
  data: [];
}

@Component({
  selector: 'app-template',
  template: `<div appSelect (clickOutside)="panelShow = false" (event)="handleSelectInput($event)" (showPanel)="handleShowPanel($event)">
    <div *ngIf="panelShow" class="panel">
      <div class="input-wrapper">
        <label>Set element size</label>
        <input appSelect (keyup)="changeInput($event)" type="number" [value]="inputSize" [id]="ids.INPUT_SIZE">
      </div>
      <div class="input-wrapper">
        <label>Set element size</label>
        <input appSelect (keyup)="changeInput($event)" type="text" [value]="inputText" [id]="ids.INPUT_TEXT">
      </div>
       <button id="submit" (click)="handleSave()">Save</button>

    </div>
    <div class="template-wrapper" #template [innerHtml]="safeHtml"></div>
  </div>`,
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  public data;
  public ids = ids;
  public template;
  public list;
  public id;
  public inputSize;
  public inputText;
  public panelShow;
  public target;
  safeHtml: SafeHtml;
  @ViewChild('template') templateRef: ElementRef;
  constructor(
    private store: Store<{list: List}>,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.route.params.subscribe(({id}) => this.id = id);
    store.pipe(select(state => state.list.data))
      .subscribe(data => {
        this.data = data;
        this.template = data.find(({id}) => id === +this.id);
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.template ? this.template.template : '...loading');
      });
  }

  ngOnInit(): void {
    if (!this.data.length) {
      this.httpService.get('/templates').subscribe(data => {
        this.store.dispatch(setTemplates({data}));
      });
    }
  }

  changeInput({target}) {
    switch (target.id) {
      case this.ids.INPUT_SIZE: return this.inputSize = target.value;
      case this.ids.INPUT_TEXT: return this.inputText = target.value;
    }
  }
  handleSelectInput(target) {
    this.target = target;
    this.inputSize = getComputedStyle(target, null)
      .getPropertyValue('font-size')
      .replace('px', '');
    this.inputText = target.innerText;
  }

  handleSave() {
    const date = new Date();
    const modifiedTemplate = {template: this.templateRef.nativeElement.innerHTML, modified: date.getTime(), id: this.id};
    this.store.dispatch(changeTemplates(modifiedTemplate));
    this.httpService.post(`/template/${this.id}`, {...this.template, ...modifiedTemplate}).subscribe(data => {
      this.store.dispatch(changeTemplates(modifiedTemplate));
    });
  }

  handleShowPanel(show) {
    this.panelShow = show;
  }

}
