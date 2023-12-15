import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PythonApiService } from 'src/app/Services/python-api.service';

interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-screening-page',
  templateUrl: './screening-page.component.html',
  styleUrls: ['./screening-page.component.scss'],
})
export class ScreeningPageComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  jsonData: any[] = [];
  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    // Sort and pagination setup
    this.dataSource.sort = new MatSort();

    // Paginator setup
    this.dataSource.paginator = this.paginator;
  }
  constructor(public pythonService: PythonApiService) {}
  // ngOnInit(): void {
  //   this.loadData();
  // }

  loadData() {
    this.pythonService.GetScrapedDataFromDatabase().subscribe((data) => {
      debugger;
      this.jsonData = data;
      this.dataSource = new MatTableDataSource(data);
      this.displayedColumns = Object.keys(data[0]);
    });
  }

  searchTerm = '';
  chips: string[] = [];

  onSearch() {
    if (this.searchTerm.trim() !== '') {
      this.chips.push(this.searchTerm.trim());
      this.pythonService
        .GetDataFromVectorDB(this.chips.join(' ; '))
        .subscribe((data) => {
          debugger;
          this.jsonData = data;
          this.dataSource = new MatTableDataSource(data);
          this.displayedColumns = Object.keys(data[0]);
        });        
      this.searchTerm = '';
    }
  }

  removeChip(index: number) {
    this.chips.splice(index, 1);
  }
}
