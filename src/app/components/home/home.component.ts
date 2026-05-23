import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { AppConfig } from 'src/app/config/app-config';
import { TpaComponent } from '../features/tpa/tpa.component';
import { FeedbackComponent } from '../feedback/feedback.component';

declare function showFirstModalCP(): any;
declare function hideFirstModalCP(): any;
declare function showopenModalHeroServices(): any;
declare function hideModalHeroServices(): any;

// NOTE: showFModalFb / hideFModalFb / showSecondModalFb / hideSecondModalFb
//       REMOVED — now live in feedback.component.ts
// NOTE: showTPAPopupModal / hideTPAPopupModal
//       REMOVED — live in tpa.component.ts

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('siriVideo')    siriVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('siriContainer') siriContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tpaRef')       tpaRef!: TpaComponent;
  @ViewChild('feedbackRef')  feedbackRef!: FeedbackComponent;   // ← NEW

  Subtitle = '';
  isParent: boolean | undefined = false;
  isSound: boolean | undefined = true;
  isSpeakerOn: boolean = true;
  showSpinner: boolean = false;
  logo: any;
  captions: any;
  labelValues: { [key: string]: string } = {};

  // Token & Services
  form4: FormGroup;
  LanguageId: any;
  BranchID: any;
  BranchName = '';
  TokenId: any;
  CounterId: any;
  UserID: any;
  Services: any;
  showLanguage = true;
  SelectedService: any;
  SelectedServices: string = '';
  SelectedServiceCaption: any;
  SelectedServicesID = '';
  SelectedTokenID = '';
  GPriorityID = 211;

  showToken: boolean = false;
  tokenData: any;
  AverageWait: any;
  currentDate: any;
  dataList: any = [];

  // Error & Status
  errorMessageMP: any;
  errorMessageHS: any;
  submitted4 = false;

  private timeoutGT: any;
  branchDetails: any;
  crossSellingtext: any;
  private activeRequests = 0;

  // NOTE: FeedbackActive, FeedbackResponse, showSuggetion1, ShowFeedbackdiv1,
  //       showSuggetionDiv1, errorMessageFB, feedbackIdleTimeout, FeedbackRadio,
  //       feedbackForm, emojiRating  — ALL REMOVED, now live in FeedbackComponent

  constructor(
    private cdr: ChangeDetectorRef,
    private appConfig: AppConfig,
    private router: Router,
    private formBuilder4: FormBuilder,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private service: SharedService,
    private route: ActivatedRoute
  ) {
    this.isSound = appConfig.isSound;
    this.logo = 'assets/images/tower-logo-white-black.png';

    this.form4 = this.formBuilder4.group({
      MobileNumber: ['', [
        Validators.required,
        Validators.pattern('^0[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const paramValue = params['param'];
      if (paramValue === 'app') {
        this.isSound = false;
        sessionStorage.setItem('isSound', 'false');
      }
      if (sessionStorage.getItem('isSound') === 'false') {
        this.isSound = false;
      }
    });

    this.Subtitle = this.service.Subtitle;
    this.service.isparent.subscribe(isParent => { this.isParent = isParent; });
    this.service.setIsParent(false);
    this.service.isSpeakerOn.subscribe(v => { this.isSpeakerOn = v; });

    this.LanguageId = localStorage.getItem('LanguageId');
    this.BranchID   = localStorage.getItem('BranchId');

    this.getBranchDetails({ BranchId: this.BranchID });
    this.service.GetCaption({ LanguageId: this.LanguageId }).subscribe(
      (data) => {
        this.captions = data;
        if (this.captions && Array.isArray(this.captions)) {
          this.captions.forEach((item: any) => {
            this.labelValues[item.Caption] = item.Value;
          });
        }
      },
      (error) => { console.error('Failed to retrieve captions', error); }
    );

    this.getParentServices();
    this.playAudioAndAnimate();
  }

  setLoading(isLoading: boolean) {
    if (isLoading) {
      this.activeRequests++;
      this.showSpinner = true;
    } else {
      this.activeRequests = Math.max(0, this.activeRequests - 1);
      if (this.activeRequests === 0) this.showSpinner = false;
    }
    this.cdr.detectChanges();
  }

  get f4(): { [key: string]: AbstractControl } {
    return this.form4.controls;
  }

  toggleAudioAndAnimate(): void {
    this.isSpeakerOn = !this.isSpeakerOn;
    this.service.setIsSpeakerOn(this.isSpeakerOn);
    this.playAudioAndAnimate();
  }

  playAudioAndAnimate(): void {
    this.speakText(this.Services?.length == 2 ? 'Please Select Language.' : 'Please Select Service.');
  }

  getBranchDetails(BranchId: any) {
    this.service.BranchDetails(BranchId).subscribe(
      (data) => {
        if (data?.Table?.[0]) {
          this.branchDetails = data.Table[0];
          this.BranchName    = this.branchDetails.BranchName;
        }
      },
      (error) => { console.error('Failed to get branch details', error); }
    );
  }

  getValueForCaption(caption: string): string {
    return this.labelValues[caption] || '';
  }

  getParentServices() {
    const val = { ParentService: '', IsBack: true, BranchID: this.BranchID, LaguageID: this.LanguageId };
    this.service.GetChildServices(val).subscribe(
      (data) => {
        const services = data?.['Body']?.['GetChildServicesResult']?.['GetChildServices']?.['Service'];
        if (services) {
          this.showLanguage = false;
          this.Services = this.modifyPropertyNames(services);
          this.updateServices();
        }
      },
      (error) => { console.error('Failed to retrieve parent services', error); }
    );
  }

  getChildServices() {
    const val = { ParentService: this.SelectedServices, IsBack: false, BranchID: this.BranchID, LaguageID: this.LanguageId };
    this.service.GetChildServices(val).subscribe(
      (data) => {
        const services = data?.['Body']?.['GetChildServicesResult']?.['GetChildServices']?.['Service'];
        if (services) {
          this.service.setIsParent(true);
          this.showLanguage = false;
          this.Services = this.modifyPropertyNames(services);
          this.speakText('Please Select Service.');
          this.updateServices();
        }
      },
      (error) => { console.error('Failed to retrieve child services', error); }
    );
  }

  modifyPropertyNames(data: any): any[] {
    const transform = (item: any): any => {
      if (Array.isArray(item)) return item.map(transform);
      if (typeof item === 'object' && item !== null) {
        const newItem: { [key: string]: any } = {};
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            newItem[key.replace('@', '')] = transform(item[key]);
          }
        }
        return newItem;
      }
      return item;
    };
    const result = transform(data);
    return Array.isArray(result) ? result : [result];
  }

  serviceClick(service: any) {
    this.stopSpeechAndVideo();
    this.SelectedService        = service;
    this.SelectedServices       = service.ServiceName;
    this.SelectedServicesID     = service.ServiceId;
    this.SelectedServiceCaption = service.ServiceCaption;

    if (service.IsGroup === 'True') {
      this.getChildServices();
    } else if (service.ServiceName === 'TPA') {
      this.tpaRef.open();
      this.speakText('TPA. Please continue.');
    } else {
      showFirstModalCP();
      this.speakText(`${service.ServiceCaption}. Please enter your Phone number.`);
    }
  }

  // TPA passed all checks → open Get Token
  onTPAProceed() {
    showFirstModalCP();
    this.speakText('Please enter your Phone number.');
  }

  updateServices() {
    this.service.changeHomeServices(this.Services);
  }

  GenerateTokenCP() {
    this.submitted4 = true;
    if (this.form4.invalid) return;
    this.generateToken(this.SelectedService);
    this.sla();
  }

  DontHaveMobile() {
    this.form4.patchValue({ MobileNumber: '' });
    this.generateToken(this.SelectedService);
    this.sla();
  }

  generateToken(service: any) {
    this.setLoading(true);
    this.errorMessageMP = '';
    const val: any = {
      ServiceName: this.SelectedServices,
      BranchID:    this.BranchID,
      PriorityID:  this.GPriorityID,
      LaguageID:   this.LanguageId,
      TokenDetails: '',
      MsIsdnNo:    '',
      MissionId:   1,
      ServiceID:   this.SelectedServicesID,
    };

    this.service.GetTokenNo(val).subscribe(
      (data) => {
        this.setLoading(false);
        const tokenNo = data?.['Body']?.['GetTokenNoResult']?.['GetTokenNoDetails']?.['ServiceTokenNo']?.['@TokenNo'];
        if (tokenNo) {
          this.tokenData = tokenNo;
          if (this.form4.value.MobileNumber) {
            // this.sendSms(`Welcome to Hinduja Hospital. Your Token No is ${tokenNo} Thank You.`);
          }
          this.generateTokenID(service);
          this.currentDate = new Date();
          this.showToken   = true;
          if (this.appConfig.isPrint) this.printToken(this.tokenData);
          this.FeedbackStatusAndFlow();
        } else {
          this.errorMessageMP = 'Something went wrong. Try again later';
          this.triggerTimeoutGT();
        }
      },
      () => {
        this.setLoading(false);
        this.errorMessageMP = 'Something went wrong. Try again later';
        this.triggerTimeoutGT();
      }
    );
  }

  // ─────────────────────────────────────────────────────────
  // Checks if feedback is active.
  // If yes: waits 5s, hides token modal, opens FeedbackComponent.
  // If no:  auto-resets after 5s as before.
  // ─────────────────────────────────────────────────────────
  FeedbackStatusAndFlow() {
    this.service.IsFeeedbackActive({ BranchId: this.BranchID }).subscribe(
      (data) => {      
        if (data === 'True') {          
          setTimeout(() => {
            hideFirstModalCP();
            this.feedbackRef.open();   // ← FeedbackComponent handles everything from here
          }, 5000);
        } else {
          this.triggerTimeoutGT();
        }
      },
      () => { this.triggerTimeoutGT(); }
    );
  }

  // Called by FeedbackComponent's (done) output event
  onFeedbackDone() {
    this.resetFormChangePin();
  }

  triggerTimeoutGT() {
    clearTimeout(this.timeoutGT);
    this.timeoutGT = setTimeout(() => {
      hideFirstModalCP();
      this.resetFormChangePin();
    }, 5000);
  }

  generateTokenID(service: any) {
    this.setLoading(true);
    this.service.GetTokenId({ TokenNo: this.tokenData, ServiceId: this.SelectedServicesID }).subscribe(
      (data) => {
        this.setLoading(false);
        this.dataList = data;
        if (this.dataList?.['Table']?.[0]) {
          this.TokenId = this.dataList['Table'][0]['TokenId'];
        }
        this.SelectedTokenID = service.TokenId;
      },
      () => { this.setLoading(false); }
    );
  }

  updateToken(TokenId: any) {
    this.service.UpdateTokenNo({
      TokenNo: this.tokenData, TokenId, StatusId: 128,
      CounterId: this.CounterId, UserId: this.UserID,
      BranchId: this.BranchID, TimeRequired: 100,
    }).subscribe(() => {}, () => {});
  }

  sendWhatApp(Token: any, Number?: any) {
    const formattedDate1 = new Date(new Date().setHours(new Date().getHours())).toLocaleString();
    const formattedDate  = new Date(new Date().setHours(new Date().getHours() + 1)).toLocaleString();
    let message = this.getValueForCaption('WhatsappSms');
    const values: any = {
      BranchName: this.BranchName || 'Branch Name',
      formattedDate1, Token,
      SelectedServices: this.SelectedServices || 'Service',
      formattedDate,
      crossSellingtext: this.crossSellingtext || 'You are eligible for a life time free international credit card.',
    };
    for (const key of Object.keys(values)) {
      message = message.replace(new RegExp(`#${key}`, 'g'), values[key]);
    }
    this.service.SetWhatsapp({ to: Number || this.form4.value.MobileNumber, message }).subscribe(
      () => { this.crossSellingtext = ''; }, () => {}
    );
  }

  sendSms(smscontent: any) {
    this.service.SetSms({ Mobile: this.form4.value.MobileNumber, Sms: smscontent }).subscribe(() => {}, () => {});
  }

  goBack() {
    this.router.navigate(['/Language']);
  }

  sla() {
    this.setLoading(true);
    this.service.AverageWaitTime({ ServiceId: this.SelectedServicesID }).subscribe(
      (data) => { this.setLoading(false); this.AverageWait = data; },
      () => { this.setLoading(false); }
    );
  }

  crossSelling(serviceid: any, mobilenumber: any, data: any) {
    this.setLoading(true);
    this.service.GetServiceVisitCount({ ServiceId: serviceid, MobileNumber: mobilenumber }).subscribe(
      (data1: any) => {
        if (Array.isArray(data1) && data1.length > 0 && data1[0].VisitCount) {
          this.service.SmsCaptionByServiceId({
            ServiceId: this.SelectedServicesID,
            ThresholdCount: data1[0].VisitCount,
            LaguageID: this.LanguageId,
          }).subscribe(
            (data2: any) => {
              this.setLoading(false);
              this.crossSellingtext = data2?.Table?.[0]?.SmsCaption || '';
              this.sendWhatApp(data, mobilenumber);
            },
            () => { this.setLoading(false); this.sendWhatApp(data, mobilenumber); }
          );
        } else {
          this.setLoading(false);
          this.sendWhatApp(data, mobilenumber);
        }
      },
      () => { this.setLoading(false); this.sendWhatApp(data, mobilenumber); }
    );
  }

  onchange() {
    this.stopSpeechAndVideo();
    if (this.form4.get('MobileNumber')?.value?.length === 10) {
      this.speakText('Please Press Get Token.');
    }
  }

  dragging = false;
  offset   = { x: 0, y: 0 };

  startDrag(event: MouseEvent) {
    this.dragging = true;
    const el = event.target as HTMLElement;
    this.offset = { x: event.clientX - el.getBoundingClientRect().left, y: event.clientY - el.getBoundingClientRect().top };
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.stopDrag);
  }

  onDrag = (event: MouseEvent) => {
    if (!this.dragging) return;
    const siriCircle = document.querySelector('.siri-circles') as HTMLElement;
    siriCircle.style.left  = `${event.clientX - this.offset.x}px`;
    siriCircle.style.top   = `${event.clientY - this.offset.y}px`;
    siriCircle.style.right = 'auto';
  };

  stopDrag = (event: MouseEvent) => {
    this.dragging = false;
    const siriCircle = document.querySelector('.siri-circles') as HTMLElement;
    if (event.clientX < window.innerWidth / 2) {
      siriCircle.style.left = '0px'; siriCircle.style.right = 'auto';
    } else {
      siriCircle.style.right = '0px'; siriCircle.style.left = 'auto';
    }
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
  };

  printToken(tokendata: any) {
    const styles = `
      @page { size: 80mm 130mm; margin: 0; }
      .receipt { width: 80mm; margin: 0 auto; padding: 1px; }
      .black-and-white { filter: grayscale(100%); }
      .receipt-details { margin-top:0; border: 2px solid #ddd; padding: 2px; margin-bottom:0; }
      .text-center { text-align: center; margin: 0; font-size:14px; }
      .d-flex { display: flex; justify-content: space-between; margin: 0; padding: 0; }
      .text-left, .text-right { text-align: left; margin: 0; padding: 0; font-size:8px; line-height: 1; }
      .abcv { font-size: 3rem; font-weight: bolder; margin-bottom: 0; margin-top:-10px !important; }
      img { width: 50%; height: auto; }
      h2, h1, h3, h5 { margin: 0; }
      .textAlignment, .textAlign { margin: 0; }
      .textAlign { font-size:10px; }
    `;
    const html = `<!DOCTYPE html><html><head><style>${styles}</style></head>
    <body><div class="receipt"><div class="receipt-details">
      <div class="text-center"><img src="../../assets/images/logo.png" alt="logo" class="black-and-white"></div>
      <div class="d-flex"><div>${new Date().toLocaleDateString()}</div><div>${new Date().toLocaleTimeString()}</div></div>
      <div class="text-center"><h2>${this.BranchName || 'Branch Name'}</h2></div>
      <div class="text-center">
        <div>${this.getValueForCaption('TokenNo') || 'Token NO'}</div>
        <p class="abcv">${tokendata || '12345'}</p>
      </div>
      <div class="text-center"><h3>${this.SelectedService.ServiceCaption}</h3></div>
      <div class="text-center">
        <div>${this.getValueForCaption('YouWillBeAttendedInApprox')} ${this.AverageWait || 'N/A'} ${this.getValueForCaption('Minutes')}</div>
        <h5><b>${this.getValueForCaption('PleaseWaitForYourTurn')}</b></h5>
        <h3><b>${this.getValueForCaption('ThankYou')}</b></h3>
      </div>
    </div></div></body></html>`;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:absolute;width:0;height:0';
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) { doc.open(); doc.write(html); doc.close(); }
    iframe.onload = () => { iframe.contentWindow?.print(); setTimeout(() => document.body.removeChild(iframe), 1000); };
  }

  resetFormHeroService() {
    clearTimeout(this.timeoutGT);
    hideModalHeroServices();
    this.form4.reset();
    this.submitted4     = false;
    this.tokenData      = [];
    this.showToken      = false;
    this.errorMessageMP = '';
    this.errorMessageHS = '';
  }

  resetFormChangePin(): void {
    this.stopSpeechAndVideo();
    clearTimeout(this.timeoutGT);
    this.form4.reset();
    this.submitted4     = false;
    this.tokenData      = [];
    this.showToken      = false;
    this.errorMessageMP = '';
    this.errorMessageHS = '';
    if (this.router.url === '/Home') {
      this.router.navigate(['/Homes']);
    } else if (this.router.url === '/Homes') {
      this.router.navigate(['/Home']);
    }
  }

  speakText(text: string) {
    if (this.isSound !== true || this.isSpeakerOn !== true) return;
    const synth = window.speechSynthesis;
    const video = this.siriVideo.nativeElement;
    const speak = () => {
      const voices     = synth.getVoices();
      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('female') ||
        (v.lang === 'en-US' && v.name.toLowerCase().includes('google us english'))
      );
      const utterance    = new SpeechSynthesisUtterance(text);
      utterance.voice    = femaleVoice || voices[0];
      utterance.lang     = 'en-US';
      utterance.rate     = 1;
      utterance.onstart  = () => video?.play().catch(() => {});
      utterance.onend    = () => { video?.pause(); video.currentTime = 0; };
      synth.speak(utterance);
    };
    synth.getVoices().length === 0 ? (synth.onvoiceschanged = speak) : speak();
  }

  stopSpeechAndVideo() {
    if (this.isSound !== true) return;
    window.speechSynthesis?.cancel();
    const video = this.siriVideo?.nativeElement;
    if (video) { video.pause(); video.currentTime = 0; }
  }
}