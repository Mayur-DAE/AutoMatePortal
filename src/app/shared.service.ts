import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, firstValueFrom } from 'rxjs';
import { AppConfig } from './config/app-config';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private homeServicesSource = new BehaviorSubject<any[]>([]);
  currentHomeServices = this.homeServicesSource.asObservable();
  private parent =new BehaviorSubject<boolean>(false);
  isparent=this.parent.asObservable();
  private SpeakerOn= new BehaviorSubject<boolean>(true);
  isSpeakerOn=this.SpeakerOn.asObservable();
  
  APIURL = '';
  PhotoURL = '';
  silentPrintURL = 'http://127.0.0.1:9090/print-html';
  Subtitle="";
  externalfydaAPi="";

  constructor(private http: HttpClient, appConfig: AppConfig) {
    this.APIURL = appConfig.baseUrl;    
    this.externalfydaAPi=appConfig.externalAPi
  }
  setIsSpeakerOn(value: boolean) {
    
    this.SpeakerOn.next(value);
  }
  setIsParent(value: boolean) {
    this.parent.next(value);
  }
  changeHomeServices(HomeServices: any[]) {
    this.homeServicesSource.next(HomeServices);
  }
  sendWhatsapp(val: any) {
    return this.http.post<any>(this.APIURL + '/WhatsApp/Send', val);
  }

  Ministatement(val: any) {
    return this.http.post<any>(this.APIURL + '/MiniStatement', val);
  }

  AirLines(val: any) {
    return this.http.post<any>(this.APIURL + '/OrderInquiry', val);
  }

  FundTransfer(val: any) {
    return this.http.post<any>(this.APIURL + '/FundTransfer', val);
  }

  GetLanguage(val: any) {
    return this.http.post<any>(this.APIURL + '/Token/GetLanguage', val);
  }

  GetChildServices(val: any) {
    return this.http.post<any>(this.APIURL + '/Token/GetChildServices', val);
  }

  GetTokenNo(val: any) {
    return this.http.post<any>(this.APIURL + '/Token/GetTokenNo', val);
  }

  GetTokenId(val: any) {
    return this.http.post<any>(this.APIURL + '/TokenId/get', val);
  }

  UpdateTokenNo(val: any) {
    return this.http.post<any>(this.APIURL + '/Token/update', val);
  }

   SetWhatsapp(val: any) {
    return this.http.post<any>(this.APIURL + '/WhatsApp/Send', val);
  }
  SetSms(val: any) {
    return this.http.post<any>(this.APIURL + '/SMS', val)
  }
  GetServiceVisitCount(val:any){
    return this.http.post<any>(this.APIURL+'/TokenTransaction/GetServiceVisitCount',val)
  }
  SmsCaptionByServiceId(val:any){
    return this.http.post<any>(this.APIURL+'/TokenId/SmsCaptionByServiceId',val)
  }
  SendOTP(val: any) {
    return this.http.post<any>(this.APIURL + '/OTP', val)
  }

  ValidateOTP(val: any) {
    return this.http.post<any>(this.APIURL + '/ValidateOtp', val)
  }
  // CustomerInfo(val: any) {
  //   return this.http.post<any>(this.APIURL + '/CustomerInfo', val)
  // }

  CustomerInfo(val: any): Observable<any> {
    return this.http.post<any>(`${this.APIURL}/CustomerInfo`, val).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

    } else {

    }
    const errorFactory = () => new Error('Something bad happened; please try again later.');

    return throwError(errorFactory);
  }

  AccountBalance(valAB: any) {
    return this.http.post<any>(this.APIURL + '/AccountBalance', valAB).pipe(
      catchError(this.handleError)
    );
  }

  NewCardRequest(valAB: any) {
    return this.http.post<any>(this.APIURL + '/NewCardRequest', valAB).pipe(
      catchError(this.handleError)
    );
  }

  AddtokenTransaction(val: any) {
    return this.http.post<any>(this.APIURL + '/TokenTransaction/Add', val);
  }
  GetCaption(val: any) {
    return this.http.post<any>(this.APIURL + '/Caption/get', val);
  }
  SendFeedback(val4: any) {
    return this.http.post<any>(this.APIURL + '/Feedback/insert', val4);
  }
  TelebirrName(val: any) {
    return this.http.post<any>(this.APIURL + '/TelebirrName', val);
  }
  OrderConfirmation(val: any) {
    return this.http.post<any>(this.APIURL + '/OrderConfirmation', val);
  }
  BankToTelebirr(val: any) {
    return this.http.post<any>(this.APIURL + '/BankToTelebirr', val);
  }

  AverageWaitTime(val: any) {
    
    return this.http.post<any>(this.APIURL + '/AverageWaitTime/get', val);
  }

  IsFeeedbackActive(val: any) {
    
    return this.http.post<any>(this.APIURL + '/FeedbackStatus/get', val);
  }

  BranchDetails(val: any) {
    
    return this.http.post<any>(this.APIURL + '/BranchDetails', val);
  }

  OpenAcAccount(val: any) {    
    return this.http.post<any>(this.APIURL + '/OpenAnAccount/Add', val);
  }

  UploadSignature(val: any) {    
    return this.http.post<any>(this.APIURL + '/SignatureUpload', val);
  }
  UploadSignatureForCashdepost2(val: any) {    
    return this.http.post<any>(this.APIURL + '/SignatureUploadCashDepost2', val);
  }

  async fydaToken(val: any) {
  return await firstValueFrom(
    this.http.post<any>(this.externalfydaAPi + '/token', val)
  );
}
  printHtml(htmlContent: any) {
    // const encodedHtml = encodeURIComponent(htmlContent);
    return this.http.post<any>(this.silentPrintURL, htmlContent);
  }
}
