import { Component, Input, OnInit } from '@angular/core';
import { LoaderMessage } from '../../../../src/app/constants/constants';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() loaderMessage = LoaderMessage.fetchData;

  constructor() { }

  ngOnInit(): void {
  }

}
