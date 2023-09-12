import {Component, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { ColDef, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { AddElementDialogComponent } from './add-element-dialog/add-element-dialog.component';
import { TableActionsComponent } from './table-actions/table-actions.component';

import { Router } from '@angular/router';
import { RefreshTableService } from '../../services/refresh-table.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent{
  deleteElements: boolean = true;
  showOptionsColumn: boolean = true;
  frameworkComponents: any;
  private gridApi!: GridApi<any>
  private apiUrl = 'http://localhost:3000/heroes'; // URL de tu endpoint
  rowDataClicked1 = {};
  gridOptions: any;
  rowData: any[] = [];
 

  public columnDefs: ColDef[] = [
    // Define las columnas aquí, por ejemplo:
    { headerName: 'ID', field: 'id', flex: 1},
    { headerName: 'Superhéroe', field: 'superhero', flex: 1},
    { headerName: 'Editor', field: 'publisher', flex: 1},
    { headerName: 'Alter Ego', field: 'alter_ego', flex: 1},
    { headerName: 'Primera Aparición', field: 'first_appearance', flex: 1},
    { headerName: 'Personajes', field: 'characters', flex: 1},
    { headerName: 'Options', 
      field: 'options', 
      cellRenderer: TableActionsComponent,
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'Click 1'
      },
      flex: 1, 
      hide: this.showOptionsColumn}
    // Puedes agregar más columnas según tus necesidades
  ]


  
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private refreshTableService: RefreshTableService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {

      this.frameworkComponents = {
        buttonRenderer: TableActionsComponent
      }

      this.gridOptions = {
        domLayout: 'autoHeight',
        suppressHorizontalScroll: true,
        // Configuración adicional de ag-Grid aquí
      };

    this.loadData();
  }

  ngOnInit(): void {
    console.log(this.deleteElements);
    this.refreshTableService.actionTriggered.subscribe(() => {
      // Realiza la acción que deseas en TableListComponent
      // console.log('get it');
      this.loadData()
    });
  }

  loadData() {
    this.http.get<any>(this.apiUrl).subscribe((data: any[]) => {
      this.rowData = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddElementDialogComponent, {
      width: '1200px'  // Ajusta este valor según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Diálogo cerrado con resultado: ${result}`);
    });
  }
  deleteElementShow(): void {
    if(this.deleteElements){
      this.gridOptions.columnApi.setColumnVisible('options', true)
      this.deleteElements = !this.deleteElements;
    }
    else{
      this.deleteElements = true;
      this.gridOptions.columnApi.setColumnVisible('options', false)
    }
    // console.log(this.deleteElements);

  }

  onBtnClick1(e:any) {
    this.rowDataClicked1 = e.rowData
  }

  closeModal() {
    // this.dialog.closeAll()
    this.dialog.closeAll();
  }

}