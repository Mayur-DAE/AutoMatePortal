import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { AppConfig } from 'src/app/config/app-config';

declare function showFirstModalCP(): any;
declare function hideFirstModalCP(): any;

// TPA
declare function showTPAPopupModal(): any;
declare function hideTPAPopupModal(): any;
declare function showQRModal(): any;

// Feedback
declare function showFModalFb(): any;
declare function hideFModalFb(): any;
declare function showSecondModalFb(): any;
declare function hideSecondModalFb(): any;

// Hero Service
declare function showopenModalHeroServices(): any;
declare function hideModalHeroServices(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('siriVideo') siriVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('siriContainer') siriContainer!: ElementRef<HTMLDivElement>;

  Subtitle = "";
  isParent: boolean | undefined = false;
  isSound: boolean | undefined = true;
  isSpeakerOn: boolean = true;
  showSpinner: boolean = false
  logo: any;
  captions: any;
  labelValues: { [key: string]: string } = {};

  // Active Form Groups
  form4: FormGroup;  
  FeedbackRadio: FormGroup;
  feedbackForm!: FormGroup;
  emojiRating = new FormControl('', Validators.required);

  // Variables for Token & Services
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

  // TPA Modal message
  showTPAMessage: boolean = false;
  showEligibilityMessage: boolean = false;
  showEligibilityNoMessage = false;

  // Feedback variables
  FeedbackActive: any;
  FeedbackResponse: any;
  showSuggetion1 = false;
  ShowFeedbackdiv1 = true;
  showSuggetionDiv1 = false;

  // Error & Status Variables
  errorMessageMP: any;
  errorMessageHS: any;
  errorMessageFB: any;
  submitted4 = false;

  private timeoutGT: any;
  branchDetails: any;
  crossSellingtext: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private appConfig: AppConfig,
    private router: Router,
    private formBuilder: FormBuilder,
    private formBuilder4: FormBuilder,
    private formbuilderHeroService: FormBuilder,
    private fb: FormBuilder,
    private service: SharedService,
    private route: ActivatedRoute
  ) {
    this.isSound = appConfig.isSound;
    this.logo = 'assets/images/tower-logo-white-black.png';

    this.form4 = this.formBuilder4.group({
      MobileNumber: ['', [Validators.required]],
    });

    this.FeedbackRadio = this.formBuilder.group({
      transactionTypeFS: ['Feedback', Validators.required],
    });

    this.createForm();
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
    this.service.isparent.subscribe(isParent => {
      this.isParent = isParent;
    });
    this.service.setIsParent(false);

    this.service.isSpeakerOn.subscribe((isSpeakerOn) => {
      this.isSpeakerOn = isSpeakerOn;
    });
    this.LanguageId = localStorage.getItem('LanguageId');
    this.BranchID = localStorage.getItem('BranchId');

    let val = {
      LanguageId: this.LanguageId,
    };
    
    // Function To Get Branch Details
    this.getBranchDetails({ BranchId: this.BranchID });

    this.service.GetCaption(val).subscribe((data) => {
      this.captions = data;
      this.captions.forEach((item: any) => {
        this.labelValues[item.Caption] = item.Value;
      });
    });

    this.getParentServices();
    this.playAudioAndAnimate();
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
    if (this.Services && this.Services.length == 2) {
      this.speakText('Please Select Language.');
    } else {
      this.speakText('Please Select Service.');
    }
  }

  getBranchDetails(BranchId: any) {
    this.service.BranchDetails(BranchId).subscribe(
      (data) => {
        this.branchDetails = data.Table[0];
        if (this.branchDetails) {
          this.BranchName = this.branchDetails.BranchName;
        }
      },
      (error) => {
        // error handling handled at interceptor/parent level 
      }
    );
  }

  getValueForCaption(caption: string): string {
    return this.labelValues[caption] || '';
  }

  getParentServices() {
    let val = {
      ParentService: '',
      IsBack: true,
      BranchID: this.BranchID,
      LaguageID: this.LanguageId,
    };

    this.service.GetChildServices(val).subscribe((data) => {
      if (data['Body']['GetChildServicesResult']['GetChildServices']['Service']) {
        this.showLanguage = false;
        var Services = data['Body']['GetChildServicesResult']['GetChildServices']['Service'];
        this.Services = this.modifyPropertyNames(Services);
        this.updateServices();
      }
    });
  }

  getChildServices() {
    let val = {
      ParentService: this.SelectedServices,
      IsBack: false,
      BranchID: this.BranchID,
      LaguageID: this.LanguageId,
    };

    this.service.GetChildServices(val).subscribe((data) => {
      if (data['Body']['GetChildServicesResult']['GetChildServices']['Service']) {
        this.service.setIsParent(true);
        this.showLanguage = false;
        var Services = data['Body']['GetChildServicesResult']['GetChildServices']['Service'];
        this.Services = this.modifyPropertyNames(Services);
        this.speakText('Please Select Service.');
        this.updateServices();
      }
    });
  }

  modifyPropertyNames(data: any): any[] {
    const transform = (item: any): any => {
      if (Array.isArray(item)) {
        return item.map((i) => transform(i));
      } else if (typeof item === 'object' && item !== null) {
        const newItem: { [key: string]: any } = {};
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            const newKey = key.replace('@', '');
            newItem[newKey] = transform(item[key]);
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
    this.SelectedService = service;
    this.SelectedServices = service.ServiceName;
    this.SelectedServicesID = service.ServiceId;
    this.SelectedServiceCaption = service.ServiceCaption;

    if (service.IsGroup == 'True') {
      this.getChildServices();
    } else if (service.ServiceName == 'TPA') {
      this.showTPAMessage = false;
      this.showEligibilityMessage = false;
      this.showEligibilityNoMessage = false;
      showTPAPopupModal();
      this.speakText('TPA. Please continue.');
    } else {
      this.SelectedService = service;
      showFirstModalCP(); // Get Token
      const serviceName = this.SelectedService?.ServiceCaption || 'GetToken';
      this.speakText(`${serviceName}. Please enter your Phone number.`);
    }
  }

  onTPAYes() {
    this.showTPAMessage = false;
    this.showEligibilityNoMessage = false;
    this.showEligibilityMessage = true;
  }

  onTPANo() {
    this.showEligibilityMessage = false;
    this.showEligibilityNoMessage = false;
    this.showTPAMessage = true;
  }

  onEligibilityNo() {
    this.showTPAMessage = false;
    this.showEligibilityMessage = false;
    this.showEligibilityNoMessage = true;
  }

  onEligibilityYes() {
    this.showEligibilityMessage = false;
    this.showTPAMessage = false;
    this.showEligibilityNoMessage = false;
    hideTPAPopupModal();
    showFirstModalCP();
    this.speakText('Please enter your Phone number.');
  }

  updateServices() {
    let HomeServices = this.Services;
    this.service.changeHomeServices(HomeServices);
  }

  GenerateTokenCP() {
    this.submitted4 = true;
    if (this.form4.invalid) {
      return;
    }
    this.generateToken(this.SelectedService);
    this.sla();
  }

  DontHaveMobile() {
    this.generateToken(this.SelectedService);
    this.form4.value.MobileNumber = '';
  }

  generateToken(service: any) {
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: '',
      MsIsdnNo: '',
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    };

    this.service.GetTokenNo(val).subscribe(
      (data) => {
        if (data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo']['@TokenNo']) {
          this.tokenData = data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo']['@TokenNo'];
          
          if (this.form4.value.MobileNumber) {
            const token = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
            const smscontent = "Welcome to Hinduja Hospital. Your Token No is " + token + " Thank You."
            this.sendSms(smscontent);
          }

          this.generateTokenID(this.SelectedService);
          this.currentDate = new Date();
          this.showToken = true;
          if (this.appConfig.isPrint == true) {
            this.printToken(this.tokenData);
          }
          this.FeedbackStatus();

          if (this.SelectedServices == "TPA") {
            setTimeout(() => {
              hideFirstModalCP();
              showQRModal();
            }, 5000);
          }

          setTimeout(() => {
            if (this.FeedbackActive === 'True') {
              showFModalFb();
            }
          }, 5000);
        }
        this.triggerTimeoutGT();
      },
      (error) => {
        this.errorMessageMP = 'Something went wrong. Try again later';
      }
    );
  }

  triggerTimeoutGT() {
    this.timeoutGT = setTimeout(() => {
      hideFirstModalCP();
      this.resetFormChangePin();
    }, 5000);
  }

  generateTokenID(service: any) {
    let val: any = {
      TokenNo: this.tokenData,
      ServiceId: this.SelectedServicesID,
    };
    this.service.GetTokenId(val).subscribe((data) => {
      this.dataList = data;
      this.TokenId = this.dataList['Table'][0]['TokenId'];
      this.SelectedTokenID = service.TokenId;
    });
  }

  updateToken(TokenId: any) {
    let val: any = {
      TokenNo: this.tokenData,
      TokenId: TokenId,
      StatusId: 128,
      CounterId: this.CounterId,
      UserId: this.UserID,
      BranchId: this.BranchID,
      TimeRequired: 100,
    };
    this.service.UpdateTokenNo(val).subscribe((data) => {
      if (data) { }
    });
  }

  sendWhatApp(Token: any, Number?: any) {
    const formattedDate1 = new Date(new Date().setHours(new Date().getHours())).toLocaleString();
    const formattedDate = new Date(new Date().setHours(new Date().getHours() + 1)).toLocaleString();
    let message = this.getValueForCaption('WhatsappSms');
    let values = {
      BranchName: this.BranchName || 'Branch Name',
      formattedDate1,
      Token,
      SelectedServices: this.SelectedServices || 'Service',
      formattedDate,
      crossSellingtext: this.crossSellingtext || 'You are eligible for a life time free international credit card, please contact the bank for more details.',
    };

    type TemplateKeys = keyof typeof values;

    for (const key of Object.keys(values) as TemplateKeys[]) {
      const regex = new RegExp(`#${key}`, 'g');
      message = message.replace(regex, values[key]);
    }

    const val = {
      to: Number ? Number : this.form4.value.MobileNumber,
      message: `${message}`,
    };

    this.service.SetWhatsapp(val).subscribe((data) => {
      this.crossSellingtext = '';
    });
  }

  sendSms(smscontent: any) {
    let val = {
      Mobile: this.form4.value.MobileNumber,
      Sms: smscontent
    };
    this.service.SetSms(val).subscribe(data => {}, error => {});
  }

  goBack() {
    this.router.navigate(['/Language']);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
      name: [''],
      emojiRating: this.emojiRating,
    });
  }

  setRating(rating: number) {
    // optional ui interaction bound to star/emoji components
  }

  SubmitRate() {
    this.SendFeedbackComplains();
    if (this.feedbackForm.valid) {
      this.SendFeedbackComplains();
    } else {
      this.markFormGroupTouched(this.feedbackForm);
    }
  }

  SubmitRate1() {
    if (this.feedbackForm.valid) {
      this.showSuggetion1 = true;
      this.SendFeedbackComplains1();
    } else {
      this.markFormGroupTouched1(this.feedbackForm);
    }
  }

  resetFeedback() {
    this.feedbackForm.reset();
    this.FeedbackRadio.reset();
    this.FeedbackRadio.patchValue({
      transactionTypeFS: 'Feedback',
    });
    this.ShowFeedbackdiv1 = true;
    this.showSuggetionDiv1 = false;
    this.showSuggetion1 = false;
  }

  private SendFeedbackComplains() {
    var val4 = {
      Name: '',
      BranchID: this.BranchID,
      Details: '',
      Type: this.FeedbackRadio.value.transactionTypeFS,
      Rating: this.feedbackForm.value.emojiRating,
    };

    this.service.SendFeedback(val4).subscribe(
      (data) => {
        this.dataList = data;
        this.FeedbackResponse = this.dataList['status_code'];
        if (this.FeedbackResponse == 100) {
          hideFModalFb();
          showSecondModalFb();
        } else {
          alert('invalid form');
        }
      },
      (error) => {
        this.errorMessageFB = 'Something went wrong. Try again later';
      }
    );
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private SendFeedbackComplains1() {
    var val5 = {
      Name: this.feedbackForm.value.name,
      BranchID: this.BranchID,
      Details: this.feedbackForm.value.feedback,
      Type: this.FeedbackRadio.value.transactionTypeFS,
      Rating: this.feedbackForm.value.emojiRating,
    };

    this.service.SendFeedback(val5).subscribe((data) => {
      this.dataList = data;
      this.FeedbackResponse = this.dataList['status_code'];
      if (this.FeedbackResponse == 100) {
        // Form response success
      } else {
        alert('invalid form');
      }
    });
  }

  markFormGroupTouched1(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched1(control);
      }
    });
  }

  handleRadioButtonClick3(value: string) {
    if (value === 'Feedback') {
      this.showSuggetionDiv1 = false;
      this.ShowFeedbackdiv1 = true;
    } else {
      this.showSuggetionDiv1 = false;
      this.ShowFeedbackdiv1 = false;
    }
  }

  handleRadioButtonClick4(value: string) {
    if (value === 'Suggetion') {
      this.ShowFeedbackdiv1 = false;
      this.showSuggetionDiv1 = true;
    } else {
      this.ShowFeedbackdiv1 = false;
      this.showSuggetionDiv1 = false;
    }
  }

  sla() {
    let val: any = {
      ServiceId: this.SelectedServicesID,
    };
    this.service.AverageWaitTime(val).subscribe((data) => {
      this.AverageWait = data;
    });
  }

  FeedbackStatus() {
    let val: any = {
      BranchId: this.BranchID,
    };
    this.service.IsFeeedbackActive(val).subscribe((data) => {
      this.FeedbackActive = data;
    });
  }

  printToken(tokendata: any) {
    const TokenNo = this.getValueForCaption('TokenNo');
    const SelectedServicecaption = this.SelectedService.ServiceCaption;
    const logoPath = '../../assets/images/logo.png';
    const waitforturn = this.getValueForCaption('YouWillBeAttendedInApprox');
    const mintue = this.getValueForCaption('Minutes');
    const pleasewaitforturn = this.getValueForCaption('PleaseWaitForYourTurn');
    const thankyou = this.getValueForCaption('ThankYou');
    const styles = `
     @page { size: 80mm 130mm; margin: 0; }
     .receipt { width: 80mm; margin: 0 auto; padding: 1px; }
     .black-and-white { filter: grayscale(100%); }
     .receipt-details { margin-top:0; border: 2px solid #ddd; padding: 2px ; margin-bottom:0; }
     .text-center { text-align: center; margin: 0 ; font-size:14px; }
     .ma{ margin-bottom:3px; }
     .pa{ margin-bottom:4px; margin-top:-10px !important; }
     .d-flex { display: flex; justify-content: space-between; margin: 0 ; padding: 0; }
     .text-left, .text-right { text-align: left; margin: 0 ; padding: 0; font-size:8px; line-height: 1; }
     .abcv { font-size: 3rem; font-weight: bolder; margin-bottom: 0; margin-top:-10px !important; }
     img { width: 50%; height: auto; }
     h2, h1, h3 ,h5{ margin: 0; }
     .textAlignment, .textAlign { margin: 0; }
     .textAlign{ font-size:10px }
     .mt{ margin-top:5px; margin-bottom:2px; }
    `;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${styles}</style>
    </head>
    <body>
      <div class="receipt">
        <div class="receipt-details">
          <div class="text-center">
            <img src="${logoPath}" alt="logo" class="black-and-white">
          </div>
          <div class="d-flex">
            <div>${new Date().toLocaleDateString()}</div>
            <div>${new Date().toLocaleTimeString()}</div>
          </div>
          <div class="text-center">
            <h2>${this.BranchName || 'Branch Name'}</h2>
          </div>
          <div class="text-center">
            <div>${TokenNo || 'Token NO'}</div>
            <p class="abcv">${tokendata || '12345'}</p>
          </div>
          <div class="text-center">
            <h3>${SelectedServicecaption}</h3>
          </div>
          <div class="text-center">
            <div>${waitforturn || 'You Will Be Attended In Approx'} ${this.AverageWait || 'N/A'} ${mintue || 'minutes'}</div>
            <h5><b>${pleasewaitforturn || 'Please Wait For Your Turn'}</b></h5>
            <h3><b>${thankyou}</b></h3>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(html);
      iframeDoc.close();
    }

    iframe.onload = () => {
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    };
  }

  resetFormHeroService() {
    clearTimeout(this.timeoutGT);    
    hideModalHeroServices();
    this.form4.reset();
    this.submitted4 = false;
    this.tokenData = [];
    this.showToken = false;
    this.errorMessageMP = '';
    this.errorMessageHS = '';
  }

  resetFormChangePin(): void {
    this.stopSpeechAndVideo();
    clearTimeout(this.timeoutGT);
    this.form4.reset();
    this.submitted4 = false;
    this.tokenData = [];
    this.showToken = false;
    this.errorMessageMP = '';
    this.errorMessageHS = '';
    if (this.router.url == '/Home') {
      this.router.navigate(['/Homes']);
    } else if (this.router.url == '/Homes') {
      this.router.navigate(['/Home']);
    }
  }

  crossSelling(serviceid: any, mobilenumber: any, data: any) {
    const val = {
      ServiceId: serviceid,
      MobileNumber: mobilenumber,
    };
    this.service.GetServiceVisitCount(val).subscribe((data1) => {
      if (Array.isArray(data1) && data1.length > 0 && data1[0].VisitCount) {
        const val2 = {
          ServiceId: this.SelectedServicesID,
          ThresholdCount: data1[0].VisitCount,
          LaguageID: this.LanguageId,
        };
        this.service.SmsCaptionByServiceId(val2).subscribe((data2) => {
          if (data2.Table[0].SmsCaption) {
            this.crossSellingtext = data2.Table[0].SmsCaption;
            this.sendWhatApp(data, mobilenumber);
          }
        });
      } else {
        this.sendWhatApp(data, mobilenumber);
      }
    });
  }

  onchange() {
    this.stopSpeechAndVideo();
    const MobileNumberGT = this.form4.get('MobileNumber')?.value;
    if (MobileNumberGT?.length === 10) {
      this.speakText('Please Press Get Token.');
    }
  }

  dragging = false;
  offset = { x: 0, y: 0 };
  startDrag(event: MouseEvent) {
    this.dragging = true;
    const element = event.target as HTMLElement;
    this.offset = {
      x: event.clientX - element.getBoundingClientRect().left,
      y: event.clientY - element.getBoundingClientRect().top,
    };
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.stopDrag);
  }

  onDrag = (event: MouseEvent) => {
    if (!this.dragging) return;
    const siriCircle = document.querySelector('.siri-circles') as HTMLElement;
    siriCircle.style.left = `${event.clientX - this.offset.x}px`;
    siriCircle.style.top = `${event.clientY - this.offset.y}px`;
    siriCircle.style.right = 'auto';
  };

  stopDrag = (event: MouseEvent) => {
    this.dragging = false;
    const siriCircle = document.querySelector('.siri-circles') as HTMLElement;
    const dropX = event.clientX;
    const screenMiddle = window.innerWidth / 2;
    if (dropX < screenMiddle) {
      siriCircle.style.left = `0px`;
      siriCircle.style.right = 'auto';
    } else {
      siriCircle.style.right = `0px`;
      siriCircle.style.left = 'auto';
    }
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
  };

  speakText(text: string) {
    if (this.isSound === true) {
      if (this.isSpeakerOn === true) {
        const synth = window.speechSynthesis;
        const video: HTMLVideoElement = this.siriVideo.nativeElement;
        const speak = () => {
          const voices = synth?.getVoices();
          const femaleVoice = voices.find(
            (voice) =>
              voice.name.toLowerCase().includes('zira') ||
              voice.name.toLowerCase().includes('samantha') ||
              voice.name.toLowerCase().includes('female') ||
              (voice.lang === 'en-US' && voice.name.toLowerCase().includes('google us english'))
          );
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.voice = femaleVoice || voices[0];
          utterance.lang = 'en-US';
          utterance.rate = 1;
          utterance.onstart = () => {
            video?.play().catch((error) => {
              console.error('Video play failed:', error);
            });
          };
          utterance.onend = () => {
            video?.pause();
            video.currentTime = 0;
          };
          synth?.speak(utterance);
        };
        if (synth.getVoices().length === 0) {
          synth.onvoiceschanged = () => speak();
        } else {
          speak();
        }
      }
    }
  }

  stopSpeechAndVideo() {
    if (this.isSound === true) {
      const cancel = window.speechSynthesis;
      cancel?.cancel();
      const video = this.siriVideo?.nativeElement;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }
}