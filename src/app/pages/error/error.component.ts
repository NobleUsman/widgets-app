import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: HttpErrorResponse;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getErrorMessage();
  }

  getErrorMessage() {
    this.errorMessage = this.apiService.error;
  }
}
