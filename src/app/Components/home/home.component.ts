import { Component, OnInit } from '@angular/core';
import { PythonApiService } from 'src/app/Services/python-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public pythonService: PythonApiService) {}

  ngOnInit(): void {
    
  }
  topics = [
    // {
    //   title: 'Publications',
    //   subtitle: 'Conduct non-protocolized searches for PE data. Search through latest publications through chat GPT.',
    //   image: '../../../assets/assets/topic1.jpg',
    //   avatar: '../../../assets/document-magnifier-glass.svg',
    //   content: 'Content for Topic 1...',
    //   router:'/Publications'
    // },
    // {
    //   title: 'Instruments',
    //   subtitle: 'Search through latest COA instruments through chat GPT.',
    //   image: '../../../assets/pie-chart-ruler.svg',
    //   avatar: '../../../assets/pie-chart-ruler.svg',
    //   content: 'Content for Topic 2...',
    //   router:'/Instruments'
    // },
    // {
    //   title: 'COA Validation',
    //   subtitle: 'Search through latest COA validations information through chat GPT.',
    //   image: '../../../assets/speedometer.svg',
    //   avatar: '../../../assets/speedometer.svg',
    //   content: 'Content for Topic 3...',
    //   router:'/InstrumentsValidation'
    // },
    {
      title: 'Document search',
      subtitle: 'Search through literature in vector DB',
      image: '../../../assets/document-magnifier-glass.svg',
      avatar: '../../../assets/document-magnifier-glass.svg',
      content: 'Content for Topic 3...',
      router:'/DocumentSearch'
    },
    {
      title: 'PDQ-39',
      subtitle: 'Search through COA instrument for PDQ-39',
      image: '../../../assets/document-magnifier-glass.svg',
      avatar: '../../../assets/document-magnifier-glass.svg',
      content: 'Content for Topic 3...',
      router:'/InstrumentDocSearch'
    }
    // add more topics as needed
  ];
}
