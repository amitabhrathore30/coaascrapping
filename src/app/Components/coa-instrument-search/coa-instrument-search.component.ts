import { Component, OnInit } from '@angular/core';
import { PythonApiService } from 'src/app/Services/python-api.service';

@Component({
  selector: 'app-coa-instrument-search',
  templateUrl: './coa-instrument-search.component.html',
  styleUrls: ['./coa-instrument-search.component.scss'],
})
export class CoaInstrumentSearchComponent implements OnInit {
  constructor(public pythonService: PythonApiService) {}
  textFilter = '';
  quantityFilter = '';
  indicationsFilter = '';
  coaTypesFilter = '';
  instruments: any = [];
  error: boolean = false;
  loader: boolean = false;
  errorContent = '';
  applyFilters() {
    this.loader = true;
    console.log('Text Filter:', this.textFilter);
    console.log('Quantity Filter:', this.quantityFilter);
    console.log('Indication Filter:', this.indicationsFilter);
    console.log('COa Types Filter:', this.coaTypesFilter);
    debugger;
    var prompt0 = '';
    var prompt = '';
    var prompt1 = '';
    var prompt2 = '';
    var prompt3 = '';
    var prompt4 = '';
    var prompt5 = '';
    prompt0 = 'You are a very helpful clinical/medical domain assistant. ';
    if (this.quantityFilter) {
      prompt1 = 'Give me the top ' + this.quantityFilter;
    } else {
      prompt1 = 'Give me few ';
    }
    if (this.indicationsFilter) {
      prompt2 =
        ' most frequently used, studied and validated COA instrument for ' +
        this.indicationsFilter;
    } else {
      prompt2 =
        'most frequently used, studied and validated COA instrument for any random disease.';
    }
    if (this.coaTypesFilter) {
      prompt3 = '. Limit your search to ' + this.coaTypesFilter;
    }
    prompt4 =
      ". Provide a brief description for each instrument and include instrument name, validation, reference, study in the following json list format: {instruments:[{instrument_name: value, description:value, validation: value, reference: value, study: value }]}." //You should always provide responses in json format only. You are not allowed to give data in plain text except json format. If you don't have results, simply return empty json for example {error:'Not found'}. Don't provide any extra error message.";

    prompt = prompt0 + prompt1 + prompt2 + prompt3 + prompt4; //"What is cricket?"
    console.log(prompt);
    // Call your service to perform the filtering with the selected filters here
    this.pythonService.GetDataByPrompt(prompt).subscribe((data) => {
      debugger;
      this.loader = false;
      this.error = false;
      this.errorContent = '';
      try {
        this.instruments = JSON.parse(data).instruments;
      } catch (e) {
        console.log(e)
        this.error = true;
        this.errorContent = data;
      }
    });
  }
  ngOnInit() {}
}
