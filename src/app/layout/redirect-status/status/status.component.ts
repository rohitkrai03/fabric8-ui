import { Component, Input } from  '@angular/core';
import { RedirectData } from '../../../models/redirect-data';

@Component({
  selector: 'f8-status',
  templateUrl: 'status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent {

  @Input() status: 'success' | 'fail';
  @Input() data: RedirectData;

  constructor() {}
}
