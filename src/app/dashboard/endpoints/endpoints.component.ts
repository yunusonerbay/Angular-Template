import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApplicationsService } from 'src/app/shared/services/applications.service';
interface Person {
  id: string;
  name: string;
  shipment: string;
  department: string;
  employeeCode: string;
  joinDate: string;
  status: string;
}

export class Menu {
  name: string;
  actions: Action[];
}

export class Action {
  actionType: string;
  httpType: string;
  definition: string;
  code: string;
}


@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html'
})
export class EndpointsComponent {
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  people: Person[] = [];
  filteredPeople: Person[] = [];

  constructor(private http: HttpClient, private applicationsService: ApplicationsService) {}

  async ngOnInit(): Promise<void> {

    let data = await this.applicationsService.GetAuthorizeDefinitionEndpoints()
    data.subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (e) => { 
        console.log(e);
      },
    });


    this.http.get<Person[]>('assets/data/features/dynamic-table.json').subscribe(
      (data) => {
        this.people = data;
        this.filteredPeople = data;
      },
      (error) => {
        console.log('Error reading JSON file:', error);
      }
    );
  }


  searchById(): void {
    if (this.value) {
      this.filteredPeople = this.people.filter(
        (person) => person.id === this.value
      );
    } else {
      this.filteredPeople = this.people;
    }
  }

  filterByContact(): void {
    this.filteredPeople = this.applyFilters();
  }

  filterByStatus(): void {
    this.filteredPeople = this.applyFilters();
  }

  private applyFilters(): Person[] {
    return this.people.filter((person) =>
      person.name.toLowerCase().includes(this.contactSearchValue.toLowerCase())
      && (this.statusFilter === 'all' || person.status.toLowerCase() === this.statusFilter.toLowerCase())
    );
  }
}
