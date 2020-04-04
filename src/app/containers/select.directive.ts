import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ids} from './template/inputIds';
@Directive({
  selector: '[appSelect]'
})
export class SelectDirective {
  public ids = ids;
  public panel;
  public target;
  public value;
  @ViewChild('panel') panelRef: ElementRef;
  @Output() event: EventEmitter<any> = new EventEmitter();
  @Output() showPanel: EventEmitter<any> = new EventEmitter();
  @HostListener('input', ['$event']) changeDom({target}) {
    const id = target.id;
    switch (id) {
      case this.ids.INPUT_SIZE: {
        this.value = target.value;
        this.target.setAttribute('style', `font-size: ${this.value > 0 ? this.value : 12}px`);
      }
                                break;
      case this.ids.INPUT_TEXT: {
        this.value = target.value;
        this.target.innerText = target.value;
      }
    }
  }
  @HostListener('click', ['$event']) select(event) {
    if (!Object.keys(this.ids).map(id => this.ids[id] === event.target.id).includes(true)) {
      this.showPanel.emit(false);
    }
    document.querySelectorAll('.editable')
      .forEach(node => node.classList.remove('isEditing'));
    if (event.target.className === 'editable') {
      this.showPanel.emit(true);
      this.target = event.target;
      this.event.emit(this.target);
      this.panel = true;
      this.target.classList.add('isEditing');
    }
  }
  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }
  constructor(private elementRef: ElementRef) { }
}
