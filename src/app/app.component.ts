import { Component, OnInit } from '@angular/core';
import Row from 'src/models/Row';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlotBookingServiceService } from './plot-booking-service.service';
import Customer from 'src/models/Customer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder, private plotBookingService: PlotBookingServiceService,
              private notification: NzNotificationService) {}
  title = 'PlotBooking';
  rows: Row[] = [];
  isVisible: boolean;
  modalTitle;
  sites: boolean[] = [];
  owner: Customer = new Customer();

  plot: number;

  validateForm!: FormGroup;

  ngOnInit(): void {

    for (let i = 0; i <= 48; i++) {this.sites.push(false); }

    this.plotBookingService.getPeople().subscribe((data) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i  = 0; i < data.length; i++) {
        this.sites[data[i].id] = true;
      }
    });

    console.log(this.sites);
    for (let i = 0; i < 8; i++) {
      const row = new Row(i);
      this.rows.push(row);
    }
    this.isVisible = false;

    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      phoneNumberPrefix: ['+91'],
      phoneNumber: [null, [Validators.required]]
    });
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }

  showModal(plotNumber): void {
    this.plot = plotNumber;
    this.isVisible = true;
    this.modalTitle = 'Book plot number : ' + plotNumber;
    this.getOwnersDetails(plotNumber);
  }

  handleOk(): void {
    console.log('Button ok clicked!', this.isVisible);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.controls);
    let allCorrect = true;
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i].status === 'INVALID') {
          allCorrect = false;
      }
    }
    if (allCorrect) {
      const customer: Customer = new Customer();
      // tslint:disable-next-line: forin
      for (const i in this.validateForm.controls) {
        customer.id = this.plot;
        customer.name = this.validateForm.get('name').value;
        customer.email = this.validateForm.get('email').value;
        customer.phoneNumber = this.validateForm.get('phoneNumber').value;
      }
     
      console.log(customer);
      this.plotBookingService.addPerson(customer).subscribe((data) => {
        data = +data;
        console.log("mera aya data ",data);

        setTimeout(() => {
          if (data >= 1 && data <= 48) {
            this.plotBookingService.getPeople().subscribe((data) => {
              // tslint:disable-next-line: prefer-for-of
              console.log(' data from database ', data);
              // tslint:disable-next-line: prefer-for-of
              for (let i  = 0; i < data.length; i++) {
                this.sites[data[i].id] = true;
              }
              this.createNotification('success');
              this.validateForm.reset();
              this.handleOk();
            });
          } else {
            this.createNotification('error');
          }
        }, 100);
      });

      
    }
  }

  getOwnersDetails(plotNumber) {
    this.plotBookingService.getOwner(plotNumber).subscribe((data: Customer) => {
        this.owner = {...data};
        console.log(this.owner);
    });
  }
}
