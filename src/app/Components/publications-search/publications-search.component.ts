import { Component, OnInit } from '@angular/core';
import { PythonApiService } from 'src/app/Services/python-api.service';

@Component({
  selector: 'app-publications-search',
  templateUrl: './publications-search.component.html',
  styleUrls: ['./publications-search.component.scss'],
})
export class PublicationsSearchComponent implements OnInit {
  constructor(public pythonService: PythonApiService) {}
  textFilter = '';
  quantityFilter = '';
  indicationsFilter = '';
  studyTypesFilter = '';
  topicFilter = '';
  ageFilter = '';
  drugsFilter = '';
  publications: any = [];
  error: boolean = false;
  loader: boolean = false;
  errorContent = '';
  applyFilters() {
    this.loader = true;
    console.log('Text Filter:', this.textFilter);
    console.log('Quantity Filter:', this.quantityFilter);
    console.log('Indication Filter:', this.indicationsFilter);
    console.log('Indication Filter:', this.studyTypesFilter);
    console.log('Indication Filter:', this.topicFilter);
    console.log('Indication Filter:', this.ageFilter);
    console.log('Indication Filter:', this.drugsFilter);
    debugger;
    var prompt0 = '';
    var prompt = '';
    var prompt1 = '';
    var prompt2 = '';
    var prompt3 = '';
    var prompt4 = '';
    var prompt5 = '';
    var prompt6 = '';
    var prompt7 = '';
    prompt0 = 'You are a very helpful clinical/medical domain assistant. ';
    if (this.quantityFilter) {
      prompt1 =
        'Give me the top ' +
        this.quantityFilter +
        ' most relevant scientific publications in peer-reviewed journals that ';
    } else {
      prompt1 =
        'Give me a few most relevant scientific publications in peer-reviewed journals that ';
    }
    if (this.studyTypesFilter) {
      prompt2 = 'include ' + this.studyTypesFilter;
    } else {
      prompt2 =
        ' include qualitative methodologies (like interviews and focus groups) ';
    }
    if (this.topicFilter) {
      prompt3 = ' on ' + this.topicFilter;
    } else {
      prompt3 = ' on patient experience ';
    }
    if (this.indicationsFilter) {
      prompt4 = ' for ' + this.indicationsFilter;
    } else {
      prompt4 = 'for colorectal cancer. ';
    }
    if (this.ageFilter) {
      prompt5 =
        '. Limit your search to ' +
        this.ageFilter +
        ' that have been, or are being treated with ';
    } else {
      prompt5 =
        '. Limit your search to [adults (18-65)] that have been, or are being treated with ';
    }
    if (this.drugsFilter) {
      prompt6 = this.drugsFilter + '. Include the PMID of each publication.';
    } else {
      prompt6 = '[taxanes]. Include the PMID of each publication.';
    }
    prompt7 =
      ' Include PMID, title, journal, authors, publication year and give response in the following json list format: {"publications": [{"PMID": value,"title": value,"journal": value,"authors": value,"publication_year": value}]}. '; //You should always provide responses in json format only. You are not allowed to give data in plain text except json format. If you don\'t have results, simply return empty json for example {error:\'Not found\'}. Don\'t provide any extra error message.'
    prompt =
      prompt0 +
      prompt1 +
      prompt2 +
      prompt3 +
      prompt4 +
      prompt5 +
      prompt6 +
      prompt7; //"What is cricket?"
    console.log(prompt);
    // Call your service to perform the filtering with the selected filters here
    this.pythonService.GetDataByPrompt(prompt).subscribe((data) => {
      debugger;
      this.loader = false;
      this.error = false;
      this.errorContent = '';
      try {
        this.publications = JSON.parse(data).publications;
      } catch (e) {
        this.error = true;
        this.errorContent = data;
      }
    });
  }
  ngOnInit(): void {}
}
