import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-request',
  templateUrl: './card-request.component.html',
  styleUrls: ['./card-request.component.css']
})
export class CardRequestComponent implements OnInit {

  @Input()
  index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
