import { Component, OnInit } from '@angular/core';
import { PythonApiService } from 'src/app/Services/python-api.service';

@Component({
  selector: 'app-instrument-validation-search',
  templateUrl: './instrument-validation-search.component.html',
  styleUrls: ['./instrument-validation-search.component.scss'],
})
export class InstrumentValidationSearchComponent implements OnInit {
  constructor(public pythonService: PythonApiService) {}
  textFilter = '';
  indicationsFilter = '';
  coaFilter = '';
  Content_Validity: any;
  Psychometric_Properties: any;
  error: boolean = false;
  loader: boolean = false;
  errorContent = '';
  applyFilters() {
    this.loader = true;
    console.log('Text Filter:', this.textFilter);
    console.log('Indication Filter:', this.indicationsFilter);
    console.log('COa Filter:', this.coaFilter);
    debugger;
    var prompt0 = '';
    var prompt = '';
    var prompt1 = '';
    var prompt2 = '';
    var prompt3 = '';
    var prompt4 = '';
    var prompt5 = '';
    prompt0 = 'You are a very helpful clinical/medical domain assistant. ';
    if (this.coaFilter) {
      prompt1 =
        'Please find and summarise the content validity and psychometric properties for the ' +
        this.coaFilter +
        ' COA instrument ';
    } else {
      prompt1 =
        'Please find and summarise the content validity and psychometric properties for any latest coa instrument ';
    }
    if (this.indicationsFilter) {
      prompt2 = ' in ' + this.indicationsFilter;
    } else {
      prompt2 = ' in any cancer ';
    }
    prompt3 = `. Report the results for each of the following categories:
    1. Content validity: a) literature reviews, b) interviews with clinical experts, c) interviews with patients
    2. Psychometric properties: a) structural validity, b) reliability, c) construct validity, d) ability to detect change / responsiveness, e) meaningful change
    Please highlight when a listed content validity category or psychometric property has not been evaluated`;

    if (this.indicationsFilter) {
      prompt2 = ' or validated in  ' + this.indicationsFilter;
    } else {
      prompt2 = ' or validated in any cancer';
    }

    prompt4 = `. Do not consider content validity category or psychometric property in other indications.
      Provide data for Content Validity like Literature Reviews, Interviews with Patients, Interviews with Clinical Experts.
      Also provide data for Psychometric Properties like Structural Validity, Reliability, Construct Validity, Ability to Detect Change / Responsiveness, Meaningful Change.
      . Provide your response in the following json format: 
      '"{"Content_Validity": {"Literature_Reviews": "value","Interviews_with_Clinical_Experts": "value","Interviews_with_Patients": "value"},"Psychometric_Properties": {"Structural_Validity": "value","Reliability": "value","Construct_Validity": "value","Ability_to_Detect_Change_Responsiveness": "value","Meaningful_Change": "value"}}"'
      I am providing you a sample data for your reference:
      {"Content_Validity": {\n    "Literature_Reviews": "The EORTC-QLQ-C30 and EORTC-QLQ-PR25 questionnaires have been subject to extensive literature reviews",\n    "Interviews_with_Clinical_Experts": "Clinical experts were involved in developing the EORTC-QLQ-C30-PR25 instrument",\n    "Interviews_with_Patients": "Patients were involved in developing the EORTC-QLQ-C30-PR25 instrument"\n},\n"Psychometric_Properties": {\n    "Structural_Validity": "The EORTC-QLQ-C30-PR25 demonstrated good structural validity through confirmatory factor analysis in a sample of colorectal cancer patients",\n    "Reliability": "The EORTC-QLQ-C30-PR25 demonstrated excellent internal consistency reliability in a sample of colorectal cancer patients",\n    "Construct_Validity": "The EORTC-QLQ-C30-PR25 demonstrated good convergent and discriminant construct validity in a sample of colorectal cancer patients",\n    "Ability_to_Detect_Change_Responsiveness": "The EORTC-QLQ-C30-PR25 demonstrated good ability to detect change/responsiveness in a sample of colorectal cancer patients",\n    "Meaningful_Change": "The EORTC-QLQ-C30-PR25 has not been evaluated for meaningful change in colorectal cancer patients"\n}}`; //You should always provide responses in json format only. You are not allowed to give data in plain text except json format. If you don't have results, simply return empty json for example {error:'Not found'}. Don't provide any extra error message.";

    prompt = prompt0 + prompt1 + prompt2 + prompt3 + prompt4 + "If you don\'t have any answer then give the following response: {'label':'Error', 'value': 'N/A'}";
    console.log(prompt);
    // Call your service to perform the filtering with the selected filters here
    this.pythonService.GetDataByPrompt(prompt).subscribe((data) => {
      debugger;
      this.loader = false;
      this.error = false;
      this.errorContent = '';
      try {
        var parsedData = JSON.parse(data);
        if (parsedData) {
          this.Content_Validity = parsedData.Content_Validity;
          this.Psychometric_Properties = parsedData.Psychometric_Properties;
        }
      } catch (e) {
        this.error = true;
        this.errorContent = data;
      }
    });
  }

  ngOnInit(): void {}
}
