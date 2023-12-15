import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { HomeComponent } from './Components/home/home.component';
import { PublicationsSearchComponent } from './Components/publications-search/publications-search.component';
import { CoaInstrumentSearchComponent } from './Components/coa-instrument-search/coa-instrument-search.component';
import { InstrumentValidationSearchComponent } from './Components/instrument-validation-search/instrument-validation-search.component';
import { PythonApiService } from './Services/python-api.service';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DocumentSearchComponent } from './Components/document-search/document-search.component';
import { InstrumentDocumentSearchComponent } from './Components/instrument-document-search/instrument-document-search.component';
import { JsonToExcelService } from './Services/jsonToExcel.service';
import { PopupSearchComponent } from './components/popup-search/popup-search.component';
import { ScreeningPageComponent } from './Components/screening-page/screening-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'Publications',
    component: PublicationsSearchComponent,
  },
  {
    path: 'Instruments',
    component: CoaInstrumentSearchComponent,
  },
  {
    path: 'InstrumentsValidation',
    component: InstrumentValidationSearchComponent,
  },
  {
    path: 'DocumentSearch',
    component: DocumentSearchComponent,
  },
  {
    path: 'InstrumentDocSearch',
    component: InstrumentDocumentSearchComponent,
  },
  {
    path: 'ScreeningPage',
    component: ScreeningPageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationsSearchComponent,
    CoaInstrumentSearchComponent,
    InstrumentValidationSearchComponent,
    DocumentSearchComponent,
    InstrumentDocumentSearchComponent,
    PopupSearchComponent,
    ScreeningPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [PythonApiService, JsonToExcelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
