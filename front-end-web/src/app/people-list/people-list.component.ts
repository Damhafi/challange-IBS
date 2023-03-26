import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpResponse } from '../../types';
import { MatDialog } from '@angular/material/dialog';
import { PeopleDialogForm } from '../people-dialog-forms/people-dialog-forms';

interface IPerson {
  id: number;
  name: string;
  profession: {
    id: number;
    name: string;
  };
  phone?: string;
  email?: string;
}

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  title = 'front-end-web';
  people: IPerson[] = [];
  showConfirmationModal: boolean = false;
  personToRemove: IPerson | null = null;
  data = {
    name: '',
    profession: { id: 0, name: '' },
  };
  professions: { id: number; name: string }[] | undefined;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.getPeople();
  }

  // Modal Create Person
  showModalCreate() {
    const dialogRef = this.dialog.open(PeopleDialogForm, {
      maxWidth: '480px',
      data: {
        isEdit: false,
        name: '',
        profession: '',
        phone: '',
        email: ''
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = result;
        this.createPerson(result);
      }
    });
  }

  createPerson(data: IPerson) {
    this.http.post<IHttpResponse>('/api/persons', {
      name: data.name,
      professionId: data.profession.id,
      phone: data.phone,
      email: data.email
    }).subscribe(() => {
      this.getPeople();
    });
  }


  // Modal Remove Person
  showModalEdit(person: IPerson) {
    const { id, name, profession, phone, email } = person;
    let professionData = null;

    if (profession) {
      professionData = {
        id: profession.id,
        name: profession.name
      };
    }

    const dialogRef = this.dialog.open(PeopleDialogForm, {
      maxWidth: '480px',
      data: {
        isEdit: true,
        id: id,
        name: name,
        profession: professionData,
        phone: phone,
        email: email
      }
    });

    dialogRef.afterOpened().subscribe(() => {
      dialogRef.componentInstance.isEdit = true;
    });

    dialogRef.afterClosed().subscribe((result: IPerson) => {
      if (result) {
        this.data = result;
        this.editPerson(result);
      }
    });
  }
  editPerson(person: IPerson) {
    this.http
      .put<IHttpResponse>(`/api/persons/${person.id}`, {
        name: person.name,
        professionId: person.profession ? person.profession.id : null,
        phone: person.phone,
        email: person.email
      })
      .subscribe(() => {
        this.getPeople();
      });
  }

  getPeople(): void {
    this.http.get<IHttpResponse>('/api/persons').subscribe((data) => {
      console.log(data, '<-= data people');
      this.people = data?.payload?.result;
      this.professions = this.people?.map((p) => p.profession) || [];
    });
  }

  hideModal() {
    this.showConfirmationModal = false;
  }
}
