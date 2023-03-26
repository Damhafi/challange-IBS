import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ConfirmationDialogComponent } from './dialog-confirm/dialog-confirm';
import { IHttpResponse, IPerson } from 'src/types';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})

export class PersonDetailsComponent implements OnInit {
  person: any;
  showRemoveButton = true;
  showConfirmationModal = false;
  personToRemove: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getPersonDetails(id);
  }

  getPersonDetails(id: any) {
    this.http.get<IHttpResponse>(`/api/persons/${id}`).subscribe((data) => {
      this.person = data.payload.result;
    });
  }

  showModalRemove(person: IPerson) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to remove ${person.name}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.personToRemove = person;
        this.removePerson();
      }
    });
  }

  removePerson() {
    this.http.delete(`/api/persons/${this.personToRemove.id}`).subscribe(() => {
      this.person = null;
      this.showConfirmationModal = false;
      this.location.back();
    });
  }

  hideModal() {
    this.personToRemove = null;
    this.showConfirmationModal = false;
  }

  goBack() {
    this.location.back();
  }
}
