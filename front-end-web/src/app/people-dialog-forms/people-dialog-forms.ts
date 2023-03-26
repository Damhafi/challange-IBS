import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHttpResponse } from 'src/types';
import { HttpClient } from '@angular/common/http';

interface IDialogData {
  isEdit: boolean;
  name: string;
  profession: {
    id: number;
    name: string;
  };
  phone?: string;
  email?: string;
}

@Component({
  selector: 'people-dialog-forms',
  templateUrl: './people-dialog-forms.html',
  styleUrls: ['./people-dialog-forms.scss'],
})
export class PeopleDialogForm implements OnInit {
  professions: any;
  isEdit = false;
  title = '';

  constructor(
    public dialogRef: MatDialogRef<PeopleDialogForm>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getAllProfessions();
    this.isEdit = this.data.isEdit;
    this.title = this.isEdit ? 'EDITAR' : 'CADASTRAR';

    if (this.data.profession && this.professions) {
      const profession = this.professions.find((profession: any) => profession.id === this.data.profession.id);
      this.data.profession = profession ? profession.id : null;
    }
  }

  getAllProfessions(): void {
    this.http.get<IHttpResponse>('/api/professions').subscribe((data) => {
      this.professions = data?.payload?.result || [];
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
