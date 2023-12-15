import { Component, OnInit } from '@angular/core';
import { JsonToExcelService } from 'src/app/Services/jsonToExcel.service';
import { PythonApiService } from 'src/app/Services/python-api.service';

@Component({
  selector: 'app-instrument-document-search',
  templateUrl: './instrument-document-search.component.html',
  styleUrls: ['./instrument-document-search.component.scss'],
})
export class InstrumentDocumentSearchComponent implements OnInit {
  constructor(
    private pythonService: PythonApiService,
    private jsonToExcelService: JsonToExcelService
  ) {}

  textFilter = '';
  error: boolean = false;
  loader: boolean = false;
  errorContent = '';

  selectedItems: string[] = [];
  transformedData: any = [];

  leftLabel: string = 'Simple text';
  rightLabel: string = 'Key value pair';
  toggleValue: boolean = false;
  selectedLabel: string = 'Simple text';

  items = [
    { label: 'Instrument Name', checked: false, value: '', print: false },
    {
      label: 'Mode of administration',
      checked: false,
      value: '',
      print: false,
    },
    {
      label: 'Concept areas of focus',
      checked: false,
      value: '',
      print: false,
    },
    {
      label: 'Instrument description',
      checked: false,
      value: '',
      print: false,
    },
    { label: 'Disease areas', checked: false, value: '', print: false },
    { label: 'Age', checked: false, value: '', print: false },
    { label: 'Gender', checked: false, value: '', print: false },
    { label: 'Year developed', checked: false, value: '', print: false },
    {
      label: 'Bibliographic references',
      checked: false,
      value: '',
      print: false,
    },
    { label: 'Author(s)', checked: false, value: '', print: false },
    { label: 'Copyright owner(s)', checked: false, value: '', print: false },
    { label: 'Number of items', checked: false, value: '', print: false },
    { label: 'Number of domains', checked: false, value: '', print: false },
    { label: 'Domains / Scales', checked: false, value: '', print: false },
    { label: 'Recall period', checked: false, value: '', print: false },
    { label: 'Time to complete', checked: false, value: '', print: false },
    { label: 'Concepts', checked: false, value: '', print: false },
    { label: 'Questionnaire', checked: false, value: '', print: false },
  ];

  updateSelectedItems() {
    this.selectedItems = this.items
      .filter((item) => item.checked)
      .map((item) => item.label);
  }

  selectAllItems(event: any) {
    if (event.checked) {
      this.items.forEach((item) => (item.checked = true));
    } else {
      this.items.forEach((item) => (item.checked = false));
    }
  }
  onToggleChange(): void {
    this.selectedLabel = this.toggleValue ? this.rightLabel : this.leftLabel;
  }

  applyFilters() {
    this.loader = true;
    // console.log('Text Filter:', this.textFilter);
    // console.log('selected items:', this.selectedItems.join(', '));
    var prompt = '';
    var wikiFormat = this.selectedLabel == 'Simple text' ? '' : '';
    var count = 1;
    this.items.forEach((value, index, array) => {
      if (value.label == 'Instrument Name' && value.checked == true) {
        prompt =
          wikiFormat +
          'Find the set of terms designating the title of the instrument. It is the reference of the questionnaire for any citation or use."\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Mode of administration' && value.checked == true) {
        prompt =
          wikiFormat +
          ' What are the Methods and tools used to present the instrument to the patient/clincian/caregiver and collect the responses?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Concept areas of focus' && value.checked == true) {
        prompt =
          wikiFormat +
          ' What are the Specific areas covered by the instrument: Functioning and/or Health impacts and/or HRQOL and/or Symptoms and/or Utility?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Instrument description' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Describe the instrument fundamentals such as goal, length, disease relation, context of creation.\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Disease areas' && value.checked == true) {
        prompt = wikiFormat + ' What is/are the Disease(s) mentioned?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Age' && value.checked == true) {
        prompt = wikiFormat + ' How old is the population?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Gender' && value.checked == true) {
        prompt = wikiFormat + ' What are the genders mentioned?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Year developed' && value.checked == true) {
        prompt =
          wikiFormat +
          ' What is the Date referring to the first time the instrument was first published and officially mentioned in a publication or source?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Bibliographic references' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Find the Set of articles cited in a particular policy to list all publications in which the instrument is detailled at a high level (with all labels above and below)?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Author(s)' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Who is the Primary person or group of persons who created the instrument content and essence?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Copyright owner(s)' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Who is the Person, group of person or entity to whom belong the instrument intellectual properties?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Number of items' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Find the Numerical value listing how many questions are present in the instrument and asked to the patient/clincian/caregiver?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Number of domains' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Find the Numerical value listing how many group of related items exist within one instrument?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Domains / Scales' && value.checked == true) {
        prompt =
          wikiFormat +
          ' What are the scales and dimesnions which Represent a group of related items where a given function is defined?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Recall period' && value.checked == true) {
        prompt =
          wikiFormat +
          ' What is the Timeframe the patient/clincian/caregiver needs to consider to answer the items?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Time to complete' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Find the Numeric value measuring the number of minutes needed to complete all items for a given instrument?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Concepts' && value.checked == true) {
        prompt =
          wikiFormat +
          ' What are the clinical concepts, impacts, signs or symptoms mentioned in this research paper? Answer in single string\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Questionnaire' && value.checked == true) {
        prompt =
          wikiFormat +
          ' Find all the interview questions asked for this instrument? Answer in single string\n';
        this.callGptService(prompt, value);
      }
      count++;
    });
    console.log(prompt);
    // Call your service to perform the filtering with the selected filters here
  }

  callGptService(prompt: string, value: any) {
    this.items.forEach((value, index, array) => {
      value.print = false;
    });
    if (this.selectedLabel == 'Key value pair') {
      var addQuery: string =
        'provide your response in this json format only in the following format: {"label":' +
        '"' +
        value.label +
        '"' +
        ', "value": your output}. If you don\'t have any answer then give the following response: {"label":' +
        '"' +
        value.label +
        '"' +
        ', "value": "N/A"} ';
      prompt = prompt + '. ' + addQuery;
    }

    this.pythonService
      .GetDataFromInstrumentDocumentByPrompt(prompt)
      .subscribe((data: any) => {
        this.loader = false;
        this.error = false;
        this.errorContent = '';
        try {
          value.value = data;
          value.print = true;
          // var parsedData = JSON.parse(data);
          // this.transformedData = Object.entries(parsedData).map(
          //   ([key, value]) => {
          //     return { key, value };
          //   }
          // );
        } catch (e) {
          this.error = true;
          this.errorContent = data;
        }
      });
  }

  downloadJsonAsExcel(): void {
    var jsonData: any = [];
    var jsonData1: any = [
      { Name: 'John', Age: 30, City: 'New York' },
      { Name: 'Jane', Age: 25, City: 'London' },
    ];
    var count = 0;
    this.items.forEach((value, index, array) => {
      try {
        if (value.value !== '' && count == 0) {
          jsonData.push({ [value.label]: JSON.parse(value.value).value });
          count++;
        }
        if (value.value !== '') {
          Object.assign(jsonData[0], {
            [value.label]: JSON.parse(value.value).value,
          });
        }
      } catch (error) {}
    });
    this.jsonToExcelService.downloadExcel(jsonData, 'excelData');
  }

  ngOnInit(): void {}
}
