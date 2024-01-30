import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() data: any = [];
  @Input() modal: string = '';
  @Input() modalTarget: any;
  @Output() updateForm = new EventEmitter();

  onUpdate(event: Event, option: any) {
    event.stopPropagation();
    this.updateForm.emit(option);
    this.openModal();
  }

  // Open the modal programmatically
  openModal() {
    $(this.modalTarget).modal('show');
  }
}
