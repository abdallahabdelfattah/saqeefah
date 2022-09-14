import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { RequestMethod } from '../Enums/enums';
import { Result } from './Result';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APICallerService {
  //==========================Data=======================
  public imageServerPath: string = '';
  private serviceApiUrl: string;
  public onUnAuthorized: EventEmitter<void> = new EventEmitter<void>();

  // Development Mode
  //public domainName = 'https://api-stage.saqeefah.com';

  // Testing Mode
   domainName = environment.appRoot;

  constructor(private http: HttpClient, private tokenService: AuthService) {
    this.imageServerPath = this.domainName;
    this.serviceApiUrl = this.domainName + '/';
  }

  public getHeaders(contentType: string = 'application/json') {
    let token = this.tokenService.getToken();
    if (token)
      return new HttpHeaders({
        'Content-Type': contentType,
        Authorization: 'Bearer ' + token,
      });
    else
      return new HttpHeaders({
        'Content-Type': contentType,
      });
  }

  private serverRequest(
    method: RequestMethod,
    url: string,
    body: any,
    auth: boolean = true,
    loader: string = '',
    handleError: boolean = true
  ): Observable<Result<any>> {
    let fUrl = this.serviceApiUrl + url;

    let requestOptions = {
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    };

    this.showLoader();

    // call service
    var response = this.http.request(RequestMethod[method], fUrl, requestOptions);
    return response
      .pipe(
        catchError(response => {
          if (response.status == 200) {
            let res: Result<any> = new Result<any>();
            res.isError = false;
            res.result = response.error.text;
            res.handledResponse = true;

            return from([res]);
          }
          return this.handleError(response, handleError);
        })
      )
      .pipe(
        map((response: any) => {
          this.hideLoader();
          if (response) {
            if (response.handledResponse) return response;
          }

          let res: Result<any> = new Result<any>();
          res.isError = false;
          res.result = response;
          return res;
        })
      );
  }

  public post(
    url: string,
    body: any,
    auth: boolean = true,
    loader: string = '',
    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(RequestMethod.POST, url, body, auth, loader, handleError);
  }



  public postWithAttachment(
    url: string,
    formData: any,
    auth: boolean = true,
    loader: string = '',
    handleError: boolean = true
  ): Observable<any> {
    let _requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.getToken(),
        'Accept': 'text/plain',
      }),
    };
    let fUrl = this.serviceApiUrl + url;

    return this.http.post(fUrl,formData,
    {
         headers:_requestOptions.headers
    }
  );
   
  }



  public postFormData(
    url: string,
    formData: any,
    auth: boolean = true,
    loader: string = '',
    handleError: boolean = true
  ): Observable<any> {
    let _requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    let fUrl = this.serviceApiUrl + url;
    return this.http.post(fUrl,formData,
    {
         headers:_requestOptions.headers
    }
  );
   
  }






  public put(
    url: string,
    body: any,
    auth: boolean = true,
    loader: string = '',
    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(RequestMethod.PUT, url, body, auth, loader, handleError);
  }

  public delete(
    url: string,
    body: any,
    auth: boolean = true,
    loader: string = '',
    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(RequestMethod.DELETE, url, body, auth, loader, handleError);
  }

  public get(
    url: string,
    auth: boolean = true,
    loader: string = '',
    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(RequestMethod.GET, url, null, auth, loader, handleError);
  }

  public call(
    method: RequestMethod,
    url: string,
    body: any,
    authToken: string
  ): Observable<Result<any>> {
    let fUrl = this.serviceApiUrl + url;
    let requestOptions = {
      body: JSON.stringify(body),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
    };

    this.showLoader();
    // call service
    var response = this.http.request(RequestMethod[method], fUrl, requestOptions);
    return response.pipe(catchError(error => this.handleError(error, true))).pipe(
      map((response: any) => {
        this.hideLoader();
        if (!response.isError) {
          let res: Result<any> = new Result<any>();
          res.isError = false;
          res.result = response;
          // res.result = response.result;
          return res;
        }
        return response;
      })
    );
  }

  public getUserRoles(token: any): Observable<Result<any>> {
    let fUrl = this.serviceApiUrl; //+ APIs.Roles.UserRoles;

    let requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    // call service
    var response = this.http.request('Get', fUrl, requestOptions);
    return response.pipe(catchError(error => this.handleError(error, true))).pipe(
      map((response: any) => {
        // if (loader)
        //     this.loaderService.outLoad(loader);
        if (!response.isError) {
          let res: Result<any> = new Result<any>();
          res.isError = false;
          res.result = response;
          // res.result = response.result;
          return res;
        }
        return response;
      })
    );
  }

  // Handle Error
  private handleError(response: any, viewError: any) {
    this.hideLoader();
    let res: Result<string> = new Result<string>();
    res.isError = true;
    res.result = response.Message;
    res.handledResponse = true;
    return from([res]);
  }

  // Handle Refresh Token
  private handleRefreshToken() {
    // let model = {
    // accessToken: this.tokenService.AccessToken,
    // refreshToken: this.tokenService.RefreshToken
    // }
    // this.post(APIs.Account.RefreshToken, model).subscribe(res => {
    // if (!res.isError)
    //     this.tokenService.authenticate(res.result);
    // });
  }

  // Show Loader
  private showLoader() {
    let loader = document.getElementById('part-loader');
    if (loader) loader.style.display = 'flex';
  }

  // Hide Loader
  private hideLoader() {
    let loader = document.getElementById('part-loader');
    if (loader) loader.style.display = 'none';
  }
}
