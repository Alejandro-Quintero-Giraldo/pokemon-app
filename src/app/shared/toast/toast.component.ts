import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent {

  @Input()
  message: string = '';

  @Input()
  type: string = '';

  constructor() { }

}
