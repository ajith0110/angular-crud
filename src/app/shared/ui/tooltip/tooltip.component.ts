import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements OnInit {
  tooltip = '';
  top = 0;
  left = 0;

  constructor() {}

  ngOnInit(): void {}
}
