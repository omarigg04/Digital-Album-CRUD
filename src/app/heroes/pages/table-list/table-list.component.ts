import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  private apiUrl = 'http://localhost:3000/heroes'; // URL de tu endpoint

  gridOptions: any;
  rowData: any[] = [];
  

  public columnDefs: ColDef[] = [
    // Define las columnas aquí, por ejemplo:
    { headerName: 'ID', field: 'id' },
    { headerName: 'Superhéroe', field: 'superhero' },
    { headerName: 'Editor', field: 'publisher' },
    { headerName: 'Alter Ego', field: 'alter_ego' },
    { headerName: 'Primera Aparición', field: 'first_appearance' },
    { headerName: 'Personajes', field: 'characters' },
    // Puedes agregar más columnas según tus necesidades
  ]
  constructor(private http: HttpClient) {
    this.gridOptions = {

      // Configuración adicional de ag-Grid aquí
    };

    this.loadData();
  }

  loadData() {
    this.http.get<any>(this.apiUrl).subscribe((data: any[]) => {
      this.rowData = data;
    });
  }
}


