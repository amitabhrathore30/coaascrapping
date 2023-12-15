import { Component, OnInit } from '@angular/core';
import { JsonToExcelService } from 'src/app/Services/jsonToExcel.service';
import { PythonApiService } from 'src/app/Services/python-api.service';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss'],
})
export class DocumentSearchComponent implements OnInit {
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
    { label: 'Title', checked: false, value: '', print: false },
    { label: 'Author', checked: false, value: '', print: false },
    { label: 'Source type', checked: false, value: '', print: false },
    { label: 'Type of Publication', checked: false, value: '', print: false },
    { label: 'Journal or conference', checked: false, value: '', print: false },
    { label: 'Publication Date', checked: false, value: '', print: false },
    { label: 'Research Methodologies', checked: false, value: '', print: false },
    { label: 'Study design', checked: false, value: '', print: false },
    { label: 'Objective', checked: false, value: '', print: false },
    { label: 'Conclusion', checked: false, value: '', print: false },
    { label: 'Study population', checked: false, value: '', print: false },
    { label: 'COAs referenced', checked: false, value: '', print: false },
    { label: 'Disease', checked: false, value: '', print: false },
    { label: 'Population', checked: false, value: '', print: false },
    { label: 'Study country', checked: false, value: '', print: false },
    { label: 'Sample size', checked: false, value: '', print: false },
    { label: 'Complications', checked: false, value: '', print: false },
    { label: 'Full citation', checked: false, value: '', print: false },
    { label: 'Drugs', checked: false, value: '', print: false },
    { label: 'Interventions', checked: false, value: '', print: false },
    { label: 'Concepts', checked: false, value: '', print: false },
    { label: 'Language', checked: false, value: '', print: false },
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
    var count = 1;
    this.items.forEach((value, index, array) => {
      if (value.label == 'Title' && value.checked == true) {
        prompt = ' What is the headline/title of this research paper?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Author' && value.checked == true) {
        prompt =
          ' Who are the authors of this research paper in single line?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Source type' && value.checked == true) {
        prompt =
          ' Below is the datasource with comma separated string for type of source type:\n Journal published material,Patient transcript,Clinician transcript,Non-journal published material,Website material,Social media, text and blogs.\n What is the source type of this document?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Type of Publication' && value.checked == true) {
        prompt =
          ' Below is the datasource with comma separated string for type of publication:\n Conference poster,Conference abstract,Product label,Peer-reviewed publication,Non peer-reviewed publication,Guidance,Not applicable.\n What Type of Publication or document is this?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Journal or conference' && value.checked == true) {
        prompt = ' What is the name of tje journal or conference?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Publication Date' && value.checked == true) {
        prompt = ' On which date this research paper published?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Research Methodologies' && value.checked == true) {
        prompt =
          ' Below is the datasource with comma separated string for Research Methodologies:\n Patient interviews/focus groups,Review article of patient experience literature,Case study,Expert reports/ consensus statement,Other (please specify),Close ended patient survey/questionnaire from Clinical or RW study,Open ended patient survey/questionnaire from Clinical or RW study,Close ended clinician survey/questionnaire from Clinical or RW study,Close ended caregiver survey/questionnaire from Clinical or RW study,Open ended clinician survey/questionnaire from Clinical or RW study,Open ended caregiver survey/questionnaire from Clinical or RW study,Clinician interviews/focus groups,Caregiver interviews/focus groups,Data from electronic medical records (EMR),Expert report/Consensus statement,Review article of patient preferences and perspectives literature,Review article of clinician preferences and perspectives literature,Review article of caregiver preferences and perspectives literature,Stated patient preference survey - discrete choice experiment (DCE),Stated clinician preference survey - discrete choice experiment (DCE),Stated caregiver preference survey - discrete choice experiment (DCE),Stated patient preference survey - time trade-off (TTO),Stated clinician preference survey - time trade-off (TTO),Stated caregiver preference survey - time trade-off (TTO),Stated patient preference survey - standard gamble (SG),Stated clinician preference survey - standard gamble (SG),Stated caregiver preference survey - standard gamble (SG),Stated patient preference survey - best-worst scaling (BWS) (type 1 or 2),Stated clinician preference survey - best-worst scaling (BWS) (type 1 or 2),Stated caregiver preference survey - best-worst scaling (BWS) (type 1 or 2),Stated patient preference survey - swing weighting,Stated clinician preference survey - swing weighting,Stated caregiver preference survey - swing weighting,Stated patient preference survey - multiple criteria decision analysis (MCDA),Stated clinician preference survey - multiple criteria decision analysis (MCDA),Stated caregiver preference survey - multiple criteria decision analysis (MCDA). \n What is the most matched Research Methodologies or methods of research used in this research from the provided datasource?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Study design' && value.checked == true) {
        prompt =
          ' Study design is a framework, or the set of methods and procedures used to collect and analyze data on variables specified in a particular research problem.\n Describe it with respect to this document.\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Objective' && value.checked == true) {
        prompt = ' Write a brief about Objective of this document?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Conclusion' && value.checked == true) {
        prompt = ' Write a brief Conclusion of this document?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Study population' && value.checked == true) {
        prompt =
          ' The study population is the subset of the target population available for study. What is the study population used for this document.\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'COAs referenced' && value.checked == true) {
        prompt =
          ' A clinical outcome assessment is a measure that describes or reflects how a patient feels, functions, or survives. What are the Clinical outcomes assessment (COA) referenced in this document?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Disease' && value.checked == true) {
        prompt = ' Name the complete Disease name mentioned in the research?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Population' && value.checked == true) {
        prompt =
          ' Below is the datasource with comma separated string for Population (age):\n Infants,Elderly,Adult,Adolescent,Pediatric,Not specified.\n What is the Population (age) of the people used in research?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Study country' && value.checked == true) {
        prompt =
          ' In which country or countries this research was performed? Give answer in single line.\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Sample size' && value.checked == true) {
        prompt =
          ' The sample size is the number of patients or other investigated units that will be included in a study and required to answer the research hypothesis in the study. \nWhat is the sample size used in this research? for example n=total szie, percent of female, percent of male, age group etc.\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Full citation' && value.checked == true) {
        prompt =
          ' Full citations provide all of the elements necessary for the reader to find the exact same source used by the writer. \nWhat is the full citation for this research.\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Complications' && value.checked == true) {
        prompt =
          ' Are there any complications mentioned in the research? If yes, please mention.\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Drugs' && value.checked == true) {
        prompt = ' A drug refers to a synthesized pharmaceutical molecule or compound intended for use in the diagnosis, cure, mitigation, treatment, or prevention of disease. \nWhat are the medicines used in the research?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Interventions' && value.checked == true) {
        prompt =
          ' Intervention is a procedure or treatment such as a drug, nutritional supplement, gene transfer, vaccine, behavior or device modification that is performed for clinical research purposes. \nWhat are the Interventions or medical procedures used in research?\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Concepts' && value.checked == true) {
        prompt =
          ' What are the clinical concepts, impacts, signs or symptoms mentioned in this research paper? Answer in single string\n';
        this.callGptService(prompt, value);
      }
      if (value.label == 'Language' && value.checked == true) {
        prompt = ' In which language(s) this research was done?';
        this.callGptService(prompt, value);
      }
      count++;
    });
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
        ', "value": "N/A"} . Do not provide any answer as a list.';
      prompt = prompt + '. ' + addQuery;
      console.log(prompt);
    }

    this.pythonService
      .GetDataFromLiteratureDocumentByPrompt(prompt, value)
      .subscribe((data) => {
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
