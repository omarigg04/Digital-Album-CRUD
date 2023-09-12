import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from 'src/app/heroes/services/heroes.service';
import { Hero, Publisher } from 'src/app/heroes/interfaces/hero.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/heroes/components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RefreshTableService } from 'src/app/heroes/services/refresh-table.service';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css']
})
export class TableActionsComponent implements ICellRendererAngularComp  {
  public cellValue!: string;
  private gridApi!: GridApi;
  rowData: any[] = [];
  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });
  params: any;
  label: string | undefined;
  
  constructor(
    private router: Router,
    private heroesService: HeroesService,
    private refreshTableService: RefreshTableService,
    public dialog: MatDialog,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ){}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.params = params;
    this.label = this.params.label || null;
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }



  // gets called whenever the user gets the cell to refresh
  refresh(params?: any): boolean {
    // set value into cell again
    // this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  buttonClicked() {
    alert(`${this.cellValue} medals won!`);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
 
  onGridReady(params: any) {
    this.gridApi = params.api; // Almacena el objeto GridApi cuando la cuadrícula está lista
  }

  onDeleteHero($event: any) {
    const myID = this.onClick($event)
    console.log(myID);

    // if ( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: myID
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroById( myID)),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigateByUrl('/heroes/table');
        this.refreshTableService.actionTriggered.emit();
      });
      // this.rowData = this.rowData.filter(hero => hero.id !== myID);
      // if (this.gridApi) {
      //   this.gridApi.refreshCells(); // Refresca el grid para aplicar los cambios
      // }
      
      
  }


  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);
      // console.log(this.params.data);
      
      // console.log(this.params.data.id);
      return this.params.data.id;
      
    }
  }

}
