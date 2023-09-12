import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TableListComponent } from './pages/table-list/table-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddElementDialogComponent } from './pages/table-list/add-element-dialog/add-element-dialog.component';
import { TableActionsComponent } from './pages/table-list/table-actions/table-actions.component';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    TableActionsComponent,

    // Pipes
    HeroImagePipe,
     ConfirmDialogComponent,
     TableListComponent,
     AddElementDialogComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    MaterialModule,
    AgGridModule,
  ]
})
export class HeroesModule { }
