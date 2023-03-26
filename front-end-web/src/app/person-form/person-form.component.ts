import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})

export class PersonFormComponent implements OnInit {
  person: any = {};
  action: string = 'Add';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.action = 'Edit';
      this.getPersonDetails(id);
    }
  }

  getPersonDetails(id: any) {
    this.http.get(`https://sua-api.com/pessoas/${id}`).subscribe((data) => {
      this.person = data;
    });
  }

  onSubmit() {
    if (this.person.id) {
      // update person
      this.http
        .put(`https://sua-api.com/pessoas/${this.person.id}`, this.person)
        .subscribe(() => {
          this.router.navigate(['/people']);
        });
    } else {
      // add new person
      this.http
        .post('https://sua-api.com/pessoas', this.person)
        .subscribe(() => {
          this.router.navigate(['/people']);
        });
    }
  }
}
