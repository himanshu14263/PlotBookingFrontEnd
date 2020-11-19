import { Component, OnInit } from '@angular/core';
import Sites from '../models/Sites';
import Row from 'src/models/Row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PlotBooking';
  rows: Row[] = [];
  isVisible: boolean;
  modalTitle;

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      const row = new Row(i);
      this.rows.push(row);
    }
    this.isVisible = false;
  }

  showModal(plotNumber): void {
    this.isVisible = true;
    this.modalTitle = 'Book plot number : ' + plotNumber;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
