import { Component, Input } from  '@angular/core';

@Component({
  selector: 'f8-status',
  templateUrl: 'status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent {

  @Input() status: string;
  @Input() data: object;

  constructor() {}

}
