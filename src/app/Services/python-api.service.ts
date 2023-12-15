import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PythonApiService {
  apiUrl: string = 'http://localhost:7700/prompt/?query=';
  getPineconeDataApiUrl: string =
    'https://coaachats.azurewebsites.net/api/getDataFromPineconeDocs?code=4KZUyW6zPtwWrDTZssyzEc1FlIa6oV5b9TLg_qC7khUVAzFu6-UaGA==';

  headers = new HttpHeaders().set('Content-Type', 'text/html');
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    // responseType: 'text',
  };
  constructor(private http: HttpClient) {}

  GetDataByPrompt(prompt: string): Observable<any> {
    return this.http.get(this.apiUrl + prompt, { responseType: 'text' });
  }
  GetDataFromLiteratureDocumentByPrompt(
    prompt: string,
    item: any
  ): Observable<any> {
    var body = {
      api_key: 'bb9d0a52-f399-4223-8ac0-19c18af56da5',
      environment: 'us-west1-gcp-free',
    };
    return this.http.post(
      this.getPineconeDataApiUrl +
        '&indexName=poc-documents-index&query=' +
        prompt,
      body,
      {
        responseType: 'text',
      }
    );
  }
  GetDataFromLiteratureDocumentByPromptLlama2(
    prompt: string,
    item: any
  ): Observable<any> {
    return this.http.get(
      'http://localhost:7071/api/searchInDocumentsByLlama2?prompt=' + prompt,
      { responseType: 'text' }
    );
  }

  GetDataFromInstrumentDocumentByPrompt(prompt: string): Observable<any> {
    var body = {
      api_key: '826f5f7b-a6c5-40ef-a79a-e7661c08e799',
      environment: 'us-west4-gcp-free',
    };
    return this.http.post(
      this.getPineconeDataApiUrl + '&indexName=instrument-doc&query=' + prompt,
      body,
      {
        responseType: 'text',
      }
    );
  }

  DownloadAutomatedFiles(keyword: string, fileFormat: string): Observable<any> {
    return this.http.get(
      'http://127.0.0.1:7700/prompt/executeScript?keyword=' +
        keyword +
        '&fileFormat=' +
        fileFormat +
        '&siteURL=https://www.researchgate.net/search/Publications',
      this.httpOptions
    );
  }

  GetScrapedDataFromDatabase(): Observable<any> {
    return this.http.get('http://127.0.0.1:7700/prompt/getDataFromAzureSql', {
      responseType: 'json',
    });
  }

  GetDataFromVectorDB(query: string): Observable<any> {
    return this.http.get(
      'http://127.0.0.1:7700/prompt/searchInPinecone?query=' + query,
      { responseType: 'json' }
    );
  }


  GetDataForScrapping(query: string): Observable<any> {
    return this.http.get(
      'https://coaascrapping.azurewebsites.net/api/getDataFromPineconeDocs?code=u9Ycs2Mvaaw_o7QFjzAVctx24t56OtyYtAEWj0z4dYIlAzFuQXbHSw==&query=' + query,
      { responseType: 'text' }
    );
  }
}
