import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  Renderer2,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  Directive,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  FormControl,
  NgControl,
} from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs';
import SignaturePad from 'signature_pad';
import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/config/app-config';
import { jwtDecode } from 'jwt-decode';

declare function showModal(): any;
declare function showSecondModal(): any;
declare function hideFModal(): any;
declare function hideSecondModal(): any;
declare function hideFirstModalFT(): any;
declare function showSecondModalFT(): any;
declare function hideSecondModalFT(): any;
declare function showThirdModalFT(): any;
declare function hideThirdModalFT(): any;
declare function showFModal(): any;
declare function showFirstModal(): any;
declare function hideFirstModal(): any;
declare function showFirstModalFT(): any;
declare function showFirstModalCP(): any;
declare function hideFirstModalCP(): any;
declare function showFirstModalFeedbackComplains(): any;
declare function hideModalFeedbackComplains(): any;
declare function showFCashWModal(): any;
declare function hideFCashWModal(): any;
declare function showSecondCashWModal(): any;
declare function hideSecondCashWModal(): any;
declare function showFCashDModal(): any;
declare function hideFCashDModal(): any;

declare function showSecondCashDModal(): any;
declare function hideSecondCashDModal(): any;

declare function showNewCardOTPModal(): any;
declare function hideNewCardOTPModal(): any;

declare function showPaymentProcessModal1(): any;
declare function hidePaymentProcessModal1(): any;
declare function showPaymentProcessModal2(): any;
declare function hidePaymentProcessModal2(): any;
declare function showPaymentProcessModal3(): any;
declare function hidePaymentProcessModal3(): any;
declare function showPaymentProcessModal4(): any;

declare function showChequeProcessModal1(): any;
declare function hideChequeProcessModal1(): any;
declare function showChequeProcessModal2(): any;
declare function hideChequeProcessModal2(): any;
declare function showChequeProcessModal3(): any;
declare function hideChequeProcessModal3(): any;
declare function showChequeProcessModal4(): any;
declare function hideChequeProcessModal4(): any;

// TPA
declare function showTPAPopupModal(): any;
declare function hideTPAPopupModal(): any;

declare function showQRModal(): any;


// -----------------------------------------------airline modal ends---------------------------------------
declare function showFBillpaymentModal(): any;
declare function hideFBillpaymentModal(): any;
declare function showSecondBillpaymentModal(): any;
declare function hideSecondBillpaymentModal(): any;
declare function showThirdBillpaymentModal(): any;
declare function hideThirdBillpaymentModal(): any;
declare function showFourthBillpaymentModal(): any;
declare function hideFourthBillpaymentModal(): any;
declare function showFifthBillpaymentModal(): any;
declare function hideFifthBillpaymentModal(): any;
// ------------------------------------------------airline modal ends-----------------------------------------------
declare function showFMobileWalletModal(): any;
declare function hideFMobileWalletModal(): any;

declare function showFModalFb(): any;
declare function hideFModalFb(): any;
declare function showSecondModalFb(): any;
declare function hideSecondModalFb(): any;
declare function showFirstTelebirrModal(): any;
declare function hideFirstTelebirrModal(): any;
declare function showSecondTelebirrModal(): any;
declare function hideSecondTelebirrModal(): any;
// ------------------------------------------------------Telebirr------------------------------------
declare function showFirstTelebirrModal(): any;
declare function hideFirstTelebirrModal(): any;
declare function showSecondTelebirrModal(): any;
declare function hideSecondTelebirrModal(): any;
// ------------------------------------------------------Telebirr------------------------------------

// ------------------------------------------------------New Card------------------------------------
declare function showNewCardModal(): any;
declare function hideNewCardModal(): any;
declare function showNewCardSuceessModal(): any;
declare function hideNewCardSuceessModal(): any;
// ------------------------------------------------------New Card------------------------------------

// ------------------------------------------------------Open An Account------------------------------------
declare function showopenAnAccountModalPersonalInformation(): any;
declare function hideopenAnAccountModalPersonalInformation(): any;

declare function showopenAnAccountModalContactInformation(): any;
declare function hideopenAnAccountModalContactInformation(): any;

declare function showopenAnAccountModalFinancialInfromation(): any;
declare function hideopenAnAccountModalFinancialInfromation(): any;

declare function showopenAnAccountModalSignaturePad(): any;
declare function hideopenAnAccountModalSignaturePad(): any;

// ------------------------------------------------------Open An Account------------------------------------
//--------------------------------------hero Service---------------------------------------------
declare function showopenAnAccountDailogueModal(): any;
declare function hideopenAnAccountDailogueModal(): any;

declare function showopenModalHeroServices(): any;
declare function hideModalHeroServices(): any;
//-----------------------------------------hero service------------------------------------------
declare function showblockCardmModel(): any;
declare function hideblockCardmModel(): any;

declare function showchangePinModal(): any;
declare function hidechangePinModal(): any;
declare function showsetPinModal(): any;
declare function hidesetPinModal(): any;

declare function CashDepost2(): any;
declare function hideCashDepost2(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // @ViewChild('SelectLanguage') SelectLanguage!: ElementRef<HTMLAudioElement>;
  @ViewChild('siriVideo') siriVideo!: ElementRef<HTMLVideoElement>;
  // @ViewChild('siriAudioservice') siriAudioservice!: ElementRef<HTMLVideoElement>;
  // @ViewChild('siriAudiocashdeposit') siriAudiocashdeposit!: ElementRef<HTMLVideoElement>;
  // @ViewChild('phonePromptAudio') phonePromptAudio!: ElementRef;
  // @ViewChild('next') next!: ElementRef;
  // @ViewChild('depositor') depositor!: ElementRef;
  // @ViewChild('Amount') Amountsiri!: ElementRef;
  // @ViewChild('submitaudio') submitaudio!: ElementRef;
  @ViewChild('siriContainer') siriContainer!: ElementRef<HTMLDivElement>;
  // @ViewChild('Statement') siriStatement!: ElementRef<HTMLAudioElement>;
  // @ViewChild('accountnumber') siriaccountnumber!: ElementRef<HTMLAudioElement>;
  // @ViewChild('GetName') siriGetName!: ElementRef<HTMLAudioElement>;

  // @ViewChild('fundtransfer') sirifundtransfer!: ElementRef<HTMLAudioElement>;
  // @ViewChild('Name') siriName!: ElementRef<HTMLAudioElement>;
  Subtitle = "";
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  isParent: boolean | undefined = false;
  cardFullWidth: boolean = false;
  processing = false;
  showManually = false;
  isButtonManually = true;
  ShowOR = true;
  changeresultmesssage: any;
  isProcessing = false;
  resultMessage: string | null = null;
  isCameraOn = false;
  isImage = false;
  showEnterpin = false;
  Otpform = false;
  showThank: boolean = false;
  isButton = true;
  isSound: boolean | undefined = true;
  crossSellingtext: any;
  typingTimeout: any;
  isSpeakerOn: boolean = true;
  signatureNeeded!: boolean;
  signatureNeededCashDeposit = false;
  signaturePad!: SignaturePad;
  signaturePadCashDeposit!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  @ViewChild('cashDepositCanvas') cashDepositCanvasEl!: ElementRef;
  signatureImg!: string;
  showOTPchangepin = false;
  showThankYouOnly = false;
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.signaturePadCashDeposit = new SignaturePad(
      this.cashDepositCanvasEl.nativeElement
    );

  }
  logo: any;
  isFieldsDisabled: boolean = true;



  constructor(
    private cdr: ChangeDetectorRef,
    private appConfig: AppConfig,
    private router: Router,
    private formBuilder: FormBuilder,
    private formBuilderPersonalInformation: FormBuilder,
    private formBuilderContactInformation: FormBuilder,
    private formBuilderFinancialInformation: FormBuilder,
    private formBuilderFT: FormBuilder,
    private formBuilderFTOTP: FormBuilder,
    private formBuilderft2: FormBuilder,
    private formBuilderft4: FormBuilder,
    private formBuilderAL: FormBuilder,
    private formBuilderTB1: FormBuilder,
    private formBuilderTB4: FormBuilder,
    private formBuilder2: FormBuilder,
    private formBuilder3: FormBuilder,
    private formBuilder4: FormBuilder,
    private formBuilder5: FormBuilder,
    private formBuilder2ndCW: FormBuilder,
    private formBuilderCD3: FormBuilder,
    private formBuilderNewCard: FormBuilder,
    private formBuilderCD: FormBuilder,
    private formBuilder15Account: FormBuilder,
    private formBuilder15: FormBuilder,
    private formBuilder6: FormBuilder,
    private formBuilder7: FormBuilder,
    private formBuilderCPOTP: FormBuilder,
    private formBuilder8: FormBuilder,
    private formBuilder11: FormBuilder,
    private formBuilder12: FormBuilder,
    private formBuilder13: FormBuilder,
    private fb: FormBuilder,
    private ALAccSumm: FormBuilder,
    private formbuilderHeroService: FormBuilder,
    private formbuilderDebitcard: FormBuilder,
    private service: SharedService,
    private Blockcardfb: FormBuilder,
    private formBuilderchangepin: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.isSound = appConfig.isSound;
    this.createForm();
    this.logo = 'assets/images/tower-logo-white-black.png';
    this.blockCardForm = this.Blockcardfb.group({
      accountNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{13}$/)],
      ],
    });

    this.formBLradio = this.fb.group({
      transactionType2: ['Cash', Validators.required],
    });

    this.form16 = this.fb.group({
      CustomerName2: ['', [Validators.required]],
      MobileNumberCashDeposit: ['', [Validators.required]],
      CashDepost2Amount: ['', Validators.required],
    });

    this.form8 = this.fb.group({
      criteriaValue3: ['', Validators.required],
      MobileNumber3: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
    });
  }
  private timeoutId: any;
  private timeoutCD: any;
  private timeoutFT: any;
  private timeoutGT: any;
  private timeoutAL1: any;
  private timeoutAL2: any;
  private timeoutTB1: any;
  private timeoutTB2: any;
  private timeoutMS: any;
  changepinsubmitted = false;

  // TPA Modal message
  showTPAMessage: boolean = false;
  showEligibilityMessage: boolean = false;
  showEligibilityNoMessage = false;

  otpinvalid: any = false;
  newCardError: any = false;
  AverageWait: any;
  FeedbackActive: any;
  GPriorityID = 211;
  PaymentProcessTab = '';
  BenificiaryNamePP: any = '';
  branchDetails: any;
  selectedRating: number = 0;
  dataList: any = [];
  FeedbackResponse: any;
  Language: any;
  BranchID: any;
  BranchName = '';
  TokenId: any;
  CounterId: any;
  LanguageId: any;
  UserID: any;
  Services: any;
  showLanguage = true;
  SelectedService: any;
  SelectedServices: string = '';
  SelectedServiceCaption: any;
  SelectedServicesID = '';
  SelectedTokenID = '';
  ministatementList: any[] = [];
  failureStatus: any[] = [];
  failureStatus1: boolean = false;
  failureStatus2 = false;
  CurrentBalanceAL: any;
  CurrentBalanceMS: any;
  CurrentBalanceMS2: any;
  failure: any[] = [];
  showContent = false;
  policyNumber: any = '';
  //<--payment process------------------->
  submitted11 = false;
  submitted12 = false;
  submitted13 = false;
  showPPOTP: boolean = false;
  errorMessage12: any;
  errorMessagecTB: any;
  errorMessagecTB1: any;
  errorMessagecd: any;
  errorMessagecAl1: any;
  errorMessageCW: any;
  errorMessagecW: any;
  errorMessageMP: any;
  errorMessageHS: any;
  errorMessagecW1: any;
  errorMessageFB: any;
  showPPToken: boolean = false;
  errorMessagePP7: any;
  tokenDataPP: any;
  PPotpValue: any;
  PPFirstOTP: any;
  PPSecondOTP: any;
  PPThirdOTP: any;
  PPFourthOTP: any;
  BBcriteriaValue: any;
  //<--payment process ended------------------->

  //<--chequeprocessfeilds------------------->
  MobileNumber: any = '';
  CheaqueBook: any = '';
  CheaqueLeaf: any = '';
  CheaqueBookAddress: any = '';
  showCPOTP: boolean = false;
  showOTP: boolean = false;
  showOTPAL: boolean = false;
  showOTPFT: boolean = false;
  CPFirstOTP: any;
  CPSecondOTP: any;
  CPThirdOTP: any;
  CPFourthOTP: any;
  showCPToken: boolean = false;
  CPotpValue: any;
  showLeafErrorMessage = false;
  showBookErrorMessage = false;
  errorMessageCP7: any;
  submitted7 = false;
  submitted8 = false;
  submitted9 = false;
  tokenDataCP: any;
  //<--cheque process ended------------------->

  showOTPCashWithdrawl: boolean = false;
  showOTPCashDeposit: boolean = false;
  otpValue: any;
  otpvalue: any;
  xyz: any;
  ModalTitle: any;
  showModalStatus: any;
  pinChangeMode = false;
  newPin: string = '';
  confirmPin: string = '';
  TXNREF: any;
  DATE: any;
  DESC: any;
  DRAMT: any;
  CRAMT: any;
  operand: any;
  criteriaValue: any;
  criteriaAmount: any;
  columnName: any;
  submitted = false;
  submittedFT = false;
  showSpinner: boolean = false;
  errorMessage: any;
  errorMessage5: any;
  errorMessage1: any;
  errorMessage2: any;
  errorMessage9: any;
  errorMessageAL: any;
  errorMessageAL1: any;
  errorMessageAL3: any;
  errorMessageaL: any;
  errorMessagecW2: any;
  errorMessageFT2: any;
  errorMessageFT4: any;
  errorMessagefT1: any;
  errorMessagefT2: any;
  errorMessageTB: any;
  errorMessagetB: any;
  errorMessageTB1: any;
  errorMessagetB2: any;
  errorMessageTB2: any;
  errorMessageTB3: any;

  errorMessageAL5: any;
  errorMessageAL6: any;
  errorMessageMS2: any;
  errorMessagems: any;
  errorMessagemS: any;
  errorMessageFT5: any;
  errorMessageAL2: any;
  errorMessageft: any;
  errorMessageFTA: any;
  errorMessagePNR: any;
  AirlineAmount1: any;
  AirlineNameACC: any;

  FirstOtp: any;
  SecondOtp: any;
  ThirdOtp: any;
  FourOtp: any;
  //-------------------------->
  FirstOTP: any;
  SecondOTP: any;
  ThirdOTP: any;
  FourOTP: any;
  ID: any;
  transactionData: any;
  tokenData: any;
  tokenData1: any;
  tokenData2: any;
  tokenIdforupdate: any;
  submittedMS = false;
  submitted2 = false;
  submitted3 = false;
  submittedAL = false;
  submitted4 = false;
  submitted5 = false;
  submitted2ndCW = false;
  submittedCD = false;
  submitted6 = false;
  submittedCD2 = false;
  submittedCD3 = false;
  submittedNewCard = false;
  submitted15 = false;
  submitted15Account = false;
  CreditNarrative: any;
  DebitAccount: any;
  CreditAccount: any;
  CreditAmount: any;
  dataItem: any;
  CustomerName: any;
  CustomerNameCW: any;
  CustomerNameSenderFT: any;
  NameCD: any;
  value: any;

  AmountCW: any;
  CustomerNameCD: any;
  DepositerBy: any;
  CustomerNameFT: any;
  AlCustomerNameAcc: any;
  CustomerNameALAcc: any;
  CurrentBalanceCW: any;
  CurrentBalanceFT: any;
  maskedAccountNumber: string = '';
  actualAccountNumber: string = '';
  actualMobileNumber: string = '';
  maskedMobileNumber: string = '';
  maskedAccountNumber1: string = '';
  actualAccountNumber1: string = '';
  actualMobileNumber1: string = '';
  maskedMobileNumber1: string = '';
  showToken: boolean = false;
  showToken1: boolean = false;
  showToken2: boolean = false;
  showToken3: boolean = false;
  showToken3Account: boolean = false;
  formSubmittedAirline = false;
  formsubmittedAl1 = false;
  showSuggetion1 = false;
  Verify: any;
  ShowFeedback: boolean = false;

  AmountWithdrawlorDeposit: any;
  // billPayment
  showAccountDiv = false;
  ShowCashdiv = true;
  transactionType1: string = 'Cash';
  // transactionType1: any;
  transactionType2: any;
  transactionTypeFS: any;
  transactionTypeFS2: any;
  AirlinesName: any;
  Passengername: any;
  amount: any;
  Amount: any;
  PNR: any;
  AccountID: any;
  Airlines: any;
  Passenger: any;
  AccountId: any;
  AccountIdCW: any;
  PhoneNumber: any;
  PhoneNumberformFT: any;
  lastTwoDigit: any;
  PhoneNumberformAL: any;
  selectedTransactionType1: string = '';
  selectedTransactionType2: string = '';
  selectedTransactionTypeFS: string = '';
  selectedTransactionTypeFS2: string = '';

  AirlineOrderdetail: any[] = [];
  AirlineName: any;
  AirlineAmount: any;
  AirlineAmountCash: any;
  failureStatus1AL: any;
  failureStatus2AL: any;
  // acceptTransactionDigitally: boolean = false;
  // --------------------------------------fundtransfer--------------------------------
  FirstOTPFT: any;
  SecondOTPFT: any;
  ThirdOTPFT: any;
  FourOTPFT: any;

  submittedFT2 = false;
  submittedFt2 = false;
  submittedFt3 = false;
  submittedFt4 = false;
  showFTSuccess = false;
  formSubmitted = false;
  fromAccountToAccoutError = false;

  CreditNarrativeft1: any;
  DebitAccountft1: any;
  CreditAccountft1: any;
  CreditAmountft1: any;
  transactionDataft1: any;

  // formALCash: any;
  // ----------------------------------end fund transfer----------------------------------------

  //-------------------------------------- Telebirr------------------------------------------------
  submittedTB2 = false;
  showTBSuccess = false;
  errorMessageFT3: any;
  CreditAccountTB1: any;
  MobileNumberTB1: any;
  CreditAmountTB2: any;
  submittedTB1 = false;
  CustomerNameTB1: any;
  CustomerNameTB: any;
  transactionTypeSelf: any;
  selectedtransactionTypeSelf: any;
  CurrentBalanceTB: any;
  selectedTransactionType: string = '';
  // ---------------------------------------------Telebirr end----------------------------------------------------
  CustomerNameOtherTB1: any;
  CreditAccountOtherTB: any;
  MobileNumberOtherTB1: any;
  CreditAmountTB3: any;
  CustomerNameOtherTB2: any;
  showTBSuccess1 = false;
  isParentServiceClicked: boolean = false;

  CurrentBalanceTB1: any;

  submittedTB3 = false;
  submittedTB4 = false;
  submittedTB5 = false;

  LastName: any;
  MiddleName: any;
  FirstName: any;
  Identifier: any;
  MobileNumberOtherTB: any;
  //------------------------------------------------- Telebirr Other start-----------------------------------------

  // ---------------------------------------------------- feedback start-------------------------------------------
  feedback: any;
  name: any;
  // ---------------------------------------------------------feedback end--------------------------------------------------

  // --------------------------------------------------------- Open Account -----------------------------------------------

  // Personal Information
  submittedPersonalInformation = false;

  formPersonalInformation: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    surName: new FormControl(''),
    motherName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
  });

  EnterPINform: FormGroup = new FormGroup({
    FirstPin: new FormControl(''),
    SecondPin: new FormControl(''),
    ThirdPin: new FormControl(''),
    FourPin: new FormControl(''),
  });
  EnterotpPINform: FormGroup = new FormGroup({
    FirstPin: new FormControl(''),
    SecondPin: new FormControl(''),
    ThirdPin: new FormControl(''),
    FourPin: new FormControl(''),
  });
  get fPersonalInformation(): { [key: string]: AbstractControl } {
    return this.formPersonalInformation.controls;
  }

  // Contact Information
  submittedContactInformation = false;

  formContactInformation: FormGroup = new FormGroup({
    streetAddress: new FormControl(''),
    country: new FormControl(''),
    stateProvince: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
  });

  get fContactInformation(): { [key: string]: AbstractControl } {
    return this.formContactInformation.controls;
  }

  //Financial Information
  submittedFinancialInformation = false;

  formFinancialInformation: FormGroup = new FormGroup({
    occupation: new FormControl(''),
    currency: new FormControl(''),
    initialDeposit: new FormControl(''),
    monthlyIncome: new FormControl(''),
  });

  get fFinancialInformation(): { [key: string]: AbstractControl } {
    return this.formFinancialInformation.controls;
  }

  // --------------------------------------------------------- END Open Account -----------------------------------------------

  form: FormGroup = new FormGroup({
    columnName: new FormControl(''),
    criteriaValue: new FormControl(''),
    operand: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  formFT: FormGroup = new FormGroup({
    columnName: new FormControl(''),
    criteriaValue: new FormControl(''),
    operand: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  formNC: FormGroup = new FormGroup({
    columnName: new FormControl(''),
    criteriaValue: new FormControl(''),
    operand: new FormControl(''),
  });

  formFTOTP: FormGroup = new FormGroup({
    FirstOTPFT: new FormControl(''),
    SecondOTPFT: new FormControl(''),
    ThirdOTPFT: new FormControl(''),
    FourOTPFT: new FormControl(''),
  });
  formFt2: FormGroup = new FormGroup({
    CreditAccountft1: new FormControl(''),
    // CreditAmountft1: new FormControl(''),
    // CreditNarrativeft1: new FormControl(''),
  });
  formTelebirr: FormGroup = new FormGroup({
    transactionTypeSelf: new FormControl(''),
  });
  formTelebirr1: FormGroup = new FormGroup({
    MobileNumberTB1: new FormControl(''),
    CreditAccountTB1: new FormControl(''),
  });
  formFt4: FormGroup = new FormGroup({
    CreditAmountft1: new FormControl(''),
    CreditNarrativeft1: new FormControl(''),
  });
  formTelebirr2: FormGroup = new FormGroup({
    CreditAmountTB2: new FormControl(''),
  });

  formTelebirrOther1: FormGroup = new FormGroup({
    MobileNumberOtherTB1: new FormControl(''),
    CreditAmountTB3: new FormControl(''),
    CustomerNameOtherTB2: new FormControl(''),
  });

  formTelebirrOther: FormGroup = new FormGroup({
    MobileNumberOtherTB: new FormControl(''),
    CreditAccountOtherTB: new FormControl(''),
    CustomerNameOtherTB1: new FormControl(''),
  });

  form3: FormGroup = new FormGroup({
    FirstOtp: new FormControl(''),
    SecondOtp: new FormControl(''),
    ThirdOtp: new FormControl(''),
    FourOtp: new FormControl(''),
  });

  ALOTPform: FormGroup = new FormGroup({
    ALFirstOtp: new FormControl(''),
    ALSecondOtp: new FormControl(''),
    ALThirdOtp: new FormControl(''),
    ALFourOtp: new FormControl(''),
  });

  form2: FormGroup = new FormGroup({
    CustomerName: new FormControl(''),

    CreditAmount: new FormControl(''),
    CreditAccount: new FormControl(''),
    DebitAccount: new FormControl(''),
    CreditNarrative: new FormControl(''),
  });

  form4: FormGroup = new FormGroup({
    MobileNumber: new FormControl(''),
  });

  form5: FormGroup = new FormGroup({
    AccountIdCW: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form2ndCW: FormGroup = new FormGroup({
    CustomerNameCW: new FormControl(''),
    AmountCW: new FormControl(''),
  });

  formCD3: FormGroup = new FormGroup({
    NameCD: new FormControl(''),
    AmountCD: new FormControl(''),
    name: new FormControl(''),
  });

  formNewCard: FormGroup = new FormGroup({
    NameCD: new FormControl(''),
    Otp: new FormControl(''),
    name: new FormControl(''),
    FirstOTP: new FormControl(''),
    SecondOTP: new FormControl(''),
    ThirdOTP: new FormControl(''),
    FourthOTP: new FormControl(''),
  });
  formCD: FormGroup = new FormGroup({
    AccountId: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form6: FormGroup = new FormGroup({
    FirstOTP: new FormControl(''),
    SecondOTP: new FormControl(''),
    ThirdOTP: new FormControl(''),
    FourOTP: new FormControl(''),
  });

  formCD2: FormGroup = new FormGroup({
    FirstOTPCD: new FormControl(''),
    SecondOTPCD: new FormControl(''),
    ThirdOTPCD: new FormControl(''),
    FourOTPCD: new FormControl(''),
  });

  form7: FormGroup = new FormGroup({
    criteriaValueAL: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form8: FormGroup = new FormGroup({
    CheaqueLeaf: new FormControl(''),
    CheaqueBook: new FormControl(''),
    CheaqueBookAddress: new FormControl(''),
    acceptTerms: new FormControl(''),
  });

  CPOTPform: FormGroup = new FormGroup({
    CPFirstOTP: new FormControl(''),
    CPSecondOTP: new FormControl(''),
    CPThirdOTP: new FormControl(''),
    CPFourthOTP: new FormControl(''),
  });

  form11: FormGroup = new FormGroup({
    criteriaValue: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form12: FormGroup = new FormGroup({
    PPFirstOTP: new FormControl(''),
    PPSecondOTP: new FormControl(''),
    PPThirdOTP: new FormControl(''),
    PPFourthOTP: new FormControl(''),
  });

  form13: FormGroup = new FormGroup({
    BBcriteriaValue: new FormControl(''),
    criteriaValue: new FormControl(''),
    BenificiaryNamePP: new FormControl(''),
    PPacceptTerms: new FormControl(''),
  });

  formALradio: FormGroup = new FormGroup({
    transactionType1: new FormControl(''),
  });

  form15: FormGroup = new FormGroup({
    PNR: new FormControl(''),
    CustomerName: new FormControl(''),
    AccountId: new FormControl(''),
    transactionType1: new FormControl(''),
  });

  form15Account: FormGroup = new FormGroup({
    CustomerNameALAcc: new FormControl(''),
    PNR: new FormControl(''),
  });

  formALAccount: FormGroup = new FormGroup({
    Airlines: new FormControl(''),
    PassengerName: new FormControl(''),
    amount: new FormControl(''),
    accountNumber: new FormControl(''),
  });

  formALCash: FormGroup = new FormGroup({
    amount: new FormControl(''),
    Passenger: new FormControl(''),
    AirlinesName: new FormControl(''),
  });

  HeroService: FormGroup = new FormGroup({
    HeroServicePin: new FormControl(''),
  });
  FeedbackRadio: FormGroup = new FormGroup({
    transactionTypeFS: new FormControl(''),
  });

  setpinform: FormGroup = new FormGroup({
    oldPin1: new FormControl(''),
    oldPin2: new FormControl(''),
    oldPin3: new FormControl(''),
    oldPin4: new FormControl(''),

    newPin1: new FormControl(''),
    newPin2: new FormControl(''),
    newPin3: new FormControl(''),
    newPin4: new FormControl(''),

    confirmPin1: new FormControl(''),
    confirmPin2: new FormControl(''),
    confirmPin3: new FormControl(''),
    confirmPin4: new FormControl(''),
  });
  changepinform: FormGroup = new FormGroup({
    AccountIdCW: new FormControl(''),
  });

  OTPChangePINform: FormGroup = new FormGroup({
    FirstOTP: new FormControl(''),
    SecondOTP: new FormControl(''),
    ThirdOTP: new FormControl(''),
    FourOTP: new FormControl(''),
  });
  labelValues: { [key: string]: string } = {};
  captions: any;


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
    // fuunction To Get Branch Details
    this.getBranchDetails({ BranchId: this.BranchID });

    this.service.GetCaption(val).subscribe((data) => {
      this.captions = data;
      this.captions.forEach((item: any) => {
        this.labelValues[item.Caption] = item.Value;
      });
    });

    this.getParentServices();
    this.playAudioAndAnimate();
    this.form = this.formBuilder.group({
      columnName: [''],
      criteriaValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      operand: [''],
      MobileNumber: [''],
    });

    this.formALradio = this.formBuilder.group({
      transactionType1: ['Cash', Validators.required], // Set default value to 'Cash'
    });

    this.formFT = this.formBuilderFT.group({
      columnName: [''],
      criteriaValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      operand: [''],
      MobileNumber: [''],
    });

    this.formPersonalInformation = this.formBuilderPersonalInformation.group({
      fullName: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });

    this.formContactInformation = this.formBuilderContactInformation.group({
      streetAddress: ['', [Validators.required]],
      country: [''],
      stateProvince: [''],
      city: [''],
      zipCode: [''],
    });
    this.EnterPINform = this.formbuilderDebitcard.group({
      FirstPin: ['', Validators.required],
      SecondPin: ['', Validators.required],
      ThirdPin: ['', Validators.required],
      FourPin: ['', Validators.required],
    });

    this.formFinancialInformation = this.formBuilderFinancialInformation.group({
      occupation: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      initialDeposit: ['', [Validators.required]],
      monthlyIncome: ['', [Validators.required]],
    });

    this.formNC = this.formBuilderFT.group({
      columnName: [''],
      criteriaValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      operand: [''],
    });
    this.setpinform = this.fb.group({
      oldPin1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      oldPin2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      oldPin3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      oldPin4: ['', [Validators.required, Validators.pattern('[0-9]')]],

      newPin1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      newPin2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      newPin3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      newPin4: ['', [Validators.required, Validators.pattern('[0-9]')]],

      confirmPin1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      confirmPin2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      confirmPin3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      confirmPin4: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });

    this.OTPChangePINform = this.formBuilder6.group({
      FirstOTP: ['', Validators.required],
      SecondOTP: ['', Validators.required],
      ThirdOTP: ['', Validators.required],
      FourOTP: ['', Validators.required],
    });
    this.changepinform = this.formBuilderchangepin.group({
      AccountIdCW: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
    });

    this.formFTOTP = this.formBuilderFTOTP.group({
      FirstOTPFT: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      SecondOTPFT: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{1}$')],
      ],
      ThirdOTPFT: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      FourOTPFT: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
    });
    this.formFt2 = this.formBuilderft2.group({
      CreditAccountft1: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      CustomerName: [{ value: '', disabled: true }],
      // CreditAmountft1: [{ value: '', disabled: this.isFieldsDisabled }, [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      // CreditNarrativeft1: [{ value: '', disabled: this.isFieldsDisabled }]
    });
    this.formFt4 = this.formBuilderft4.group({
      // CreditAmountft1: ['', Validators.required,{ value: '', disabled: this.isFieldsDisabled }],
      CreditAmountft1: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.min(0.01),
        ],
      ],
      CreditNarrativeft1: [{ value: '', disabled: this.isFieldsDisabled }],
    });

    this.formTelebirr = this.formBuilder.group({
      transactionTypeSelf: ['Self', Validators.required], // Set default value to 'Cash'
    });

    this.FeedbackRadio = this.formBuilder.group({
      transactionTypeFS: ['Feedback', Validators.required], // Set default value to 'Cash'
    });

    this.formTelebirr1 = this.formBuilderft2.group({
      MobileNumberTB1: [''],
      CreditAccountTB1: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      CustomerNameTB: [{ value: '', disabled: true }],
    });
    this.formTelebirr2 = this.formBuilderft4.group({
      // MobileNumberTB2: ['', [Validators.required, Validators.pattern('^09[0-9]{08}$'),Validators.minLength(10)]],
      CreditAmountTB2: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.min(0.01),
        ],
      ],
      // CreditAmountTB2: [{ value: '', disabled: this.isFieldsDisabled }, [Validators.required ]],
    });
    this.formTelebirrOther = this.formBuilderTB4.group({
      MobileNumberOtherTB: [''],
      CreditAccountOtherTB: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      CustomerNameOtherTB1: [{ value: '', disabled: true }],
    });

    this.formTelebirrOther1 = this.formBuilderTB4.group({
      MobileNumberOtherTB1: [''],
      CreditAmountTB3: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.min(0.01),
        ],
      ],
      CustomerNameOtherTB2: [{ value: '', disabled: true }],
    });
    this.form3 = this.formBuilder2.group({
      FirstOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      SecondOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      ThirdOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      FourOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
    });

    this.ALOTPform = this.formBuilderAL.group({
      ALFirstOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      ALSecondOtp: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{1}$')],
      ],
      ALThirdOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      ALFourOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
    });

    this.formALCash = this.fb.group({
      AirlinesName: [{ value: '', disabled: true }],
      Passenger: [{ value: '', disabled: true }],
      amount: [
        { value: '', disabled: true },
        [Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'), Validators.min(0.01)],
      ],
    });

    this.formALAccount = this.ALAccSumm.group({
      Airlines: [{ value: '', disabled: true }],
      amount: [
        { value: '', disabled: true },
        [Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'), Validators.min(0.01)],
      ],
      accountNumber: [{ value: '', disabled: true }],
      CustomerName: [{ value: '', disabled: true }],
      PassengerName: [{ value: '', disabled: true }],
    });
    this.HeroService = this.formbuilderHeroService.group({
      HeroServicePin: ['', [Validators.required]],
    });
    this.form2 = this.formBuilder3.group({
      CustomerName: [{ value: '', disabled: true }],
      CreditAmount: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.min(0.01),
        ],
      ],
      CreditAccount: ['', Validators.required],
      DebitAccount: ['', Validators.required],
      CreditNarrative: ['', Validators.required],
    });
    this.form4 = this.formBuilder4.group({
      MobileNumber: ['', [Validators.required]],
    });
    this.form5 = this.formBuilder5.group({
      AccountIdCW: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      MobileNumber: [''],
    });
    this.form2ndCW = this.formBuilder2ndCW.group({
      CustomerNameCW: [{ value: 'test', disabled: true }],
      AmountCW: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.min(0.01),
        ],
      ],
    });

    this.formCD3 = this.formBuilderCD3.group({
      NameCD: [{ value: 'test', disabled: true }],
      AmountCD: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.min(0.01),
        ],
      ],
      // digitalTransactionCD: [false, Validators.requiredTrue,],
      name: [{ value: '', disabled: false }],
    });

    this.formNewCard = this.formBuilderNewCard.group({
      NameCD: [{ value: 'test', disabled: true }],
      FirstOTP: ['', [Validators.required]],
      SecondOTP: ['', [Validators.required]],
      ThirdOTP: ['', [Validators.required]],
      FourthOTP: ['', [Validators.required]],
      //digitalTransactionCD: [false, Validators.requiredTrue,],
      name: [{ value: '', disabled: false }],
    });
    this.formCD = this.formBuilderCD.group({
      AccountId: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      MobileNumber: [''],
    });

    this.form6 = this.formBuilder6.group({
      FirstOTP: ['', Validators.required],
      SecondOTP: ['', Validators.required],
      ThirdOTP: ['', Validators.required],
      FourOTP: ['', Validators.required],
    });

    this.formCD2 = this.formBuilder6.group({
      FirstOTPCD: ['', Validators.required],
      SecondOTPCD: ['', Validators.required],
      ThirdOTPCD: ['', Validators.required],
      FourOTPCD: ['', Validators.required],
    });
    this.form7 = this.formBuilder7.group({
      criteriaValueAL: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      MobileNumber: [''],
    });
    this.CPOTPform = this.formBuilderCPOTP.group({
      CPFirstOTP: ['', Validators.required],
      CPSecondOTP: ['', Validators.required],
      CPThirdOTP: ['', Validators.required],
      CPFourthOTP: ['', Validators.required],
    });
    this.form8 = this.formBuilder8.group({
      CheaqueLeaf: ['', Validators.required],
      CheaqueBook: ['', Validators.required],
      CheaqueBookAddress: [''],
      acceptTerms: [false, Validators.required],
    });
    this.form11 = this.formBuilder11.group({
      criteriaValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      MobileNumber: [''],
    });
    this.form12 = this.formBuilder12.group({
      PPFirstOTP: ['', Validators.required],
      PPSecondOTP: ['', Validators.required],
      PPThirdOTP: ['', Validators.required],
      PPFourthOTP: ['', Validators.required],
    });
    this.form13 = this.formBuilder13.group({
      BBcriteriaValue: ['', Validators.required],
      criteriaValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      BenificiaryNamePP: ['', Validators.required],
      PPacceptTerms: [false, Validators.required],
    });
    this.form15 = this.formBuilder15.group({
      // PNR: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{6}$')]],
      PNR: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6}$')]],
      // CustomerName: ['',{  disabled: true }],
      CustomerName: ['', [Validators.required]],
      // accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      AccountId: [
        '',
        this.showAccountDiv
          ? [Validators.required, Validators.pattern(/^[0-9]{13}$/)]
          : [],
      ],
      transactionType1: [''],
      // digitalTransaction: [false, Validators.required],
    });

    this.form15Account = this.formBuilder15Account.group({
      // PNR: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{6}$')]],
      CustomerNameALAcc: [{ value: '', disabled: this.isFieldsDisabled }],
      PNR: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6}$')]],
      // accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      // AccountId:  ['', this.showAccountDiv ? [Validators.required, Validators.pattern(/^[0-9]{13}$/)] : []],
      // transactionType1: [''],
      // digitalTransaction: [false, Validators.required],
    });
  }

  get chnagepinf5(): { [key: string]: AbstractControl } {
    return this.changepinform.controls;
  }
  toggleAudioAndAnimate(): void {
    this.isSpeakerOn = !this.isSpeakerOn;
    this.service.setIsSpeakerOn(this.isSpeakerOn);
    this.playAudioAndAnimate();
  }

  playAudioAndAnimate(): void {
    if (this.Services.length == 2) {
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
          // Store BranchName in the variable
          this.BranchName = this.branchDetails.BranchName;
        }
        //
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  getValueForCaption(caption: string): string {
    return this.labelValues[caption] || '';
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get fFT(): { [key: string]: AbstractControl } {
    return this.formFT.controls;
  }

  get fNC(): { [key: string]: AbstractControl } {
    return this.formNC.controls;
  }
  get fT(): { [key: string]: AbstractControl } {
    return this.formFT.controls;
  }
  get fT2(): { [key: string]: AbstractControl } {
    return this.formFTOTP.controls;
  }
  get fT3(): { [key: string]: AbstractControl } {
    return this.formFt2.controls;
  }
  get fT4(): { [key: string]: AbstractControl } {
    return this.formFt4.controls;
  }
  get TB1(): { [key: string]: AbstractControl } {
    return this.formTelebirr2.controls;
  }
  get TB2(): { [key: string]: AbstractControl } {
    return this.formTelebirr1.controls;
  }
  get TB3(): { [key: string]: AbstractControl } {
    return this.formTelebirrOther.controls;
  }
  get TB4(): { [key: string]: AbstractControl } {
    return this.formTelebirrOther1.controls;
  }
  get TB5(): { [key: string]: AbstractControl } {
    return this.formTelebirrOther1.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.form2.controls;
  }
  get f3(): { [key: string]: AbstractControl } {
    return this.form3.controls;
  }
  get fAL(): { [key: string]: AbstractControl } {
    return this.ALOTPform.controls;
  }
  get f4(): { [key: string]: AbstractControl } {
    return this.form4.controls;
  }
  get f5(): { [key: string]: AbstractControl } {
    return this.form5.controls;
  }
  get f2ndCW(): { [key: string]: AbstractControl } {
    return this.form2ndCW.controls;
  }
  get fCD3(): { [key: string]: AbstractControl } {
    return this.formCD3.controls;
  }

  get fNewCard(): { [key: string]: AbstractControl } {
    return this.formNewCard.controls;
  }

  get fCD(): { [key: string]: AbstractControl } {
    return this.formCD.controls;
  }
  get f6(): { [key: string]: AbstractControl } {
    return this.form6.controls;
  }
  get fCD2(): { [key: string]: AbstractControl } {
    return this.formCD2.controls;
  }
  get f77(): { [key: string]: AbstractControl } {
    return this.form7.controls;
  }
  get f8(): { [key: string]: AbstractControl } {
    return this.form8.controls;
  }
  get f9(): { [key: string]: AbstractControl } {
    return this.CPOTPform.controls;
  }
  get f11(): { [key: string]: AbstractControl } {
    return this.form11.controls;
  }
  get f12(): { [key: string]: AbstractControl } {
    return this.form12.controls;
  }
  get f13(): { [key: string]: AbstractControl } {
    return this.form13.controls;
  }

  get f15(): { [key: string]: AbstractControl } {
    return this.form15.controls;
  }
  get f15Account(): { [key: string]: AbstractControl } {
    return this.form15Account.controls;
  }

  MSCustomerNameAcc: any;

  generateOTP() {
    this.hideInputCriteriaV('criteriaValue');
    //
    if (this.form.invalid) {
      return;
    } else {
      this.showSpinner = true;
      this.ValidatePhoneNumberMS();
    }
  }

  getMinistatementdata() {
    // this.generateToken(this.SelectedServices)
    let val: any = {
      columnName: 'ACCOUNT',
      criteriaValue: this.form.value.criteriaValue,
      operand: 'EQ',
    };
    this.ministatementList = [
      {
        TXNREF: 'TXN12345',
        DATE: '2024-12-01',
        DESC: 'Grocery Purchase',
        CRAMT: 0.0,
        DRAMT: 100.0,
      },
      {
        TXNREF: 'TXN12346',
        DATE: '2024-12-02',
        DESC: 'Salary Credit',
        CRAMT: 5000.0,
        DRAMT: 0.0,
      },
      {
        TXNREF: 'TXN12347',
        DATE: '2024-12-03',
        DESC: 'Electricity Bill Payment',
        CRAMT: 0.0,
        DRAMT: 150.0,
      },
    ];
    this.failureStatus1 = false;
    hideFModal();
    showSecondModal();

    // this.service.Ministatement(val).subscribe(data => {

    //   if (data && data["MiniStatementResponse"] && data["MiniStatementResponse"]["EMMTMINISTMTType"] && data["MiniStatementResponse"]["EMMTMINISTMTType"]["gEMMTMINISTMTDetailType"]) {
    //     this.ministatementList = data["MiniStatementResponse"]["EMMTMINISTMTType"]["gEMMTMINISTMTDetailType"]["mEMMTMINISTMTDetailType"];
    //     this.failureStatus1 = false;
    //     hideFModal();
    //     showSecondModal();
    //     //
    //   } else {
    //     const failureStatus = data["MiniStatementResponse"]["ESBStatus"]["Status"];
    //     this.failureStatus = failureStatus;
    //     this.failureStatus1 = true;
    //   }
    // }).add(() => {
    // });
  }

  getAccountBalanceMS() {
    //
    this.criteriaValue = this.form.value.criteriaValue;
    //
    let valAB: any = {
      columnName: 'ACCOUNT.NUMBER',
      criteriaValue: this.form.value.criteriaValue,
      operand: 'EQ',
    };
    this.CurrentBalanceMS = '15,534';
    // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    //
    this.CurrentBalanceMS2 = this.CurrentBalanceMS + ' USD';
    this.showSpinner = false;
    //
    // this.service.AccountBalance(valAB).subscribe(data => {
    //   //
    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    //     this.CurrentBalanceMS = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     this.CurrentBalanceMS = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    //     //
    //     this.CurrentBalanceMS2 = this.CurrentBalanceMS + " birr";
    //   } else {
    //     this.errorMessagems = 'Something went wrong. Try again later';
    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });
  }

  ValidatePhoneNumberMS() {
    let val: any = {
      AccountId: this.form.value.criteriaValue,
    };

    this.MSCustomerNameAcc = 'Maasai Spirit';
    this.MobileNumber = '0912345678';
    this.AccountId = '1234567890865';
    //
    // this.generateOTPAL2()
    // this.OTPSubmitAL()
    this.getAccountBalanceMS();
    this.getMinistatementdata();
    this.showSpinner = false;
    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.MSCustomerNameAcc = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.MobileNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
    //     //
    //     // this.generateOTPAL2()
    //     // this.OTPSubmitAL()
    //     this.getAccountBalanceMS();
    //     this.getMinistatementdata();
    //   } else {
    //     this.errorMessageMS2 = 'Invalid account number. Please enter the correct account number.';
    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessagemS = 'Something went wrong. Try again later';
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  triggerTimeoutMS() {
    this.timeoutMS = setTimeout(() => {
      hideFModal();
      hideSecondModal();
      this.resetFormAndData();
    }, 30000);
  }
  // generateOTP() {

  //   this.hideInputCriteriaV('criteriaValue');
  //   if (this.form.invalid) {
  //
  //     this.showOTP = false;
  //     return;

  //   } else {
  //
  //
  //     this.showOTP = true;
  //   }
  //   // this.showOTP=true;
  // }
  generateOTPAL() {
    this.hideInputCriteriaV('criteriaValue');
    // hideSecondBillpaymentModal();
    // showFourthBillpaymentModal();
    // this.showSpinner = false;
    // if (this.form7.invalid) {
    //   return;

    // // } else {
    this.showSpinner = true;
    this.ValidatePhoneNumberAL();
    // // }
    // this.showOTP=true;
  }

  ValidatePhoneNumberAL() {
    let val: any = {
      AccountId: this.form7.value.criteriaValueAL,
    };
    this.AlCustomerNameAcc = 'Rahul Gupta';
    this.PhoneNumberformAL = '09763426436';
    this.AccountId = '10978327544343';

    // this.generateOTPAL2()
    this.OTPSubmitAL();

    // this.getMinistatementdata();
    hideSecondBillpaymentModal();
    showFourthBillpaymentModal();
    this.showSpinner = false;

    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.AlCustomerNameAcc = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.PhoneNumberformAL = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     // this.generateOTPAL2()
    //     this.OTPSubmitAL()

    //     // this.getMinistatementdata();
    //     hideSecondBillpaymentModal();
    //     showFourthBillpaymentModal();
    //   } else {
    //     this.showSpinner = false;
    //     this.errorMessageAL3 = 'Invalid account number. Please enter the correct account number.';
    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessageaL = 'Something went wrong. Try again later';
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  // generateOTPAL() {
  //   this.hideInputCriteriaV('criteriaValue');
  //
  //   this.ValidatePhoneNumberAL();
  //   // if (this.form7.invalid) {
  //   //
  //   //   this.showOTPAL = false;
  //   //   return;

  //   // } else {
  //   //
  //   //   this.showOTPAL = true;
  //   // }

  //   // this.showOTP=true;
  // }

  // ValidatePhoneNumberAL(){
  //
  //   let val: any = {
  //     AccountId: this.form7.value.criteriaValueAL,
  //   };

  //   this.service.CustomerInfo(val).subscribe(data => {
  //
  //     if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
  //       this.AlCustomerNameAcc = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
  //       this.PhoneNumberformAL = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
  //       this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
  //
  //
  //       this.generateOTPAL2()
  //     } else {

  //     }
  //   }).add(() => {
  //     this.showSpinner = false;
  //   });

  // }

  generateOTPAL2() {
    if (this.form7.invalid) {
      this.showOTPAL = false;
      return;
    }

    if (this.PhoneNumberformAL === this.form7.value.MobileNumber) {
      this.errorMessageAL2 = '';
      this.showOTPAL = true;
    } else {
      //
      // alert("phone number is not registered with the bank");
      this.errorMessageAL2 = 'phone number is not registered with the bank';
      this.showOTPAL = false;
      // Add code for the case when phone numbers are not equal
    }
  }
  resetErrorMessageAL2() {
    this.errorMessageAL2 = '';
  }

  // generateOTPFT() {
  //   this.hideInputCriteriaV('criteriaValue');
  //
  //   this.ValidatePhoneNumberFT();
  //   // this.showOTP=true;
  // }
  // ValidatePhoneNumberFT() {
  //
  //   let val: any = {
  //     AccountId: this.formFT.value.criteriaValue,
  //   };

  //   this.service.CustomerInfo(val).subscribe(data => {
  //     //
  //     if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
  //       // this.CustomerName = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
  //       this.PhoneNumberformFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
  //       this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
  //       //
  //
  //       this.generateOTPFT2()
  //     } else {

  //     }
  //   }).add(() => {
  //     this.showSpinner = false;
  //   });

  // }

  generateOTPFT() {
    this.hideInputCriteriaV('criteriaValue');

    // if (this.formFT.invalid) {
    //   return;
    // }
    // else {
    this.ValidatePhoneNumberFT();

    // hideFirstModalFT();
    // showSecondModalFT();
    // }
    // this.showOTP=true;
  }

  //Open An Account

  openContactInformation() {
    this.submittedPersonalInformation = true;
    if (this.formPersonalInformation.invalid) {
      return;
    }

    hideopenAnAccountModalPersonalInformation();
    showopenAnAccountModalContactInformation();

    this.stopSpeechAndVideo();

    this.speakText('Please Enter Street Address.');
  }

  openFinancialInformation() {
    this.submittedContactInformation = true;

    if (this.formContactInformation.invalid) {
      return;
    }

    hideopenAnAccountModalContactInformation();
    showopenAnAccountModalFinancialInfromation();
    this.stopSpeechAndVideo();
    this.speakText('Please Enter Occupation');
  }

  openSignaturePad() {
    this.submittedFinancialInformation = true;
    this.signaturePad.clear();
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);

    if (this.formFinancialInformation.invalid) {
      return;
    }
    hideopenAnAccountModalFinancialInfromation();
    showopenAnAccountModalSignaturePad();
    this.stopSpeechAndVideo();
    this.speakText('Please provide your signature.');
  }

  BackToOpenAnAccountModalPersonalInformation() {
    showopenAnAccountModalPersonalInformation();
    hideopenAnAccountModalContactInformation();
  }

  BackToOpenAnAccountModalFinancialInformation() {
    showopenAnAccountModalContactInformation();
    hideopenAnAccountModalFinancialInfromation();
  }

  BackToOpenAnAccountModalFinancialInformation2() {
    hideopenAnAccountModalSignaturePad();
    showopenAnAccountModalFinancialInfromation();
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      //To download
      // const blob = this.base64ToBlob(base64Data);
      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(blob);
      // link.download = 'signature.png';
      // document.body.appendChild(link);
      // link.click();
      // this.signatureNeeded = false;

      const blob = this.base64ToBlob(base64Data);
      const formData = new FormData();
      formData.append('file', blob, 'signature.png');

      // this.service.UploadSignature(formData).subscribe((data) => {
      //   alert('upload api called');
      // });
      this.signatureNeeded = false;
    }
  }

  // Utility function to convert Base64 string to Blob
  base64ToBlob(base64: string) {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const buffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeString });
  }

  clearPad() {
    this.signaturePad.clear();
  }

  OpneAccountSubmit() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();

    if (!this.signatureNeeded) {
      //To download
      // const blob = this.base64ToBlob(base64Data);
      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(blob);
      // link.download = 'signature.png';
      // document.body.appendChild(link);
      // link.click();
      // this.signatureNeeded = false;

      //create Token
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

      this.service.GetTokenNo(val).subscribe((data) => {
        if (
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        ) {
          //  this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formPersonalInformation.value.phone);
          // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
          this.tokenData1 =
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo'];

          if (
            this.SelectedServicesID &&
            this.formPersonalInformation.value.phone
          ) {
            this.crossSelling(
              this.SelectedServicesID,
              this.formPersonalInformation.value.phone,
              data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
              'ServiceTokenNo'
              ]['@TokenNo']
            );
          }
          this.currentDate = Date();
          //Get TOken ID;
          let val2: any = {
            TokenNo: this.tokenData1,
            ServiceId: this.SelectedServicesID,
          };

          this.service.GetTokenId(val2).subscribe((data) => {
            this.dataList = data;
            this.TokenId = this.dataList['Table'][0]['TokenId'];
            this.SelectedTokenID = this.SelectedService.TokenId;

            let jsonUserDetails = {
              fullName: this.formPersonalInformation.value.fullName,
              surname: this.formPersonalInformation.value.surName,
              motherName: this.formPersonalInformation.value.motherName,
              email: this.formPersonalInformation.value.email,
              phone: this.formPersonalInformation.value.phone,
              sex: this.formPersonalInformation.value.gender,
              streetAddress: this.formContactInformation.value.streetAddress,
              country: this.formContactInformation.value.country,
              state: this.formContactInformation.value.stateProvince,
              city: this.formContactInformation.value.city,
              zipCode: this.formContactInformation.value.zipCode,
              occupation: this.formFinancialInformation.value.occupation,
              accountCurrency: this.formFinancialInformation.value.currency,
              initialDeposit:
                this.formFinancialInformation.value.initialDeposit,
              monthlyIncome: this.formFinancialInformation.value.monthlyIncome,
              // branch: this.branchDetails
            };

            var userDetails = {
              TokenId: this.TokenId,
              BranchId: this.BranchID,
              ServiceId: this.SelectedServicesID,
              MsIsdnNo: this.formPersonalInformation.value.phone,
              userDetails: JSON.stringify(jsonUserDetails),
            };

            // const blob = this.base64ToBlob(base64Data);
            // const photoBlob = this.base64ToBlob(this.capturedImage); // <--- captured image

            // const formData = new FormData();
            // formData.append('file', blob, this.BranchID + '-' + this.TokenId + '-signature.png');
            // formData.append('photo', photoBlob, this.BranchID + '-' + this.TokenId + '-photo.png');
            //   console.log("formData",formData);
            // Append signature if present (required)
            const formData = new FormData();

            if (!this.signaturePad.isEmpty()) {
              const signatureBlob = this.base64ToBlob(
                this.signaturePad.toDataURL()
              );
              formData.append(
                'file',
                signatureBlob,
                this.BranchID + '-' + this.TokenId + '-signature.png'
              );
            } else {
              alert('Signature is required.');
              return; // Stop submission if signature is missing
            }

            // Append photo only if it's captured and not blank (optional)
            if (this.capturedImage && !this.isBlankImage(this.capturedImage)) {
              const photoBlob = this.base64ToBlob(this.capturedImage);
              formData.append(
                'photo',
                photoBlob,
                this.BranchID + '-' + this.TokenId + '-photo.png'
              );
            } else {
              console.log(
                'Photo not captured or blank. Skipping photo upload.'
              );
            }
            this.service.UploadSignature(formData).subscribe((data) => {
              console.log('data', data);
            });
            this.signatureNeeded = false;
            this.signaturePad.clear();
            this.capturedImage = '';
            this.isPhotoCaptured = false;
            this.stopCameraACC();

            this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
            this.service.OpenAcAccount(userDetails).subscribe((data) => {
              if (data.code && data.code == 100) {
                this.showToken1 = true;
                this.sla();
                this.FeedbackStatus();
                setTimeout(() => {
                  hideopenAnAccountModalSignaturePad();
                  this.showToken1 = false;
                  if (this.FeedbackActive === 'True') {
                    showFModalFb();
                  }
                }, 5000);

                this.submittedPersonalInformation = false;
                this.submittedContactInformation = false;
                this.submittedFinancialInformation = false;
                // this.formPersonalInformation.reset();
                // this.formContactInformation.reset();
                // this.formFinancialInformation.reset();
              }
            });
          });
        }
      });
    }
  }
  isBlankImage(base64: string): boolean {
    return !base64 || base64.length < 200; // Adjust threshold if needed
  }
  stopCameraACC() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  // //New Card
  // getAccountDetails() {
  //   this.hideInputCriteriaV('criteriaValue');

  //   if (this.formNC.invalid) {
  //     return;
  //   }
  //   else {

  //     this.showSpinner = true;

  //     let val: any = {
  //       AccountId: this.formNC.value.criteriaValue,
  //     };

  //     // const value = this.formFT.get('criteriaValue')?.value;
  //     // this.form2.patchValue({ CustomerName: value });
  //     this.submittedFT2 = true;
  //     this.service.CustomerInfo(val).subscribe(data => {
  //       if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

  //         // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
  //         // this.CustomerNameSenderFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
  //         this.CustomerNameCD = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
  //         this.PhoneNumberformFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
  //         this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
  //         this.lastTwoDigit = this.PhoneNumberformFT.slice(-2);
  //         // this.MobileNumber =
  //         //Generate and Send OTP

  //         this.sendOTP(this.PhoneNumberformFT);
  //         // this.getAccountBalanceFT();
  //         this.showSpinner = false;
  //         hideNewCardModal();
  //         showNewCardOTPModal();
  //         // this.generateOTPFT2()
  //       } else {
  //         this.showSpinner = false;
  //         this.errorMessageFT4 = 'Invalid account number. Please enter the correct account number.';

  //       }
  //     },
  //       error => {
  //         this.showSpinner = false;
  //         this.errorMessagefT1 = 'Something went wrong. Try again later';

  //         console.error('An error occurred:', error);
  //         // Handle the error here, such as showing a toast message or displaying an error dialog.
  //       }
  //     ).add(() => {
  //       //  this.showSpinner = false;
  //     });
  //   }
  // }
  getAccountDetails() {
    this.hideInputCriteriaV('criteriaValue');

    if (this.formNC.invalid) {
      return;
    } else {
      this.showSpinner = true;

      let val: any = {
        AccountId: this.formNC.value.criteriaValue,
      };

      // const value = this.formFT.get('criteriaValue')?.value;
      // this.form2.patchValue({ CustomerName: value });
      this.submittedFT2 = true;
      // this.service.CustomerInfo(val).subscribe(data => {
      //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

      //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
      //     // this.CustomerNameSenderFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
      //     this.CustomerNameCD = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
      //     this.PhoneNumberformFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
      //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
      //     this.lastTwoDigit = this.PhoneNumberformFT.slice(-2);
      //     // this.MobileNumber =
      //     //Generate and Send OTP

      //     this.sendOTP(this.PhoneNumberformFT);
      //     // this.getAccountBalanceFT();
      //     this.showSpinner = false;
      //     hideNewCardModal();
      //     showNewCardOTPModal();
      //     // this.generateOTPFT2()
      //   } else {
      //     this.showSpinner = false;
      //     this.errorMessageFT4 = 'Invalid account number. Please enter the correct account number.';

      //   }
      // },
      //   error => {
      //     this.showSpinner = false;
      //     this.errorMessagefT1 = 'Something went wrong. Try again later';

      //     console.error('An error occurred:', error);
      //     // Handle the error here, such as showing a toast message or displaying an error dialog.
      //   }
      // ).add(() => {
      //   //  this.showSpinner = false;
      // });

      this.sendOTP(this.PhoneNumberformFT);
      this.formNewCard.patchValue({
        NameCD: 'Mombasa Wave',
      });
      // this.getAccountBalanceFT();
      this.showSpinner = false;
      hideNewCardModal();
      showNewCardOTPModal();
      // this.generateOTPFT2()
    }
  }

  // validateOtp() {

  //   this.submittedNewCard = true;
  //   this.newCardError = false;
  //   if (this.formNewCard.invalid) {
  //     return;
  //   }

  //   let val = {
  //     "Mobile": this.PhoneNumberformFT,
  //     "OTP": this.formNewCard.value.Otp
  //   }
  //   this.service.ValidateOTP(val).subscribe(data => {
  //     this.showSpinner = true;
  //     if (data.status_code == 100) {
  //       var CardProduct;
  //       if (this.SelectedService.ServiceName == "NewCard-AL") {
  //         CardProduct = 918;
  //       }
  //       else if (this.SelectedService.ServiceName == "NewCard-COV") {
  //         CardProduct = 900;
  //       }

  //       //Call New Card request
  //       // this.triggerTimeout1();
  //       let newCardVal = {
  //         "CardProduct": CardProduct,
  //         "AccountId": this.AccountId,
  //         "DeliveryBranchCode": "",
  //       }
  //       this.service.NewCardRequest(newCardVal).subscribe(data => {

  //         if (data && data["CardRequestResponse"] && data["CardRequestResponse"]["ESBStatus"] && data["CardRequestResponse"]["ESBStatus"]["Status"] == "Success") {
  //           hideNewCardOTPModal();
  //           showNewCardSuceessModal();
  //           this.triggerTimeoutNewCardSubmit();
  //           this.showSpinner = false;
  //         }
  //         else {
  //           this.addtokenTransactionNewCard();
  //           this.triggerTimeoutNewCard();
  //           this.showSpinner = false;
  //         }
  //       })
  //     }
  //     else {
  //       this.otpinvalid = true;
  //       this.showSpinner = false;
  //     }
  //   })
  // }
  validateOtp() {
    this.submittedNewCard = true;
    this.newCardError = false;
    if (this.formNewCard.invalid) {
      return;
    }
    // console.log("this.formNewCard",this.formNewCard.value);
    this.formNewCard.reset();
    hideNewCardOTPModal();
    showNewCardSuceessModal();
    this.triggerTimeoutNewCardSubmit();
    this.showSpinner = false;

    // let val = {
    //   "Mobile": this.PhoneNumberformFT,
    //   "OTP": this.formNewCard.value.Otp
    // }
    // this.service.ValidateOTP(val).subscribe(data => {
    //   this.showSpinner = true;
    //   if (data.status_code == 100) {
    //     var CardProduct;
    //     if (this.SelectedService.ServiceName == "NewCard-AL") {
    //       CardProduct = 918;
    //     }
    //     else if (this.SelectedService.ServiceName == "NewCard-COV") {
    //       CardProduct = 900;
    //     }

    //     //Call New Card request
    //     // this.triggerTimeout1();
    //     let newCardVal = {
    //       "CardProduct": CardProduct,
    //       "AccountId": this.AccountId,
    //       "DeliveryBranchCode": "",
    //     }
    //     this.service.NewCardRequest(newCardVal).subscribe(data => {

    //       if (data && data["CardRequestResponse"] && data["CardRequestResponse"]["ESBStatus"] && data["CardRequestResponse"]["ESBStatus"]["Status"] == "Success") {
    //         hideNewCardOTPModal();
    //         showNewCardSuceessModal();
    //         this.triggerTimeoutNewCardSubmit();
    //         this.showSpinner = false;
    //       }
    //       else {
    //         this.addtokenTransactionNewCard();
    //         this.triggerTimeoutNewCard();
    //         this.showSpinner = false;
    //       }
    //     })
    //   }
    //   else {
    //     this.otpinvalid = true;
    //     this.showSpinner = false;
    //   }
    // })
  }

  addtokenTransactionNewCard() {
    //create Token
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        );
        // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;
          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: 'New Card',
            field_2: this.AccountId,
            field_3: this.CustomerNameCD,
            field_4: this.formCD3.value.AmountCD,
            field_8: this.formCD.value.MobileNumber,
            field_12: this.formCD3.value.name,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showToken1 = true;
            this.FeedbackStatus();

            setTimeout(() => {
              if (this.FeedbackActive === 'True') {
                showFModalFb();
              }
            }, 5000);
            // this.ShowFeedback = true;
          });
        });
      }
    });
  }

  triggerTimeoutNewCard() {
    this.timeoutCD = setTimeout(() => {
      hideNewCardModal();
      hideNewCardOTPModal();
      hideNewCardSuceessModal();
      this.resetNewCard();
    }, 5000);
  }

  triggerTimeoutNewCardSubmit() {
    this.timeoutCD = setTimeout(() => {
      hideNewCardSuceessModal();
      this.resetNewCard();
    }, 5000);
  }

  resetNewCard(): void {
    clearTimeout(this.timeoutCD);
    this.errorMessagecd = '';
    this.errorMessagecd = '';
    this.formNewCard.reset();
    this.submittedNewCard = false;
    this.formFT.reset();
    this.formNC.reset();
    this.submittedFT = false;
    this.formCD.reset();
    this.formCD2.reset();
    this.formCD3.reset();
    this.submittedCD = false;
    this.submittedCD2 = false;
    this.submittedCD3 = false;
    this.AccountId = '';
    this.PhoneNumber = '';
    this.showOTPCashDeposit = false;
    this.MobileNumber = '';
    this.CustomerName = '';
    this.NameCD = '';
    (this.CustomerNameCD = ''),
      (this.name = ''),
      (this.DepositerBy = ''),
      this.OTPSubmitCD;
    (this.FirstOTP = ''),
      (this.SecondOTP = ''),
      (this.ThirdOTP = ''),
      (this.FourOTP = ''),
      (this.tokenData1 = ''),
      (this.showToken1 = false),
      (this.AmountWithdrawlorDeposit = '');
  }

  ValidatePhoneNumberFT() {
    this.showSpinner = true;
    this.speakText('Please Enter  Account Number.');

    let val: any = {
      AccountId: this.formFT.value.criteriaValue,
    };

    const value = this.formFT.get('criteriaValue')?.value;
    this.form2.patchValue({ CustomerName: value });

    this.submittedFT2 = true;
    // if (this.formFTOTP.invalid) {
    //   //
    //   this.errorMessage = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
    //   return;
    // }
    // this.showSpinner = true;
    // this.getMinistatementdata();
    this.CustomerNameSenderFT = 'Mwangi King';
    this.PhoneNumberformFT = '0943568312';
    this.AccountId = '1234123754321';

    this.getAccountBalanceFT();
    // this.service.CustomerInfo(val).subscribe(data => {
    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerNameSenderFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.PhoneNumberformFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.getAccountBalanceFT();
    //     // this.showSpinner=false;
    //     // this.generateOTPFT2()
    //   } else {
    //     this.showSpinner = false;
    //     this.errorMessageFT4 = 'Invalid account number. Please enter the correct account number.';

    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessagefT1 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   //  this.showSpinner = false;
    // });
  }

  getAccountBalanceFT() {
    //this.criteriaAmount = this.formFT.value.criteriaValue;
    this.criteriaAmount = 12323224442223;
    let valAB: any = {
      columnName: 'ACCOUNT.NUMBER',
      criteriaValue: this.formFT.value.criteriaValue,
      operand: 'EQ',
    };
    this.CurrentBalanceFT = '14,523';
    hideFirstModalFT();
    showSecondModalFT();
    this.showSpinner = false;
    // this.service.AccountBalance(valAB).subscribe(data => {

    //   if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    //     this.CurrentBalanceFT = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    //     hideFirstModalFT();
    //     showSecondModalFT();
    //     this.showSpinner = false;
    //   } else {
    //     this.errorMessagefT2 = 'Something went wrong. Try again later';
    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessagefT2 = 'Something went wrong. Try again later';
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  generateOTPFT2() {
    if (this.formFT.invalid) {
      this.showOTPFT = false;
      return;
    }

    if (this.PhoneNumberformFT === this.formFT.value.MobileNumber) {
      this.errorMessageFT2 = '';
      this.showOTPFT = true;
    } else {
      //
      // alert("phone number is not registered with the bank");
      this.errorMessageFT2 = 'phone number is not registered with the bank';
      this.showOTPFT = false;
      // Add code for the case when phone numbers are not equal
    }
  }
  resetErrorMessageFT2() {
    this.errorMessageFT2 = '';
  }

  generateOTPCashWithdrawl() {
    if (this.form5.invalid) {
      this.showOTPCashWithdrawl = false;
      return;
    } else {
      this.showOTPCashWithdrawl = true;
    }
  }

  generateOTPCashDeposit() {
    if (this.formCD.invalid) {
      this.showOTPCashDeposit = false;
      return;
    } else {
      this.showOTPCashDeposit = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }
  onSubmitFT(): void {
    this.submittedFT = true;

    if (this.formFT.invalid) {
      return;
    }
  }

  onSubmitCW(): void {
    this.submitted5 = true;
    if (this.form5.invalid) {
      return;
    }
  }

  onSubmitCD(): void {
    this.submittedCD = true;
    if (this.formCD.invalid) {
      return;
    }
  }

  // onSubmitFundTransfer(): void {
  //   this.submitted2 = true;
  //   if (this.form2.invalid) {
  //     return;
  //   }
  // }
  OnSubmitOTP(): void {
    this.submitted3 = true;
    if (this.form3.invalid) {
      // this.errorMessage = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  // OnSubmitOTPAL(): void {
  //   this.submitted7=true;

  //   if (this.form7.invalid) {
  //
  //     this.errorMessage = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
  //     return;
  //   }
  // }
  OnSubmitCashWithdrawlOTP(): void {
    this.submitted6 = true;
    if (this.form6.invalid) {
      this.errorMessage1 =
        'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  OnSubmitCashDepositOTP(): void {
    this.submittedCD2 = true;
    if (this.formCD2.invalid) {
      this.errorMessage1 =
        'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  onSubmitPC(): void {
    this.submitted4 = true;
    if (this.form4.invalid) {
      return;
    }
  }

  openModal() {
    if (this.showModalStatus == 'open-modal') {
      showModal();
    }
  }

  // hideInputCriteriaV(targetField: string) {
  //   const inputElement = document.getElementById(targetField) as HTMLInputElement;
  //   const inputValue = inputElement.value;

  //   if (inputValue.length === 13) {
  //     this.actualAccountNumber = inputValue; // Store the actual account number
  //     let maskedValue = '';
  //     for (let i = 0; i < inputValue.length - 5; i++) {
  //       maskedValue += '*';
  //     }
  //     maskedValue += inputValue.slice(-5);
  //     this.maskedAccountNumber = maskedValue; // Store the masked account number
  //     inputElement.value = maskedValue;
  //   } else {
  //     this.actualAccountNumber = ''; // Reset actualAccountNumber if not 13 digits
  //     this.maskedAccountNumber = ''; // Reset maskedAccountNumber if not 13 digits
  //   }
  // }

  hideAccountNumber: boolean = false; // Initially hide the account number

  hideInputCriteriaV(targetField: string) {
    this.hideAccountNumber = true; // Initially hide the account number
  }

  showAccountNumber: boolean = false;

  hideInputCriteria() {
    this.hideAccountNumber = !this.hideAccountNumber;
  }
  hideInputCriteria1() {
    this.hideAccountNumber = false;
  }

  realPIN: any = {}; // Store actual input values
  cashdeposit2PIN: any = {};

  handleMaskedInput(
    event: Event,
    controlName: string,
    nextInputIndex: number | null
  ): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value) {
      this.realPIN[controlName] = value; // Save real value
      this.EnterPINform.get(controlName)?.setValue('*'); // Mask with asterisk
      this.focusNextInputs1(input, nextInputIndex); // Move to next field
    }
  }

  hideInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 13) {
      this.actualAccountNumber = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedAccountNumber = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualAccountNumber = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedAccountNumber = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  hideInput2(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 10) {
      this.actualMobileNumber = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedMobileNumber = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualMobileNumber = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedMobileNumber = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  hideInput3(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 13) {
      this.actualAccountNumber1 = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedAccountNumber1 = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualAccountNumber1 = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedAccountNumber1 = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  hideInput4(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 10) {
      this.actualMobileNumber1 = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedMobileNumber1 = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualMobileNumber1 = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedMobileNumber1 = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  focusNextInputs(inputField: HTMLInputElement, nextInputIndex: number | null) {
    if (inputField.value.length === 1 && nextInputIndex !== null) {
      const nextInput = document.querySelectorAll('.otp')[
        nextInputIndex - 1
      ] as HTMLInputElement;
      nextInput.focus();
    }
  }
  focusNextInputs1(
    inputField: HTMLInputElement,
    nextInputIndex: number | null
  ) {
    if (inputField.value.length === 1 && nextInputIndex !== null) {
      const nextInput = document.querySelectorAll('.otp')[
        nextInputIndex - 1
      ] as HTMLInputElement;
      nextInput.focus();
    }
  }
  focusNextInputs2(
    inputField: HTMLInputElement,
    nextInputIndex: number | null
  ) {
    if (inputField.value.length === 1 && nextInputIndex !== null) {
      const nextInput = document.querySelectorAll('.otp')[
        nextInputIndex - 1
      ] as HTMLInputElement;
      nextInput.focus();
    }
  }
  focusNextInputsBlockCard(
    inputField: HTMLInputElement,
    nextInputIndex: number | null
  ) {
    if (inputField.value.length === 1 && nextInputIndex !== null) {
      const nextInput = document.querySelectorAll('.BlockCard')[
        nextInputIndex - 1
      ] as HTMLInputElement;
      nextInput.focus();
    }
  }
  handleBackspace(event: KeyboardEvent, inputField: HTMLInputElement) {
    if (event.key === 'Backspace' && inputField.value.length === 0) {
      const prevInput = inputField.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.value = '';
      }
    }
  }
  handleBackspaceCW(event: KeyboardEvent, inputField: HTMLInputElement) {
    if (event.key === 'Backspace' && inputField.value.length === 0) {
      const prevInput = inputField.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.value = '';
      }
    }
  }

  resetFormAndData(): void {
    clearTimeout(this.timeoutMS);
    this.errorMessagemS = '';
    this.errorMessageMS2 = '';
    this.form.reset();
    this.form3.reset();
    this.submitted = false;
    this.criteriaValue = '';
    this.MobileNumber = '';
    this.showOTP = false;
    this.otpValue = '';
    this.ministatementList = [];
    (this.FirstOtp = ''),
      (this.SecondOtp = ''),
      (this.ThirdOtp = ''),
      (this.FourOtp = '');
  }

  resetFormChangePin(): void {
    this.stopSpeechAndVideo();

    clearTimeout(this.timeoutGT);
    this.form4.reset();

    this.submitted4 = false;

    this.MobileNumber = '';
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
  resetFormHeroService() {
    clearTimeout(this.timeoutGT);
    this.HeroService.reset();
    hideModalHeroServices();
    this.form4.reset();
    this.submitted4 = false;
    this.MobileNumber = '';
    this.tokenData = [];
    this.showToken = false;
    this.errorMessageMP = '';
    this.errorMessageHS = '';
  }
  resetFormAndDataFT(): void {
    this.capturedImage = '';
    this.isPhotoCaptured = false;
    this.stopCameraACC();
    this.stopSpeechAndVideo();
    clearTimeout(this.timeoutFT);
    this.errorMessagefT1 = '';
    this.errorMessageFT5 = '';
    this.errorMessageFT4 = '';
    this.errorMessagefT2 = '';
    this.showSpinner = false;
    this.resultMessage = '';
    this.isButton = true;
    this.formFT.reset();
    this.formFt2.reset();
    this.formFt4.reset();
    this.formFTOTP.reset();
    this.submittedFT = false;
    this.criteriaValue = '';
    this.MobileNumber = '';
    this.showOTPFT = false;
    this.otpValue = '';
    (this.FirstOTPFT = ''),
      (this.SecondOTPFT = ''),
      (this.ThirdOTPFT = ''),
      (this.FourOTPFT = ''),
      this.form2.reset();
    this.CreditAmountft1 = '';

    this.CreditNarrativeft1 = '';
    this.GetNameFT;
    this.transferft2;
    this.transfer;
    this.errorMessageFTA = '';
    this.MobileNumber = '';
    this.CustomerName = '';
    (this.CreditAccount = ''), (this.CreditAmount = '');
    this.CreditNarrative = '';
    this.formFt2.reset();
    this.submittedFt3 = false;
    this.CreditAccountft1 = '';
    this.CreditNarrativeft1 = '';
    this.CreditAmountft1 = '';
    this.transactionDataft1 = [];
    this.showFTSuccess = false;
    this.submittedFt4 = false;

    this.form2.reset();
    this.submitted2 = false;
    this.CreditNarrative = '';
    this.DebitAccount = '';
    this.CreditAccount = '';
    this.CreditAmount = '';
    this.CustomerName = '';
    this.transactionData = [];
  }

  BackFT1() {
    showFirstModalFT();
    hideSecondModalFT();
    hideThirdModalFT();
  }
  BackFT2() {
    showSecondModalFT();
    hideFirstModalFT();
    hideThirdModalFT();
  }
  BackFT3() {
    showThirdModalFT();
    hideFirstModalFT();
    hideSecondModalFT();
  }

  BackNC1() {
    showNewCardModal();
    hideNewCardOTPModal();
  }

  resetFormAndDataCashWithdrawl(): void {
    this.stopSpeechAndVideo();
    this.showManually = false;
    this.cardFullWidth = false;

    this.ShowOR = true;
    this.isButtonManually = true;
    clearTimeout(this.timeoutId);
    this.errorMessagecW = '';
    this.errorMessageCW = '';
    this.form5.reset();
    this.form6.reset();
    this.EnterPINform.reset();
    this.form2ndCW.reset();
    this.form2ndCW.reset();
    this.showSpinner = false;
    this.submitted5 = false;
    this.submitted6 = false;
    this.submitted2ndCW = false;
    this.AccountId = '';
    this.resultMessage = '';
    this.isButton = true;
    this.showEnterpin = false;
    this.MobileNumber = '';
    this.errorMessage9 = '';
    this.showOTPCashWithdrawl = false;
    this.CustomerName = '';
    this.CustomerNameCW = '';
    this.AmountCW = '';
    this.errorMessagecW2 = '';
    this.FirstOTP = '';
    this.SecondOTP = '';
    this.ThirdOTP = '';
    this.FourOTP = '';
    this.tokenData1 = '';
    this.showToken1 = false;
    this.showThank = false;
    this.onSubmitCW;

    this.AmountWithdrawlorDeposit = '';

    console.log('showThankreset', this.showThank);
  }

  resetFormAndDataCashDeposit(): void {
    this.stopSpeechAndVideo();

    clearTimeout(this.timeoutCD);
    this.errorMessagecd = '';
    this.errorMessagecd = '';
    this.formCD.reset();
    this.formCD2.reset();
    this.formCD3.reset();
    this.submittedCD = false;
    this.submittedCD2 = false;
    this.submittedCD3 = false;
    this.AccountId = '';
    this.PhoneNumber = '';
    this.showOTPCashDeposit = false;
    this.MobileNumber = '';
    this.CustomerName = '';
    this.NameCD = '';
    (this.CustomerNameCD = ''),
      (this.name = ''),
      (this.DepositerBy = ''),
      this.OTPSubmitCD;
    (this.FirstOTP = ''),
      (this.SecondOTP = ''),
      (this.ThirdOTP = ''),
      (this.FourOTP = ''),
      (this.tokenData1 = ''),
      (this.showToken1 = false),
      (this.AmountWithdrawlorDeposit = '');
  }

  BackCD1() {
    showFCashDModal();
    hideSecondCashDModal();
  }
  //   resetBillPayment() {

  //   this.form15.reset(),
  //     this.form7.reset(),
  //     this.ALOTPform.reset(),
  //     this.form15Account.reset(),
  //     this.formALradio.reset(),
  //     this.showSpinner=false;
  //     this.submitted15 = false,
  //     this.submitted15Account = false,
  //     this.submitted7 = false,

  //     this.PNR = '',
  //     this.CustomerName = '',
  //     this.AlCustomerNameAcc='',
  //     this.CustomerNameALAcc='',
  //     this.AccountId = '',
  //     this.tokenData2 = '',
  //     this.showAccountDiv = false,
  //     this.showToken3 = false,
  //     this.formALradio.patchValue({
  //       transactionType1: 'Cash'
  //     });
  //           // this.selectedTransactionType1 = ''
  //   this.errorMessage5 = '',
  //     this.errorMessageAL = '',

  //     this.ShowCashdiv = true,
  //     this.showOTPAL = false,
  //     this.showToken3 = false,
  //     this.formSubmittedAirline = false,
  //     this.showToken3Account = false,
  //     this.formsubmittedAl1 = false,
  //     this.showAccountDiv = false;
  //     this.generateOTPAL

  // }
  resetBillPayment() {
    this.stopSpeechAndVideo();

    clearTimeout(this.timeoutAL1);
    clearTimeout(this.timeoutAL2);
    this.errorMessageaL = '';
    this.errorMessageAL6 = '';
    this.errorMessageAL1 = '';
    this.AirlineNameACC = '';
    this.AirlineAmount1 = '';
    this.AirlineAmountCash = '';
    this.AirlineName = '';
    this.formALCash.reset(), (this.errorMessagePNR = '');
    this.errorMessageAL3 = '';

    this.form15.reset(),
      this.form7.reset(),
      this.ALOTPform.reset(),
      this.form15Account.reset(),
      this.formALradio.reset(),
      (this.showSpinner = false);
    (this.submitted15 = false),
      (this.submitted15Account = false),
      (this.submitted7 = false),
      (this.PNR = ''),
      (this.CustomerName = ''),
      (this.AlCustomerNameAcc = ''),
      (this.CustomerNameALAcc = ''),
      (this.AccountId = ''),
      (this.tokenData2 = ''),
      (this.showAccountDiv = false),
      (this.showToken3 = false),
      this.formALradio.patchValue({ transactionType1: 'Cash' });

    // this.selectedTransactionType1 = ''
    (this.errorMessage5 = ''),
      (this.errorMessageAL = ''),
      (this.ShowCashdiv = true),
      (this.showOTPAL = false),
      (this.showToken3 = false),
      (this.formSubmittedAirline = false),
      (this.showToken3Account = false),
      (this.formsubmittedAl1 = false),
      (this.showAccountDiv = false);
    this.generateOTPAL;
    this.Airlines = '';
    this.Passenger = '';
    this.amount = '';
    this.AirlineAmount = '';
    this.AirlineName = '';
  }
  BackAirlineCash1() {
    showSecondBillpaymentModal();
    hideThirdBillpaymentModal();
  }

  BackAirlineAccount1() {
    showSecondBillpaymentModal();
    hideFourthBillpaymentModal();
  }

  BackAirlineAccount2() {
    // this.errorMessageAL1='';
    showFourthBillpaymentModal();
    hideFifthBillpaymentModal();
  }

  resetFormAndDataTB(): void {
    this.stopSpeechAndVideo();

    clearTimeout(this.timeoutTB1);
    clearTimeout(this.timeoutTB2);
    this.errorMessageTB3 = '';
    this.errorMessagetB2 = '';
    this.errorMessagetB = '';
    this.errorMessageTB2 = '';
    this.formTelebirrOther.reset();
    this.formTelebirrOther1.reset();
    this.errorMessageTB = '';
    this.errorMessageTB1 = '';
    this.submittedTB3 = false;

    this.MobileNumberOtherTB1 = '';
    this.CustomerNameOtherTB2 = '';
    this.CreditAmountTB3 = '';
    this.CreditAccountTB1 = '';
    this.MobileNumberTB1 = '';
    this.CustomerNameOtherTB1 = '';
    this.formTelebirr.reset();
    this.formTelebirr1.reset();
    this.CreditAccountTB1 = '';
    this.MobileNumberTB1 = '';
    this.CreditAmountTB2 = '';
    this.CustomerName = '';
    this.CustomerNameTB = '';
    this.GetNameTB;
    this.GetNameOtherTB;
    this.showTBSuccess = false;
    this.isFieldsDisabled = true;
    this.submittedTB5 = false;
    this.submittedTB1 = false;
    this.submittedTB4 = false;

    this.showTBSuccess1 = false;
    this.submittedTB2 = false;
    // this.transactionTypeSelf = 'Self',

    this.formTelebirr.patchValue({
      transactionTypeSelf: 'Self',
    });
    // this.selectedtransactionTypeSelf = ''
    this.formTelebirr2.reset();
    this.CreditAmountTB2 = '';
    this.CreditAmountTB2 = '';

    this.CustomerNameTB1 = '';
    this.errorMessageFT3 = '';
    this.ShowSelfdiv1 = true;
    this.showOtherDiv = false;
  }
  BackTeleBirrOther1() {
    hideSecondTelebirrModal();
    showFirstTelebirrModal();
  }
  transfer() {
    this.showSpinner = false;
    this.MobileNumber = this.formFT.value.MobileNumber;

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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        //this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formFT.value.MobileNumber, this.formFT.value.MobileNumber);
        // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];
        if (this.SelectedServicesID && this.formFT.value.MobileNumber) {
          this.crossSelling(
            this.SelectedServicesID,
            this.formFT.value.MobileNumber,
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
        }
        this.currentDate = new Date();

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];

          this.SelectedTokenID = this.SelectedService.TokenId;

          if (this.appConfig.isPrint == true) {
            this.printToken(this.tokenData2);
          }

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,

            field_1: 'FundTransfer',
            field_2: this.formFT.value.criteriaValue,
            field_3: this.CustomerNameSenderFT,
            field_4: this.formFt4.value.CreditAmountft1,
            field_8: this.formFT.value.MobileNumber,
            field_9: this.CustomerName,
            field_10: this.formFt2.value.CreditAccountft1,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showFTSuccess = true;

            this.FeedbackStatus();

            setTimeout(() => {
              if (this.FeedbackActive === 'True') {
                showFModalFb();
              }
            }, 5000);
            // setTimeout(() => {
            //   hideThirdModalFT();
            //   hideSecondModalFT();
            //   hideFirstModalFT();
            //   this.resetFormAndDataFT();
            // }, 10000);
            this.triggerTimeoutFT();
          });
        });
      }
    });
  }
  triggerTimeoutFT() {
    this.timeoutFT = setTimeout(() => {
      hideThirdModalFT();
      hideSecondModalFT();
      hideFirstModalFT();
      this.resetFormAndDataFT();
    }, 5000);
  }

  transferft2() {
    this.submittedFt4 = true;

    if (this.formFt2.invalid && this.formFt4.invalid) {
      return;
    }

    const creditAccountValue = this.formFt2.get('CreditAccountft1')?.value;
    const creditAmountValue = this.formFt4.get('CreditAmountft1')?.value;
    const creditNarrativeValue = this.formFt4.get('CreditNarrativeft1')?.value;

    // Patch values to form2
    this.form2.patchValue({ CreditAccount: creditAccountValue });
    this.form2.patchValue({ CreditAmount: creditAmountValue });
    this.form2.patchValue({ CreditNarrative: creditNarrativeValue });
    // hideSecondModalFT();
    // showThirdModalFT();

    this.formSubmitted = true;
    const currentBalanceInt = parseInt(
      this.CurrentBalanceFT.replace(/,/g, '').split('.')[0]
    );

    if (currentBalanceInt >= this.formFt4.value.CreditAmountft1) {
      hideSecondModalFT();
      showThirdModalFT();
      this.speakText('Please Enter Account Number Or Submit.');

      return;
    } else {
      this.errorMessageFTA = this.getValueForCaption(
        'Amountisgreaterthanthecurrentbalance'
      );
    }
  }

  OTPSubmit() {
    this.OnSubmitOTP();
    if (this.form3.invalid) {
      //
      this.errorMessage = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
      return;
    }

    this.showSpinner = true;
    this.getMinistatementdata();
    hideFModal();
    showSecondModal();
  }

  DontHaveMobile() {
    this.generateToken(this.SelectedService);
    this.form4.value.MobileNumber = '';
  }

  OTPSubmitAL() {
    const value = this.form7.get('criteriaValueAL')?.value;
    this.formALAccount.patchValue({ accountNumber: value });
    // this.OnSubmitOTPAL();
    this.submittedAL = true;
    this.formsubmittedAl1 = true;

    // if (this.ALOTPform.invalid) {
    //
    //   this.errorMessageAL = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
    //   return;
    // }
    //
    // this.getMinistatementdata();
    // hideSecondBillpaymentModal();
    // showFourthBillpaymentModal();
  }

  OTPSubmitFT() {
    const value = this.formFT.get('criteriaValue')?.value;
    this.form2.patchValue({ CustomerName: value });

    this.submittedFT2 = true;
    if (this.formFTOTP.invalid) {
      //
      this.errorMessage = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
      return;
    }
    // this.showSpinner = true;
    // this.getMinistatementdata();
    hideFirstModalFT();
    showSecondModalFT();
    this.getAccountBalanceFT();
  }
  GetNameTB() {
    //  this.submittedTB2 = true;

    //   if (this.formTelebirr1.invalid) {
    //     return;
    //   }
    this.showSpinner = true;
    this.getAccountBalanceTB();
  }

  getCustomerinfoTB() {
    let val: any = {
      AccountId: this.formTelebirr1.value.CreditAccountTB1,
    };
    this.CustomerNameTB = 'Brijesh';
    this.AccountId = '1234567890123';
    this.isFieldsDisabled = false;
    this.showSpinner = false;
    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerNameTB = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.isFieldsDisabled = false;
    //     if (typeof this.CustomerName === 'undefined') {
    //       this.errorMessageTB = '';
    //       console.error("Error: CustomerName is undefined. Please provide a valid customer name.");
    //       this.errorMessage = "wrong account number"
    //     }
    //     else {
    //       this.errorMessageTB = '';
    //       this.errorMessage = '';
    //       this.isFieldsDisabled = false;
    //     }
    //     //

    //   } else {

    //     this.errorMessageTB = 'Invalid account number. Please enter the correct account number.';

    //     this.isFieldsDisabled = true;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;

    //   }
    // },
    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagetB = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  GetNameOtherTB() {
    // // this.submittedTB3 = true;
    // // // this.getAccountBalanceTB();

    // // if (this.formTelebirrOther.invalid) {

    // //   return;

    // // }

    this.showSpinner = true;

    let val: any = {
      AccountId: this.formTelebirrOther.value.CreditAccountOtherTB,
    };
    this.CustomerNameOtherTB1 = 'Murtaza';
    this.AccountId = '0987654321321';
    this.isFieldsDisabled = false;
    this.showSpinner = false;
    this.getAccountBalanceTB();
    this.stopSpeechAndVideo();
    this.speakText('Please Press Next.');

    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    // //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    // //     this.CustomerNameOtherTB1 = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    // //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    // //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.isFieldsDisabled = false;
    //     this.isFieldsDisabled = false;

    //     this.getAccountBalanceTB();
    //     if (typeof this.CustomerName === 'undefined') {
    //       this.errorMessageTB1 = '';
    //     this.getAccountBalanceTB();
    //     if (typeof this.CustomerName === 'undefined') {
    //       this.errorMessageTB1 = '';

    //       console.error("Error: CustomerName is undefined. Please provide a valid customer name.");
    //       this.errorMessage = "wrong account number"
    //     }
    //     else {
    //       this.errorMessageTB1 = '';
    //       this.errorMessage = '';
    //       this.isFieldsDisabled = false;
    //     }
    //     //
    //       console.error("Error: CustomerName is undefined. Please provide a valid customer name.");
    //       this.errorMessage = "wrong account number"
    //     }
    //     else {
    //       this.errorMessageTB1 = '';
    //       this.errorMessage = '';
    //       this.isFieldsDisabled = false;
    //     }
    //     //

    //   } else {
    //   } else {

    //     this.errorMessageTB1 = 'Invalid account number. Please enter the correct account number.';
    //     this.errorMessageTB1 = 'Invalid account number. Please enter the correct account number.';

    //     this.isFieldsDisabled = true;
    //     this.isFieldsDisabled = true;

    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;

    //   }
    // },
    //   error => {
    //   }
    // },
    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagetB2 = 'Something went wrong. Try again later';
    //     this.showSpinner = false;
    //     this.errorMessagetB2 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }).add(() => {
    //     this.showSpinner = false;
    //   });
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }).add(() => {
    //     this.showSpinner = false;
    //   });
  }

  GetNameFT() {
    this.fromAccountToAccoutError = false;
    this.showSpinner = true;

    this.submittedFt3 = true;
    // this.showSpinner = true;

    if (this.formFt2.invalid) {
      this.showSpinner = false;
      return;
    }

    if (
      this.formFt2.value.CreditAccountft1 == this.formFT.value.criteriaValue
    ) {
      this.fromAccountToAccoutError = true;
      this.errorMessageFT5 = false;
      this.showSpinner = false;
      return;
    }

    this.CustomerName = 'Nairobi Dreamer';
    // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    this.AccountId = 1234567890124;
    let val: any = {
      AccountId: this.formFt2.value.CreditAccountft1,
    };
    this.showSpinner = false;
    this.errorMessageFT5 = '';
    this.errorMessage = '';
    this.isFieldsDisabled = false;
    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerName = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     if (typeof this.CustomerName === 'undefined') {

    //       console.error("Error: CustomerName is undefined. Please provide a valid customer name.");
    //       this.errorMessage = "wrong account number"
    //     } else {
    //       this.errorMessageFT5 = '';
    //       this.errorMessage = '';
    //       this.isFieldsDisabled = false;
    //     }
    //     //

    //   } else {
    //     this.errorMessageFT5 = 'Invalid account number. Please enter the correct account number.';

    //     this.isFieldsDisabled = true;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;

    //     // this.showSpinner = false;

    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });
    this.speakText('Please Enter Amount.');
  }

  GetNameOtherTB1() {
    this.submittedTB4 = true;
    this.getAccountBalanceTB1();
    this.speakText('Please Enter amount.');

    this.showSpinner = true;

    let val: any = {
      Identifier: this.formTelebirrOther1.value.MobileNumberOtherTB1,
    };
    this.FirstName = 'Vijay';
    this.MiddleName = 'Avdhut';
    this.LastName = 'wakle';
    this.formTelebirrOther1.patchValue({
      CustomerNameOtherTB2: `${this.FirstName} ${this.MiddleName} ${this.LastName}`,
    });
    this.showSpinner = false;
    //  this.isFieldsDisabled = true;
    // this.service.TelebirrName(val).subscribe(data => {

    //   if (data["CustomerBriefInfoResponse"] && data["CustomerBriefInfoResponse"]["KYCData"] && data["CustomerBriefInfoResponse"]["KYCData"]) {
    //   if (data["CustomerBriefInfoResponse"] && data["CustomerBriefInfoResponse"]["KYCData"] && data["CustomerBriefInfoResponse"]["KYCData"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.FirstName = data["CustomerBriefInfoResponse"]["KYCData"]["KYC Documents to be Uploaded Business License"];
    //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.MiddleName = data["CustomerBriefInfoResponse"]["KYCData"]["accounKYC Customer Additional Info Apply Visa Pan FlagtId"];
    //     this.LastName = data["CustomerBriefInfoResponse"]["KYCData"]["accounKYC Customer Additional Info Apply Visa Pan FlagtId"];

    //     //

    //   } else {
    //     this.errorMessageTB2 = 'Invalid Phone Number. Please enter the correct Phone number.';
    //   } else {
    //     this.errorMessageTB2 = 'Invalid Phone Number. Please enter the correct Phone number.';

    //     this.isFieldsDisabled = true;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;
    //     this.isFieldsDisabled = true;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;

    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });
    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });
  }

  OTPSubmit1() {
    // this.OnSubmitCashWithdrawlOTP();
    // if (this.form5.invalid) {
    //   // this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
    //   return;
    // }

    this.showSpinner = true;
    this.getCustomerinfo();

    console.log('showThanknerxt', this.showThank);

    // hideFCashWModal();
    // showSecondCashWModal();
    // this.showSpinner=false;
  }

  getCustomerinfo() {
    let val: any = {
      AccountId: this.form5.value.AccountIdCW,
    };
    this.CustomerNameCW = 'Mombasa Wave';
    this.AccountId = 9087654321345;
    this.getAccountBalance();

    this.speakText('Please Enter Amount.');

    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerNameCW = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.getAccountBalance();

    //     //  this.showSpinner=false;

    //   } else {
    //     this.showSpinner = false;
    //     this.errorMessageCW = 'Invalid account number. Please enter the correct account number.';

    //   }
    // },
    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagecW = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   //this.showSpinner = false;
    // });
  }

  BackCW1() {
    showFCashWModal();
    hideSecondCashWModal();
  }
  OTPSubmitCD() {
    //this.OnSubmitCashDepositOTP();
    if (this.formCD.invalid) {
      // this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';

      return;
    }

    this.showSpinner = true;
    // hideFCashDModal();
    // showSecondCashDModal();
    // this.showSpinner = false;
    this.getCustomerinfoCD();
  }

  getCustomerinfoCD() {
    let val: any = {
      AccountId: this.formCD.value.AccountId,
    };
    this.CustomerNameCD = 'Tenca Climbero';
    this.AccountId = 1234567890345;
    this.showSpinner = false;
    hideFCashDModal();
    showSecondCashDModal();
    this.speakText('Please Enter depositor Name.');

    this.errorMessagecd = '';

    // this.service.CustomerInfo(val).subscribe(
    //   data => {
    //     if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //       this.CustomerNameCD = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //       this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //       hideFCashDModal();
    //       showSecondCashDModal();
    //       this.errorMessagecd = '';
    //     } else {
    //       this.errorMessagecd = 'Invalid account number. Please enter the correct account number.';
    //     }
    //   },
    //   error => {

    //     this.errorMessagecd = 'Something went wrong. Try again later';
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  // PaymentProcessmodal --------------------------------------------------------------------------------------------------->

  onSubmitPP(): void {
    this.submitted11 = true;
    if (this.form11.invalid) {
      return;
    }
  }

  onSubmitPP2(): void {
    this.submitted13 = true;
    if (this.form13.invalid) {
      return;
    }
  }

  generatePPOTP() {
    if (this.form11.invalid) {
      this.showPPOTP = false;
      return;
    } else {
      this.showPPOTP = true;
    }
  }

  PPmodel1() {
    this.form11.reset();
    this.form12.reset();
    this.form13.reset();
    this.showPPOTP = false;
    (this.PPFirstOTP = ''),
      (this.PPSecondOTP = ''),
      (this.PPThirdOTP = ''),
      (this.PPFourthOTP = '');
    this.showPPToken = false;
    this.PaymentProcessTab = 'Transfer To Other Bank';
    hidePaymentProcessModal1();
    showPaymentProcessModal2();
  }

  PPmodel2() {
    this.PaymentProcessTab = 'CPO';
    hidePaymentProcessModal1();
    showPaymentProcessModal2();
  }

  PPmodel3() {
    this.OnSubmitPPOTP();
    if (this.form12.invalid) {
      //
      this.errorMessage12 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
      return;
    }
    this.showSpinner = false;

    hidePaymentProcessModal2();
    showPaymentProcessModal3();
  }

  OnSubmitPPOTP(): void {
    this.submitted12 = true;
    if (this.form12.invalid) {
      this.errorMessage12 =
        'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  resetFormPaymentProcess(): void {
    this.form11.reset();
    this.form12.reset();
    this.form13.reset();

    this.submitted11 = false;
    this.submitted12 = false;
    this.submitted13 = false;
    this.criteriaValue = '';
    // this.BBcriteriaValue = '';
    this.MobileNumber = '';
    this.errorMessagePP7 = '';

    this.showPPOTP = false;
    this.PPotpValue = '';
    (this.PPFirstOTP = ''),
      (this.PPSecondOTP = ''),
      (this.PPThirdOTP = ''),
      (this.PPFourthOTP = '');
    this.criteriaValue = '';
    this.BBcriteriaValue = '';
    this.BenificiaryNamePP = '';
    this.showPPToken = false;
    this.tokenDataPP = '';
  }

  tokenTransactionPP() {
    if (
      this.form13 &&
      this.form13.get('criteriaValue')!.value &&
      this.form13.get('BenificiaryNamePP')!.value &&
      this.form13.get('PPacceptTerms') &&
      this.form13.get('PPacceptTerms')!.value
    ) {
      //create Token
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

      this.service.GetTokenNo(val).subscribe((data) => {
        if (
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        ) {
          // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
          this.sendWhatApp(
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
          this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
          this.tokenDataPP =
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo'];

          //Get TOken ID;
          let val2: any = {
            TokenNo: this.tokenDataPP,
            ServiceId: this.SelectedServicesID,
          };

          this.service.GetTokenId(val2).subscribe((data) => {
            this.dataList = data;

            this.TokenId = this.dataList['Table'][0]['TokenId'];
            this.SelectedTokenID = this.SelectedService.TokenId;

            var val3 = {
              ServiceId: this.SelectedServicesID,
              BranchId: this.BranchID,
              TokenId: this.TokenId,
              field_1: this.PaymentProcessTab,
              field_2: this.actualAccountNumber,
              field_3: this.form13.value.BenificiaryNamePP,
              field_4: 1000,
              field_8: 'Abyssina Bank',
              field_9: this.CustomerName,
            };

            this.service.AddtokenTransaction(val3).subscribe((data) => {
              this.showPPToken = true;
              // showChequeProcessModal4();
            });
          });
        }
      });
    } else {
      this.errorMessagePP7 =
        'required fields are empty, or checkbox not checked.';
    }
  }

  //payment process ended------------------------------------------------------------------------------------------------------->

  //cheque process modal------------------------------------------------------------------------------------------------------------

  onSubmitCP(): void {
    this.submitted7 = true;
    if (this.form7.invalid) {
      return;
    }
  }

  resetFormChequeProcess3(): void {
    this.form8.reset();
    this.form7.reset();
    this.CPOTPform.reset();
    this.submitted7 = false;
    this.submitted9 = false;
    this.criteriaValue = '';
    this.MobileNumber = '';
    this.errorMessageCP7 = '';
    this.showCPOTP = false;
    this.CPotpValue = '';
    (this.CPFirstOTP = ''),
      (this.CPSecondOTP = ''),
      (this.CPThirdOTP = ''),
      (this.CPFourthOTP = '');
    this.CheaqueLeaf = '';
    this.CheaqueBook = '';
    this.CheaqueBookAddress = '';
    this.showCPToken = false;
    this.tokenDataCP = '';
  }

  OnSubmitCPOTP(): void {
    this.submitted9 = true;
    if (this.CPOTPform.invalid) {
      this.errorMessage2 =
        'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  generateCPOTP() {
    if (this.form7.invalid) {
      this.showCPOTP = false;
      return;
    } else {
      this.showCPOTP = true;
    }
  }

  CPModal3() {
    this.OnSubmitCPOTP();
    if (this.CPOTPform.invalid) {
      this.errorMessage2 =
        'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
      return;
    }
    this.showSpinner = false;

    hideChequeProcessModal2();
    showChequeProcessModal3();
  }
  CPModal2() {
    // this.OnSubmitCashWithdrawlOTP();
    // if (this.form6.invalid) {
    //   this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
    //   return;
    // }
    // this.showSpinner = true;

    // this.getCustomerinfo();
    this.form7.reset();
    this.form8.reset();
    this.CPOTPform.reset();

    this.showCPOTP = false;
    (this.CPFirstOTP = ''),
      (this.CPSecondOTP = ''),
      (this.CPThirdOTP = ''),
      (this.CPFourthOTP = '');
    this.showCPToken = false;
    hideChequeProcessModal1();
    showChequeProcessModal2();
  }
  CPModal4() {
    // this.OnSubmitCashWithdrawlOTP();
    // if (this.form6.invalid) {
    //   this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
    //   return;
    // }
    // this.showSpinner = true;

    // this.getCustomerinfo();
    hideChequeProcessModal3();
    showChequeProcessModal4();
    // this.resetFormChequeProcess3();
  }

  GenerateTokenCP() {
    // this.onSubmitPC();
    // this.submitted4 = true;
    // if (this.form4.invalid) {
    //   return;
    // }
    this.MobileNumber = this.form4.value.MobileNumber;
    this.generateToken(this.SelectedService);
    this.sla();

  }

  validatePin() {
    if (this.HeroService.value.HeroServicePin === this.appConfig.pin) {
      //this.generateToken(this.SelectedService);

      this.getChildServices();
      this.isParentServiceClicked = true;
      hideModalHeroServices();
    } else {
      this.errorMessageHS = 'Enter Valid Pin';
    }
  }

  //   printToken(tokendata:any) {
  //     const logoPath = 'assets/images/bsic.png'; // Use a relative path or Base64 string as needed.
  //     const styles = `
  //     @page {
  //       size: 80mm 78mm; /* Define the page size: 80mm width and 100mm height */
  //       margin: 0; /* Remove default page margins */
  //     }
  //       .receipt {
  //   /*border: 2px solid #000; */
  //   width: 80mm;

  //   margin: 0 auto;
  //   padding: 1px;

  // }
  //   .black-and-white {
  //   filter: grayscale(100%);
  // }
  // .receipt-details {
  // margin-top:0;
  //   border: 2px solid #ddd;
  //   padding: 2px ;
  //   margin-bottom:0;
  // }
  // .text-center {
  //   text-align: center;
  //   margin: 0 ;
  //   font-size:14px;
  // }
  //   .ma{
  //   margin-bottom:3px;
  //   }
  //   .pa{
  //    margin-bottom:4px;
  //    margin-top:-10px !important;
  //   }
  // .d-flex {
  //   display: flex;
  //   justify-content: space-between;
  //   margin: 0 ;
  //   padding: 0; /* Ensure no padding */
  // }
  // .text-left,
  // .text-right {
  //   text-align: left;
  //   margin: 0 ;
  //   padding: 0; /* Ensure no padding */
  //   font-size:8px;
  //    line-height: 1; /* Reduce line height */
  // }
  // .abcv {
  //   font-size: 3rem;
  //   font-weight: bolder;
  //   //font-family: 'WF Visual Sans, sans-serif';
  //   margin-bottom: 0; /* Reduced bottom margin */
  //      margin-top:-10px !important;
  // }
  // img {
  //   max-width: 50%; /* Ensure the logo fits within 80mm */
  //   height: auto;
  // }
  // h2, h1, h3 {
  //   margin: 0; /* Reduced spacing for headings */
  // }
  // .textAlignment, .textAlign {
  //   margin: 0; /* Reduced spacing for these elements */
  // }
  //   .textAlign{
  //   font-size:10px
  //   }
  //   .mt{
  //   margin-top:5px;
  //   margin-bottom:2px;
  //   }

  //     `;

  //     const html = `
  //       <!DOCTYPE html>
  //       <html>
  //       <head>

  //         <style>
  //           html { padding: 0; margin: 0; }
  //           body { margin: 0; width: 80mm;    font-family: Helvetica !important; } /* Ensure the body width is 80mm */
  //           ${styles}
  //         </style>
  //       </head>
  //       <body>
  //         <div class="receipt">
  //           <div class="receipt-details">
  //             <div class="text-center">
  //               <img id="logo" src="${this.logo}" alt="TowerSacco logo" class="black-and-white">
  //             </div>
  //             <div class="d-flex">
  //               <div class="text-left" id="date">${new Date().toLocaleDateString()}</div>
  //               <div class="text-right d-inline-block" id="time">${new Date().toLocaleTimeString()}</div>
  //             </div>

  //             <div class="text-center ma">
  //               <h2>${this.BranchName || 'Branch Name'}</h2>
  //             </div>
  //             <div class="text-center mt">
  //               <div class="textAlignment mt">Token No</div>
  //               <p class="  abcv">${ tokendata || '12345'}</p>
  //             </div>
  //              <div class="text-center pa " style="margin-bottom:4px">
  //               <h3>${this.SelectedServices || 'Service Name'}</h3>
  //             </div>
  //             <div class="text-center ma">
  //               <div class="textAlign " style="margin-bottom:4px">You will be attended in approx. ${this.AverageWait} minutes</div>
  //               <h5 style="margin-top:-1px"><b>Please wait for your turn.</b></h5>
  //               <h3 style="margin-top:-15px"><b>Thank You.</b></h3>
  //             </div>
  //           </div>
  //         </div>
  //       </body>
  //       </html>
  //     `;

  //     // Create a hidden iframe
  //     const iframe = document.createElement('iframe');
  //     iframe.style.position = 'absolute';
  //     iframe.style.width = '0';
  //     iframe.style.height = '0';
  //     iframe.style.border = '0';
  //     document.body.appendChild(iframe);

  //     // Write content to the iframe
  //     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  //     if (iframeDoc) {
  //       iframeDoc.open();
  //       iframeDoc.write(html);
  //       iframeDoc.close();
  //     }

  //     // Print the iframe content
  //     iframe.contentWindow?.focus();
  //     iframe.contentWindow?.print();
  //     // Remove the iframe after printing
  //     setTimeout(() => {
  //       document.body.removeChild(iframe);
  //     }, 1000);
  //   }
  printToken(tokendata: any) {
    const TokenNo = this.getValueForCaption('TokenNo');
    const SelectedServicecaption = this.SelectedService.ServiceCaption;
    const logoPath = 'assets/images/bsic.png'; // Ensure the correct path
    const waitforturn = this.getValueForCaption('YouWillBeAttendedInApprox');
    const mintue = this.getValueForCaption('Minutes');
    const pleasewaitforturn = this.getValueForCaption('PleaseWaitForYourTurn');
    const thankyou = this.getValueForCaption('ThankYou');
    const styles = `
     @page {
      size: 80mm 130mm; /* Define the page size: 80mm width and 100mm height */
     margin: 0; /* Remove default page margins */
    }
      .receipt {
   /*border: 2px solid #000; */
  width: 80mm;
  
  margin: 0 auto;
     padding: 1px;
  
}
  .black-and-white {
  filter: grayscale(100%);
}
.receipt-details {
 margin-top:0;
  border: 2px solid #ddd;
  padding: 2px ;
  margin-bottom:0;
 }
 .text-center {
   text-align: center;
   margin: 0 ;
   font-size:14px;
}
   .ma{
  margin-bottom:3px;
  }
  .pa{
   margin-bottom:4px;
   margin-top:-10px !important;
  }
    .d-flex {
  display: flex;   justify-content: space-between;
   margin: 0 ;
    padding: 0; /* Ensure no padding */
}
.text-left,
.text-right {
  text-align: left;
   margin: 0 ;
  padding: 0; /* Ensure no padding */
  font-size:8px;
    line-height: 1; /* Reduce line height */
}
.abcv {
   font-size: 3rem;
   font-weight: bolder;
  //font-family: 'WF Visual Sans, sans-serif';
  margin-bottom: 0; /* Reduced bottom margin */
    margin-top:-10px !important;
}
img {
  width: 50%; /* Ensure the logo fits within 80mm */
  height: auto;
 }
   h2, h1, h3 ,h5{
   margin: 0; /* Reduced spacing for headings */
 }
 .textAlignment, .textAlign {
  margin: 0; /* Reduced spacing for these elements */
 }
   .textAlign{
      font-size:10px
  }
  .mt{
  margin-top:5px;
  margin-bottom:2px;
     }

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
            <img src="${logoPath}" alt="Bsic logo" class="black-and-white">
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
            <div>${waitforturn || 'You Will Be Attended In Approx'} ${this.AverageWait || 'N/A'
      } ${mintue || 'minutes'}</div>
            <h5><b>${pleasewaitforturn || 'Please Wait For Your Turn'}</b></h5>
            <h3><b>${thankyou}</b></h3>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

    // Create an iframe
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
  tokenTransactionCP() {
    if (
      this.form8 &&
      this.form8.get('CheaqueLeaf')!.value &&
      this.form8.get('CheaqueBook')!.value &&
      this.form8.get('acceptTerms') &&
      this.form8.get('acceptTerms')!.value
    ) {
      //create Token
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

      this.service.GetTokenNo(val).subscribe((data) => {
        if (
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        ) {
          // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
          this.sendWhatApp(
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
          this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
          this.tokenDataCP =
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo'];

          //Get TOken ID;
          let val2: any = {
            TokenNo: this.tokenDataCP,
            ServiceId: this.SelectedServicesID,
          };

          this.service.GetTokenId(val2).subscribe((data) => {
            this.dataList = data;

            this.TokenId = this.dataList['Table'][0]['TokenId'];
            this.SelectedTokenID = this.SelectedService.TokenId;

            var val3 = {
              // criteriaValue:this.actualAccountNumber,
              ServiceId: this.SelectedServicesID,
              BranchId: this.BranchID,
              TokenId: this.TokenId,
              field_1: this.selectedTransactionType,
              field_2: this.actualAccountNumber,
              field_10: this.form8.value.CheaqueLeaf,
              field_11: this.form8.value.CheaqueBook, //amount
              field_12: this.form8.value.CheaqueBookAddress,
            };

            this.service.AddtokenTransaction(val3).subscribe((data) => {
              this.showCPToken = true;
              // showChequeProcessModal4();
            });
          });
        }
      });
    } else {
      this.errorMessageCP7 =
        'required fields are empty, or checkbox not checked.';
    }
  }

  onInputChange(inputFieldName: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Limit the value to two digits
    if (inputValue.length > 2) {
      inputElement.value = inputValue.slice(0, 2);

      // Show error message based on the input field
      if (inputFieldName === 'CheaqueLeaf') {
        this.showLeafErrorMessage = true;
      } else if (inputFieldName === 'CheaqueBook') {
        this.showBookErrorMessage = true;
      }
    } else {
      // Hide error message when input is valid
      if (inputFieldName === 'CheaqueLeaf') {
        this.showLeafErrorMessage = false;
      } else if (inputFieldName === 'CheaqueBook') {
        this.showBookErrorMessage = false;
      }
    }
  }
  //cheque process ended------------------------------------------------------------------------------------------

  data2() {
    this.generateToken(this.SelectedServices);
    let val: any = {
      CreditNarrative: this.form2.value.CreditNarrative,
      DebitAccount: this.form2.value.DebitAccount,
      CreditAccount: this.form2.value.CreditAccount,
      CreditAmount: this.form2.value.CreditAmount,
    };

    this.service
      .FundTransfer(val)
      .subscribe((data) => {
        this.updateToken(this.TokenId);
        if (
          data &&
          data['FundTransferResponse'] &&
          data['FundTransferResponse']['FUNDSTRANSFERType']
        ) {
          this.transactionData =
            data['FundTransferResponse']['FUNDSTRANSFERType'];
          this.failureStatus2 = false;
        } else {
          this.failureStatus2 = true;
          const failure = data['FundTransferResponse']['ESBStatus']['Status'];
          this.failure = failure;
        }
      })
      .add(() => {
        this.showSpinner = false;
      });
  }

  getParentServices() {
    let val = {
      ParentService: '',
      IsBack: true,
      BranchID: this.BranchID,
      LaguageID: this.LanguageId,
    };

    this.service.GetChildServices(val).subscribe((data) => {
      if (
        data['Body']['GetChildServicesResult']['GetChildServices']['Service']
      ) {
        this.showLanguage = false;
        var Services =
          data['Body']['GetChildServicesResult']['GetChildServices']['Service'];
        this.Services = this.modifyPropertyNames(Services);
        const currentUrl = this.router.url;
        if (currentUrl.startsWith('/callback')) {
          this.handleCallback();
        }
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
      if (
        data['Body']['GetChildServicesResult']['GetChildServices']['Service']
      ) {
        this.service.setIsParent(true);
        this.showLanguage = false;
        var Services =
          data['Body']['GetChildServicesResult']['GetChildServices']['Service'];

        this.Services = this.modifyPropertyNames(Services);
        const currentUrl = this.router.url;
        if (currentUrl.startsWith('/callback')) {
          this.handleCallback();
        }
        this.speakText('Please Select Service.');

        this.updateServices();
      }
    });
  }

  // modifyPropertyNames(data: any[]): any[] {
  //   return data.map((item) => {
  //     const newItem: { [key: string]: any } = {};
  //     for (const key in item) {
  //       if (Object.prototype.hasOwnProperty.call(item, key)) {
  //         const newKey = key.replace('@', '');
  //         newItem[newKey] = item[key];
  //       }
  //     }
  //     return newItem;
  //   });
  // }
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
    return Array.isArray(result) ? result : [result]; // always return as array
  }
  ParentserviceClick(service: any) {
    this.SelectedService = service;
    this.SelectedServices = service.ServiceName;
    this.SelectedServicesID = service.ServiceId;

    if (service.ServiceName == 'Coop Alhuda') {
      this.getChildServices();
    } else if (service.ServiceName == 'Conventional') {
      this.getChildServices();
    } else {
      this.SelectedService = service;
    }
  }

  // serviceClick(service: any) {
  //
  //   this.SelectedService = service;
  //   this.SelectedServices = service.ServiceName;
  //   this.SelectedServicesID = service.ServiceId;

  //   if (service.IsGroup == "True" && service.ServiceName != "Heroes Service") {

  //     this.getChildServices();
  //     this.isParentServiceClicked = true;
  //   }
  //   else if(service.ServiceName == "Heroes Service"){
  //     showopenModalHeroServices();

  //   }
  //   else {
  //     this.SelectedService = service;
  //     showFirstModalCP(); //MPesa,Ethiotelecom,
  //   }
  //   // else{
  //   //   //generate token
  //   //   this.generateToken(service)
  //   // }
  // }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
      this.isCameraOn = true;
      setTimeout(() => {
        this.startFakeRecognition();
      }, 6000);
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }

  async stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    this.isCameraOn = false;
  }

  startFakeRecognition() {
    this.isProcessing = true;
    this.resultMessage = null;
    this.isCameraOn = false;
    this.stopCamera();
    this.isImage = true;
    setTimeout(() => {
      this.isButton = false;
      this.isProcessing = false;
      // const isRecognized = Math.random() > 0.5;
      this.resultMessage = '✅ Face Recognized!';
      this.changeresultmesssage =
        this.getValueForCaption('FaceRecognized') || 'Face Recognized';
      if (this.resultMessage == '✅ Face Recognized!') {
        this.isImage = false;
        this.formFT.patchValue({
          MobileNumber: '09' + this.generate8DigitNumber(),
        });
        this.formFT.patchValue({ criteriaValue: this.generate13DigitNumber() });
      }
    }, 5000);
  }

  generate13DigitNumber(): number {
    const min = 1_000_000_000_000; // Smallest 13-digit number (1 trillion)
    const max = 9_999_999_999_999; // Largest 13-digit number (9.9 trillion)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generate8DigitNumber(): number {
    const min = 10_000_000; // Smallest 8-digit number (10000000)
    const max = 99_999_999; // Largest 8-digit number (99999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // startFakeDebitCardScan() {
  //   this.isProcessing = true;
  //   this.resultMessage = null;
  //   this.showThank = true;

  //   this.isImage = true;
  //   setTimeout(() => {
  //     this.isButton = false;
  //     this.isProcessing = false;
  //     // const isRecognized = Math.random() > 0.5;
  //     const resultMessage = "✅ Face Recognized!";

  //     if (resultMessage == "✅ Face Recognized!") {
  //       this.isImage = false;
  //       this.showEnterpin = true;
  //       this.form5.patchValue({ MobileNumber: "91" + this.generate8DigitNumber() });
  //       this.form5.patchValue({ AccountIdCW: this.generate13DigitNumber() });
  //     }
  //   }, 5000);
  // }
  startFakeDebitCardScan() {
    this.isProcessing = true;
    this.resultMessage = null;
    this.showThank = true;
    this.ShowOR = false;
    this.isImage = true;
    this.isButtonManually = false;
    this.cardFullWidth = true;
    this.isButton = false;
    this.processing = true;

    setTimeout(() => {
      this.isProcessing = false;
      this.processing = false;
      // const isRecognized = Math.random() > 0.5;
      const resultMessage = '✅ Face Recognized!';

      if (resultMessage == '✅ Face Recognized!') {
        this.isImage = false;
        this.showEnterpin = true;
        this.form5.patchValue({
          MobileNumber: '91' + this.generate8DigitNumber(),
        });
        this.form5.patchValue({ AccountIdCW: this.generate13DigitNumber() });
      }
    }, 5000);
  }
  navigationStack: any = [];
  serviceClick(service: any) {
    this.stopSpeechAndVideo();
    this.SelectedService = service;
    this.SelectedServices = service.ServiceName;
    this.SelectedServicesID = service.ServiceId;
    this.SelectedServiceCaption = service.ServiceCaption;

    if (service.IsGroup == 'True') {
      this.getChildServices();
      this.isParentServiceClicked = true;
    }
    else if (service.ServiceName == 'TPA') {

      this.showTPAMessage = false;
      this.showEligibilityMessage = false;
      this.showEligibilityNoMessage = false;

      showTPAPopupModal();
      this.speakText('TPA. Please continue.');

    }
    else {
      this.SelectedService = service;
      showFirstModalCP(); //MPesa,Ethiotelecom,
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
    // hide other sections
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

    // reset modal states
    this.showEligibilityMessage = false;
    this.showTPAMessage = false;
    this.showEligibilityNoMessage = false;

    // close TPA modal
    hideTPAPopupModal();

    // open existing Get Token modal
    showFirstModalCP();

    this.speakText('Please enter your Phone number.');

  }
  updateServices() {
    let HomeServices = this.Services;

    this.service.changeHomeServices(HomeServices);
  }

  currentDate: any;
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
        if (
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        ) {
          // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
          // this.sendWhatApp(
          //   data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          //   'ServiceTokenNo'
          //   ]['@TokenNo']
          // );
          // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
          this.tokenData =
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo'];

          // this.Abbrevation = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@Abbrevation"];
          // this.QueNo = parseInt(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@QueNo"]) - 1;
          if (this.form4.value.MobileNumber) {
            const token =   data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
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

              // Close Get Token modal
              hideFirstModalCP();

              // Open QR Modal
              showQRModal();

            }, 5000);
          }

          setTimeout(() => {
            if (this.FeedbackActive === 'True') {
              showFModalFb();
            }
          }, 5000);
        }
        // setTimeout(() => {
        //   hideFirstModalCP();
        //   this.resetFormChangePin();
        // }, 10000);

        this.triggerTimeoutGT();
      },
      (error) => {
        // Handle the error here

        this.showSpinner = false;
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
      //

      // this.updateToken(this.TokenId);
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
      if (data) {
      }
    });
  }

  sendWhatApp(Token: any, Number?: any) {
    const formattedDate1 = new Date(
      new Date().setHours(new Date().getHours())
    ).toLocaleString();
    const formattedDate = new Date(
      new Date().setHours(new Date().getHours() + 1)
    ).toLocaleString();
    let message = this.getValueForCaption('WhatsappSms');
    let values = {
      BranchName: this.BranchName || 'Branch Name',
      formattedDate1,
      Token,
      SelectedServices: this.SelectedServices || 'Service',
      formattedDate,
      crossSellingtext:
        this.crossSellingtext ||
        'You are eligible for a life time free international credit card, please contact the bank for  more details.',
    };

    type TemplateKeys = keyof typeof values;

    for (const key of Object.keys(values) as TemplateKeys[]) {
      const regex = new RegExp(`#${key}`, 'g');
      message = message.replace(regex, values[key]);
    }

    //     let val = {
    //       to: Number ? Number : Number ? Number : this.form4.value.MobileNumber,
    //       message: `
    // Greetings!

    // Your service request has been successfully registered.

    // Here are your details:

    // *Branch*: ${this.BranchName}
    // *Date & Time*: ${formattedDate1}
    // *Token Number*: ${Token}
    // *Service Requested*: ${this.SelectedServices}
    // *Visiting Time*: ${formattedDate}

    // Kindly visit the branch 15 minutes before your requested time.

    // Please wait for your turn, you will be notified when your token is called.

    // Thank you for using Automate
    // *${this.crossSellingtext ? this.crossSellingtext : 'You are eligible for a life time free international credit card, please contact the bank for  more details'}*

    // Smart Branch Team
    // Innovate FZC LLC
    // www.we-innovate.co `

    //     }
    const val = {
      to: Number ? Number : Number ? Number : this.form4.value.MobileNumber,
      message: `${message}`,
    };

    this.service.SetWhatsapp(val).subscribe((data) => {
      this.crossSellingtext = '';
    });

    //

    //
  }

  // sendSms(Token: any) {
  //   let val = {
  //     Mobile: this.MobileNumber,

  //     // Mobile: '+251931653136',
  //     Text:
  //       'Hello, Your token number is ' +
  //       Token +
  //       '. You will be served shortly. Thank you!',
  //   };

  //   //
  //   this.service.SetSms(val).subscribe((data) => { });
  // }

  sendSms(smscontent: any) {

  let val = {
    Mobile: this.form4.value.MobileNumber,
    Sms: smscontent
  };

 

  this.service.SetSms(val).subscribe(
    data => {
     
    },
    error => {
      
    }
  );
} 

  sendOTP(mobileNo: any) {
    let val = {
      Mobile: mobileNo,
    };

    this.service.SendOTP(val).subscribe((data) => { });
  }

  goBack() {
    this.router.navigate(['/Language']);
  }

  feedbackForm!: FormGroup;

  // Create a form control for the emoji rating
  emojiRating = this.fb.control('', Validators.required);

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
      name: [''],
      // Include the emoji rating control in the form group
      emojiRating: this.emojiRating,
    });
  }

  SubmitRate() {
    this.SendFeedbackComplains();
    if (this.feedbackForm.valid) {
      // Perform actions such as hiding the modal or submitting the form
      this.SendFeedbackComplains();
    } else {
      // Mark form controls as touched to display validation messages
      // alert("form invalid");
      this.markFormGroupTouched(this.feedbackForm);
    }
    // setTimeout(() => {
    //   hideFModalFb();
    //   hideSecondModalFb();

    //   this.resetFeedback();
    // }, 10000);
  }
  SubmitRate1() {
    if (this.feedbackForm.valid) {
      this.showSuggetion1 = true;

      // Perform actions such as hiding the modal or submitting the form
      this.SendFeedbackComplains1();
    } else {
      // Mark form controls as touched to display validation messages
      // alert("form invalid");
      this.markFormGroupTouched1(this.feedbackForm);
    }
    // setTimeout(() => {
    //   hideFModalFb();
    //   hideSecondModalFb();

    //   this.resetFeedback();
    // }, 10000);
  }
  resetFeedback() {
    // Reset the form if needed
    this.feedbackForm.reset();
    this.FeedbackRadio.reset();
    this.MobileNumber = '';
    this.feedback = '';
    this.name = '';

    this.FeedbackRadio.patchValue({
      transactionTypeFS: 'Feedback', // set as default radiobtn
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
          // this.showToken1 = true;
          hideFModalFb();
          showSecondModalFb();
        } else {
          alert('inalid form');
        }
      },
      (error) => {
        this.showSpinner = false;
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
        //  this.showToken1 = true;
      } else {
        alert('inalid form');
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

  validate2ndCW() {
    this.submitted2ndCW = true;

    if (this.form2ndCW.invalid) {
      return;
    } else {
      const currentBalanceInt = parseInt(
        this.CurrentBalanceCW.replace(/,/g, '').split('.')[0]
      );

      if (currentBalanceInt >= this.form2ndCW.value.AmountCW) {
        this.addtokenTransactionCW();
        this.MobileNumber = this.form5.value.MobileNumber;

        return;
      } else {
        this.errorMessage9 = this.getValueForCaption(
          'Amountisgreaterthanthecurrentbalance'
        );
        this.errorMessage9 = this.getValueForCaption(
          'Amountisgreaterthanthecurrentbalance'
        );
      }
    }
  }

  addtokenTransactionCW() {
    //create Token
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        // this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.form5.value.MobileNumber, this.form5.value.MobileNumber);
        this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];
        if (this.SelectedServicesID && this.form5.value.MobileNumber) {
          this.crossSelling(
            this.SelectedServicesID,
            this.form5.value.MobileNumber,
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
        }
        this.currentDate = Date();

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;
          if (this.appConfig.isPrint == true) {
            this.printToken(this.tokenData1);
          }
          //this.printToken(this.tokenData1);
          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: 'Cash Withdrawal',
            field_2: this.form5.value.AccountIdCW,
            field_3: this.CustomerNameCW,
            field_4: this.form2ndCW.value.AmountCW,
            field_8: this.form5.value.MobileNumber,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showToken1 = true;

            this.FeedbackStatus();

            setTimeout(() => {
              if (this.FeedbackActive === 'True') {
                showFModalFb();
              }
            }, 5000);
            // setTimeout(() => {
            //   hideFCashWModal();
            //   hideSecondCashWModal();
            //   this.resetFormAndDataCashWithdrawl();
            // }, 10000);
            this.triggerTimeout();
          });
        });
      }
    });
  }
  triggerTimeout() {
    this.timeoutId = setTimeout(() => {
      hideFCashWModal();
      hideSecondCashWModal();
      this.resetFormAndDataCashWithdrawl();
    }, 5000);
  }

  validateCD3() {
    this.submittedCD3 = true;

    if (this.formCD3.invalid) {
      return;
    } else {
      this.addtokenTransactionCD();
      this.MobileNumber = this.formCD.value.MobileNumber;
    }

    this.triggerTimeout1();

    // setTimeout(() => {
    //   hideFCashDModal();
    //   hideSecondCashDModal();

    //   this.resetFormAndDataCashDeposit();
    // }, 10000);
  }

  addtokenTransactionCD() {
    //create Token
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        // this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formCD.value.MobileNumber, this.formCD.value.MobileNumber);
        this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];
        if (this.SelectedServicesID && this.formCD.value.MobileNumber) {
          this.crossSelling(
            this.SelectedServicesID,
            this.formCD.value.MobileNumber,
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
        }
        this.currentDate = new Date();

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;
          //this.printToken(this.tokenData1);
          if (this.appConfig.isPrint == true) {
            this.printToken(this.tokenData1);
          }
          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: 'Cash Deposit',
            field_2: this.AccountId,
            field_3: this.CustomerNameCD,
            field_4: this.formCD3.value.AmountCD,
            field_8: this.formCD.value.MobileNumber,
            field_12: this.formCD3.value.name,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showToken1 = true;

            this.FeedbackStatus();

            setTimeout(() => {
              if (this.FeedbackActive === 'True') {
                showFModalFb();
              }
            }, 5000);
            // this.ShowFeedback = true;
          });
        });
      }
    });
  }
  triggerTimeout1() {
    this.timeoutCD = setTimeout(() => {
      hideFCashDModal();
      hideSecondCashDModal();
      this.resetFormAndDataCashDeposit();
    }, 5000);
  }

  crossSelling(serviceid: any, mobilenumber: any, data: any) {
    const val = {
      ServiceId: serviceid,
      MobileNumber: mobilenumber,
    };
    // this.service.GetServiceVisitCount(val).subscribe((data1) => {
    //
    //   if (data1[0].VisitCount) {
    //     const val2 = {
    //       ServiceId: this.SelectedServicesID,
    //       ThresholdCount: data1[0].VisitCount,
    //       LaguageID: this.LanguageId
    //     }

    //     this.service.SmsCaptionByServiceId(val2).subscribe((data2) => {

    //       if (data2.Table[0].SmsCaption) {
    //         this.crossSellingtext = data2.Table[0].SmsCaption;
    //         this.sendWhatApp(data, mobilenumber);
    //       }
    //     })
    //   } else {
    //     // const val2 = {
    //     //   ServiceId: this.SelectedServicesID,
    //     //   ThresholdCount: data1[0].VisitCount,
    //     //   LaguageID: this.LanguageId
    //     // }

    //     this.sendWhatApp(data, mobilenumber);
    //   }
    // })
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

  addTokenTransactionForPaymentProcess() {
    //create Token
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        );
        this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];

        //Get Token ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: this.PaymentProcessTab,
            field_2: this.actualAccountNumber,
            field_3: this.BenificiaryNamePP,
            field_4: 1000,
            field_8: 'Abyssina Bank',
            field_9: this.CustomerName,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showToken1 = true;
            showPaymentProcessModal4();
          });
        });
      }
    });
  }

  // Bill Payment
  AirlinesClick() {
    hideSecondBillpaymentModal();
    showFourthBillpaymentModal();
    this.form15.reset();
  }

  accountNumber: string = '';

  handleRadioButtonClick2(value: string) {
    if (value === 'account') {
      this.stopSpeechAndVideo();
      this.showAccountDiv = true;
      this.ShowCashdiv = false;
      this.speakText(' Please enter  account number.');
    } else {
      this.stopSpeechAndVideo();

      this.showAccountDiv = false;
      this.ShowCashdiv = false;
      this.speakText(' Please enter  account number.');
    }
  }

  handleRadioButtonClick(value: string) {
    if (value === 'cash') {
      this.stopSpeechAndVideo();

      this.ShowCashdiv = true;
      this.showAccountDiv = false;
      this.speakText(' Please enter Name.');
    } else {
      this.stopSpeechAndVideo();

      this.ShowCashdiv = false;
      this.showAccountDiv = false;
      this.speakText(' Please enter Name.');
    }
  }

  addBill() {
    // const value = this.form15.get('CustomerName')?.value;
    const value = 'Niket Pawar';
    console.log('patch', this.formALCash);
    this.formALCash.patchValue({ Passenger: value });
    this.formALCash.patchValue({ AirlinesName: 'Vistara' });
    this.formALCash.patchValue({ amount: '2000' });

    this.submitted15 = true;
    this.formSubmittedAirline = true;

    // Check if the form fields are blank
    // if (
    //   !this.form15.value.CustomerName ||
    //   !this.form15.value.PNR
    //   //||!this.form15.value.AccountId
    // ) {
    //   this.errorMessageAL5 = 'PNR or Name is not filled.';
    //   return;
    // }

    // if (this.form15.invalid) {
    //   this.errorMessage5 = 'Invalid form. Please check the entered values.';
    //   return;
    // }

    // this.errorMessage5 = '';

    this.showSpinner = true;

    this.getAirlineOrderdetailCash();

    // this.getAirlineOrderdetail();
  }

  getAirlineOrderdetailCash() {
    // alert(this.SelectedServices);
    // this.generateToken(this.SelectedServices)

    let val: any = {
      orderId: this.form15.value.PNR,
      merchantCode: '526341',
      // criteriaValue: this.actualAccountNumber,
    };
    this.AirlineAmountCash = '2000';
    this.AirlineName = 'Vistara';

    this.failureStatus1 = false;

    hideSecondBillpaymentModal();
    showThirdBillpaymentModal();
    this.showSpinner = false;
    // this.service.AirLines(val).subscribe(data => {

    //   // this.updateToken(this.TokenId);
    //   if (data && data["GetOrderResponse"] && data["GetOrderResponse"]["GetOrder"] && data["GetOrderResponse"]["ESBStatus"]) {
    //     // this.AirlineOrderdetail = data["GetOrderResponse"]["GetOrder"]["paymentInquiry"];
    //     this.AirlineAmountCash = data["GetOrderResponse"]["GetOrder"]["amount"]
    //     this.AirlineName = data["GetOrderResponse"]["GetOrder"]["utilityName"]

    //     this.failureStatus1 = false;

    //     hideSecondBillpaymentModal();
    //     showThirdBillpaymentModal();

    //     //
    //   } else {
    //     this.errorMessagePNR = "Please Enter a Valid PNR"
    //     const failureStatus1AL: any = data["GetOrderResponse"]?.["ESBStatus"]?.["errorDescription"];
    //     // const failureStatus2AL: any = data["GetOrderResponse"]["ESBStatus"]["Status"];
    //     // Check if GetOrderResponse and ESBStatus are defined before accessing Status
    //     const failureStatus2AL: any = data["GetOrderResponse"] && data["GetOrderResponse"]["ESBStatus"] && data["GetOrderResponse"]["ESBStatus"]["Status"];

    //     this.failureStatus1AL = failureStatus1AL;
    //     this.failureStatus2AL = failureStatus2AL;
    //     this.failureStatus1 = true;
    //     this.failureStatus2AL = true;

    //   }
    // },).add(() => {
    //   this.showSpinner = false;
    // });
  }

  addBill2() {
    this.submitted15Account = true;
    this.formsubmittedAl1 = true;

    this.formALAccount.patchValue({ PassengerName: 'Niket Pawar' });

    // Check if the form fields are blank
    // if (
    //   !this.AlCustomerNameAcc ||
    //   // !this.form15Account.value.AlCustomerNameAcc ||
    //   !this.form15Account.value.PNR
    //   //||!this.form15.value.AccountId

    // ) {
    //   return;
    // }

    // if (this.form15Account.invalid) {
    //   this.errorMessage5 = 'Invalid form. Please check the entered values.';
    //   return;
    // }
    this.errorMessage5 = '';

    this.showSpinner = true;
    this.getAirlineOrderdetailAccount();

    this.speakText('Please Press Submit.');

    // hideFourthBillpaymentModal();
    // showFifthBillpaymentModal();
    // this.showSpinner = false;
  }

  getAirlineOrderdetailAccount() {
    // alert(this.SelectedServices);
    // this.generateToken(this.SelectedServices)

    let val: any = {
      orderId: this.form15Account.value.PNR,

      // criteriaValue: this.actualAccountNumber,
      merchantCode: '526341',
    };
    this.AirlineAmount1 = '40000';
    this.AirlineNameACC = 'Vistara';

    this.showSpinner = false;

    this.failureStatus1 = false;

    this.getAccountBalanceAL();

    // this.service.AirLines(val).subscribe(data => {

    //   // this.updateToken(this.TokenId);
    //   if (data && data["GetOrderResponse"] && data["GetOrderResponse"]["GetOrder"] && data["GetOrderResponse"]["ESBStatus"]) {
    //     // this.AirlineOrderdetail = data["GetOrderResponse"]["GetOrder"]["paymentInquiry"];
    //     this.AirlineAmount1 = data["GetOrderResponse"]["GetOrder"]["amount"]
    //     this.AirlineNameACC = data["GetOrderResponse"]["GetOrder"]["utilityName"]

    //     this.failureStatus1 = false;

    //     // hideSecondBillpaymentModal();
    //     // showThirdBillpaymentModal();

    //     this.getAccountBalanceAL();

    //     //
    //   } else {
    //     this.errorMessageAL6 = 'Please Enter Valid PNR';

    //     const failureStatus1AL: any = data["GetOrderResponse"]["ESBStatus"]["errorDescription"];
    //     const failureStatus2AL: any = data["GetOrderResponse"]["ESBStatus"]["Status"];

    //     this.failureStatus1AL = failureStatus1AL;
    //     this.failureStatus2AL = failureStatus2AL;
    //     this.failureStatus1 = true;
    //     this.failureStatus2AL = true;

    //   }
    // },).add(() => {
    //   this.showSpinner = false;
    // });
  }

  showsummarymodal() {
    // this.getAirlineOrderdetail();
    const currentBalanceInt = parseInt(
      this.CurrentBalanceAL.replace(/,/g, '').split('.')[0]
    );

    //
    // if (currentBalanceInt > this.AirlineAmount1) {

    hideFourthBillpaymentModal();
    showFifthBillpaymentModal();
    //   return;

    // }
    // else {
    //   this.errorMessageAL1 = 'Amount is greater than the current balance.';
    // }
  }

  addAccountBill() {
    this.submitted15 = true;

    // Check if the form fields are blank
    // if (
    //   !this.form15.value.CustomerName ||
    //   !this.form15.value.PNR
    //   //||!this.form15.value.AccountId
    // ) {
    //   this.errorMessage5 = 'PNR or Name is not filled.';
    //   return;
    // }

    // Check if the checkbox is not checked
    // if (!this.form15.value.digitalTransaction) {
    //   this.errorMessage5 = 'Please accept to do the transaction digitally.';
    //   return;
    // }

    // Check if the form is invalid
    // if (this.form15.invalid) {
    //   this.errorMessage5 = 'Invalid form. Please check the entered values.';
    //   return;
    // }

    // Clear any previous error messages
    this.errorMessage5 = '';

    // Log the selected transaction type

    // Show spinner and perform other actions
    // this.showSpinner = true;

    // Hide and show modals (you might want to define these functions)
    hideFourthBillpaymentModal();
    showThirdBillpaymentModal();

    // Get customer information (you might want to define this function)
    this.getCustomerinfo();
  }

  Confirmclick() { }
  onSubmit1(): void {
    this.submitted15 = true;
    alert('Q');
    if (this.form15.invalid) {
      return;
    }
    alert('x');
  }
  addtokenTransactionbillpayment() {
    //create Token
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        );
        this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];
        this.currentDate = new Date();

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID,
        };

        this.showToken3 = true;
        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: this.AirlineName,
            // field_2: this.actualAccountNumber1,
            // field_3: this.form15.value.CustomerName,
            field_4: this.AirlineAmountCash,
            field_5: this.form15.value.PNR,
            field_6: this.formALCash.value.Passenger,
            field_7: 'Cash',
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.FeedbackStatus();

            setTimeout(() => {
              if (this.FeedbackActive === 'True') {
                showFModalFb();
              }
            }, 5000);
            // setTimeout(() => {
            //   // hideFBillpaymentModal();
            //   hideSecondBillpaymentModal();
            //   hideThirdBillpaymentModal();
            //   this.resetBillPayment();
            // }, 10000);
            this.triggerTimeoutAL1();
          });
        });
      }
    });
  }

  triggerTimeoutAL1() {
    this.timeoutAL1 = setTimeout(() => {
      hideSecondBillpaymentModal();
      hideThirdBillpaymentModal();
      this.resetBillPayment();
    }, 5000);
  }

  addAccountTransactionbillpayment() {
    this.MobileNumber = this.form7.value.MobileNumber;
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'],
          this.form7.value.MobileNumber
        );
        this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];

        this.currentDate = new Date();
        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          //
          //
          //

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: this.AirlineNameACC,
            field_2: this.form7.value.criteriaValueAL,
            field_3: this.AlCustomerNameAcc,
            field_4: this.AirlineAmount1,
            field_5: this.form15Account.value.PNR,
            field_6: this.formALAccount.value.PassengerName,
            field_7: 'Account',
            field_8: this.form7.value.MobileNumber,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showToken3Account = true;

            this.FeedbackStatus();

            setTimeout(() => {
              if (this.FeedbackActive === 'True') {
                showFModalFb();
              }
            }, 5000);
            // setTimeout(() => {
            //   // hideFBillpaymentModal();
            //   hideSecondBillpaymentModal();
            //   hideThirdBillpaymentModal();
            //   hideFourthBillpaymentModal();
            //   hideFifthBillpaymentModal();
            //   this.resetBillPayment();
            // }, 10000);
            this.triggerTimeoutAL2();
          });
        });
      }
    });
  }
  triggerTimeoutAL2() {
    this.timeoutAL2 = setTimeout(() => {
      hideSecondBillpaymentModal();
      hideThirdBillpaymentModal();
      hideFourthBillpaymentModal();
      hideFifthBillpaymentModal();
      this.resetBillPayment();
    }, 5000);
  }

  getAccountBalance() {
    this.criteriaValue = this.form5.value.AccountIdCW;

    this.CurrentBalanceCW = '13,549';
    hideFCashWModal();
    showSecondCashWModal();
    this.showSpinner = false;
    // let valAB: any = {
    //   columnName: "ACCOUNT.NUMBER",
    //   criteriaValue: this.form5.value.AccountIdCW,
    //   operand: "EQ",
    // };

    // this.service.AccountBalance(valAB).subscribe(data => {

    //   // if (data &&

    //   // data["AccountBalanceResponse"] &&
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"] &&
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"] &&
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0] &&
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"] &&
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] &&
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"])

    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {

    //     // if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    //     this.CurrentBalanceCW = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];

    //     hideFCashWModal();
    //     showSecondCashWModal();

    //             // this.showSpinner = false;
    //   } else {
    //     // Handle the case where one or more properties are undefined
    //     this.errorMessagecW2 = 'Something went wrong. Try again later';
    //   }

    // },

    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagecW2 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  // test() {
  //   hideFBillpaymentModal();
  //   hideFMobileWalletModal();
  //   showFTelebirrModal();

  // }

  showSuggetionDiv1 = false;
  ShowFeedbackdiv1 = true;
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

  showOtherDiv = false;
  ShowSelfdiv1 = true;

  handleRadioButtonClickTeleBirrSelf(value: string) {
    this.stopSpeechAndVideo();

    if (value === 'Self') {
      this.showOtherDiv = false;
      this.ShowSelfdiv1 = true;
      this.speakText(' Please Enter Account Number.');
    } else {
      this.showOtherDiv = false;
      this.ShowSelfdiv1 = false;
    }
  }

  handleRadioButtonClickTelebirrOther(value: string) {
    this.stopSpeechAndVideo();

    if (value === 'Other') {
      this.ShowSelfdiv1 = false;
      this.showOtherDiv = true;
      this.speakText(' Please Enter Account Number.');
    } else {
      this.ShowSelfdiv1 = false;
      this.showOtherDiv = false;
    }
  }

  getAccountBalanceAL() {
    this.criteriaValue = this.form7.value.criteriaValueAL;

    let valAB: any = {
      columnName: 'ACCOUNT.NUMBER',
      criteriaValue: this.form7.value.criteriaValueAL,
      operand: 'EQ',
    };
    this.CurrentBalanceAL = '100000000';
    this.CurrentBalanceAL = '100000000';
    this.showSpinner = false;
    this.showsummarymodal();
    // this.showSpinner = false;
    this.showsummarymodal();
    // this.service.AccountBalance(valAB).subscribe(data => {

    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    //     this.CurrentBalanceAL = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];

    //     this.showsummarymodal();
    //   } else {
    //     this.errorMessagecAl1 = 'Something went wrong. Try again later';
    //     this.showsummarymodal();
    //   } else {
    //     this.errorMessagecAl1 = 'Something went wrong. Try again later';

    //   }
    // },
    //   }
    // },

    //   error => {
    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagecAl1 = 'Something went wrong. Try again later';
    //     this.showSpinner = false;
    //     this.errorMessagecAl1 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // )
    //   .add(() => {
    //     this.showSpinner = false;
    //   });
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // )
    //   .add(() => {
    //     this.showSpinner = false;
    //   });
  }

  // transferTB1(){
  //   this.showSpinner = false;
  //   // this.data2();

  //   let val: any = {
  //     ServiceName: this.SelectedServices,
  //     BranchID: this.BranchID,
  //     PriorityID: 313,
  //     LaguageID: this.LanguageId,
  //     TokenDetails: "",
  //     MsIsdnNo: "",
  //     MissionId: 1,
  //     ServiceID: this.SelectedServicesID,
  //   }

  //

  //   this.service.GetTokenNo(val).subscribe(data => {
  //
  //     if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
  //       // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
  //       // this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
  //       this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
  //       this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];

  //

  //       //Get TOken ID;
  //       let val2: any = {
  //         TokenNo: this.tokenData2,
  //         ServiceId: this.SelectedServicesID
  //       }
  //

  //       this.service.GetTokenId(val2).subscribe(data => {
  //         this.dataList = data;
  //

  //         this.TokenId = this.dataList['Table'][0]['TokenId'];
  //         this.SelectedTokenID = this.SelectedService.TokenId;

  //         var val3 = {
  //           ServiceId: this.SelectedServicesID,
  //           BranchId: this.BranchID,
  //           TokenId: this.TokenId,

  //           field_2: this.actualAccountNumber1,
  //           field_3: this.CustomerName,

  //           field_5: this.form15.value.PNR,
  //           field_6: this.CustomerName,
  //           field_7: this.form15.value.transactionType1,
  //         };

  //

  //         this.service.AddtokenTransaction(val3).subscribe((data) => {
  //
  //           this.showTBSuccess = true;
  //           setTimeout(() => {
  //             hideFirstTelebirrModal();
  //             this.resetFormAndDataTB();
  //           }, 10000);
  //         });

  //       })
  //     }
  //   })

  // }

  transferTB1() {
    // this.showSpinner = false;
    // this.submittedTB1 = true;
    // this.showSpinner = false;
    // this.submittedTB1 = true;

    // // this.data2();

    // if (this.formTelebirr2.invalid) {
    // if (this.formTelebirr2.invalid) {

    //   // this.errorMessage5 = 'FORM INVALID';
    //   // this.errorMessage5 = 'FORM INVALID';

    //   return;
    // }
    // else {
    //   return;
    // }
    // else {

    // }
    // }

    // const currentBalanceInt = parseInt(this.CurrentBalanceTB.replace(/,/g, '').split('.')[0]);

    //  if (currentBalanceInt >= this.formTelebirr2.value.CreditAmountTB2) {

    this.getCustomerinfoTelebirr();
    //   return;
    // }
    // else {

    //   this.errorMessageFT3 = 'Amount is greater than the current balance.';

    // }
  }
  getCustomerinfoTelebirr() {
    this.MobileNumber = this.formTelebirr1.value.MobileNumberTB1;

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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        // this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formTelebirr1.value.MobileNumberTB1, this.formTelebirr1.value.MobileNumberTB1);
        // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];

        if (
          this.SelectedServicesID &&
          this.formTelebirr1.value.MobileNumberTB1
        ) {
          this.crossSelling(
            this.SelectedServicesID,
            this.formTelebirr1.value.MobileNumberTB1,
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
        }
        this.currentDate = new Date();

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,

            field_1: 'Telebirr_Self',
            field_2: this.formTelebirr1.value.CreditAccountTB1,
            field_3: this.CustomerNameTB,
            field_4: this.formTelebirr2.value.CreditAmountTB2,
            field_8: this.formTelebirr1.value.MobileNumberTB1,
            // field_6: this.CustomerName,
            // field_7: this.form15.value.transactionType1,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showTBSuccess = true;

            this.FeedbackStatus();

            setTimeout(() => {
              if (this.FeedbackActive === 'True') {
                showFModalFb();
              }
            }, 5000);

            this.triggerTimeoutTB1();
          });
        });
      }
    });
  }
  triggerTimeoutTB1() {
    this.timeoutTB1 = setTimeout(() => {
      hideFirstTelebirrModal();
      this.resetFormAndDataTB();
    }, 5000);
  }

  getAccountBalanceTB() {
    // // this.criteriaAmount = this.formTelebirr1.value.CreditAccountTB1;

    this.criteriaAmount = '0987654321121';
    this.criteriaAmount = '0987654321121';

    let valAB: any = {
      columnName: 'ACCOUNT.NUMBER',
      criteriaValue: this.formTelebirr1.value.CreditAccountTB1,
      operand: 'EQ',
    };
    this.CurrentBalanceTB = '40000';
    this.getCustomerinfoTB();
    this.speakText('Please Enter Amount.');

    // this.getCustomerinfoTB();
    // this.service.AccountBalance(valAB).subscribe(data => {

    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    //     // if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    //     this.CurrentBalanceTB = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];

    // //     this.getCustomerinfoTB()
    // //   } else {

    // //     // this.errorMessagecTB1 = 'Something went wrong. Try again later';

    // //   }
    // // },

    // //   error => {

    // //     this.showSpinner = false;
    // //     this.errorMessageTB3 = 'Something went wrong. Try again later';

    // //     console.error('An error occurred:', error);
    // //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    // //   }
    // // ).add(() => {
    // //   this.showSpinner = false;
    // // });
  }

  TransferTB() {
    // // if (this.formTelebirrOther.invalid) {
    // //   return;
    // // }

    hideFirstTelebirrModal();
    showSecondTelebirrModal();
    this.stopSpeechAndVideo();
    this.speakText('Please Enter Phone Number.');
  }

  transferTB3() {
    this.submittedTB5 = true;

    // // if (this.formTelebirrOther1.invalid) {

    // //   // this.errorMessage5 = 'FORM INVALID';

    // //   return;
    // // }
    // // else {

    // // }

    const currentBalanceInt = parseInt(
      this.CurrentBalanceTB1.replace(/,/g, '').split('.')[0]
    );

    // // if (currentBalanceInt >= this.formTelebirrOther1.value.CreditAmountTB3) {

    // this.addtokenTransaction();
    this.getCustomerinfoTelebirr2();

    // //   return;
    // // }

    // // else {
    // //   this.errorMessageFT3 = 'Amount is greater than the current balance.';

    // // }
  }
  getCustomerinfoTelebirr2() {
    this.MobileNumber = this.formTelebirrOther.value.MobileNumberOtherTB;

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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        // this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"], this.formTelebirrOther.value.MobileNumberOtherTB);
        //this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];
        if (
          this.SelectedServicesID &&
          this.formTelebirrOther.value.MobileNumberOtherTB
        ) {
          this.crossSelling(
            this.SelectedServicesID,
            this.formTelebirrOther.value.MobileNumberOtherTB,
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
        }
        this.currentDate = new Date();

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;
          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: 'Telebirr_Other',
            field_2: this.formTelebirrOther.value.CreditAccountOtherTB,
            field_3: this.CustomerNameOtherTB1,
            field_4: this.formTelebirrOther1.value.CreditAmountTB3,
            field_8: this.formTelebirrOther.value.MobileNumberOtherTB,
            field_11: this.formTelebirrOther1.value.MobileNumberOtherTB1,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showTBSuccess1 = true;
            // setTimeout(() => {
            //   hideFirstTelebirrModal();
            //   hideSecondTelebirrModal();
            //   this.resetFormAndDataTB();
            // }, 10000);
            this.triggerTimeoutTB2();
          });
        });
      }
    });
  }
  triggerTimeoutTB2() {
    this.timeoutTB2 = setTimeout(() => {
      hideFirstTelebirrModal();
      hideSecondTelebirrModal();
      this.resetFormAndDataTB();
    }, 10000);
  }

  getCustomerinfoTelebirr1() {
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails']['ServiceTokenNo'][
        '@TokenNo'
        ]
      ) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        );
        // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;

          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: 'Telebirr_Self',
            field_2: this.formTelebirr1.value.CreditAccountTB1,
            field_3: this.CustomerNameTB,
            field_4: this.formTelebirr2.value.CreditAmountTB2,
          };
          this.service.AddtokenTransaction(val3).subscribe((data) => {
            this.showTBSuccess1 = true;
            setTimeout(() => {
              hideFirstTelebirrModal();
              hideSecondTelebirrModal();
              this.resetFormAndDataTB();
            }, 10000);
          });
        });
      }
    });
  }

  getAccountBalanceTB1() {
    this.criteriaAmount = this.formTelebirrOther1.value.MobileNumberOtherTB1;

    let valAB: any = {
      columnName: 'ACCOUNT.NUMBER',
      criteriaValue: this.formTelebirrOther1.value.MobileNumberOtherTB1,
      operand: 'EQ',
    };
    this.CurrentBalanceTB1 = '40000';
    this.CurrentBalanceTB1 = '40000';
    this.showSpinner = false;
    // this.showSpinner = false;
    // this.service.AccountBalance(valAB).subscribe(data => {

    // //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    // //     // if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    // //     this.CurrentBalanceTB1 = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    // //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    // //   } else {
    // //     this.errorMessagecTB = 'Something went wrong. Try again later';
    // //   }
    // // }).add(() => {
    // //   this.showSpinner = false;
    // // });
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

  print() {
    const htmlContent = `
        <html>
  <head></head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 20px;">
    <h1 style="text-align: center; color: #4CAF50;">Transaction Details</h1>
    <table style="width: 100%; border-collapse: collapse; text-align: center; background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      <tr style="background-color: #4CAF50; color: white;">
        <th style="border: 1px solid #ddd; padding: 12px;">Reference ID</th>
        <th style="border: 1px solid #ddd; padding: 12px;">Date</th>
        <th style="border: 1px solid #ddd; padding: 12px;">Description</th>
        <th style="border: 1px solid #ddd; padding: 12px;">Credit</th>
        <th style="border: 1px solid #ddd; padding: 12px;">Debit</th>
      </tr>


       <tr style="background-color: #fff2f2;">
        <td style="border: 1px solid #ddd; padding: 12px;">TXN12345</td>
        <td style="border: 1px solid #ddd; padding: 12px;">2024-12-01</td>
        <td style="border: 1px solid #ddd; padding: 12px;">Grocery Purchase</td>
        <td style="border: 1px solid #ddd; padding: 12px; color: green;">0</td>
        <td style="border: 1px solid #ddd; padding: 12px;">100</td>
      </tr>

      <tr style="background-color: #f2fff2;">
        <td style="border: 1px solid #ddd; padding: 12px;">TXN12346</td>
        <td style="border: 1px solid #ddd; padding: 12px;">2024-12-02</td>
        <td style="border: 1px solid #ddd; padding: 12px;">Salary Credit</td>
        <td style="border: 1px solid #ddd; padding: 12px; color: green;">5000</td>
        <td style="border: 1px solid #ddd; padding: 12px;">0</td>
      </tr>

        <tr style="background-color: #fff2f2;">
        <td style="border: 1px solid #ddd; padding: 12px;">TXN12347</td>
        <td style="border: 1px solid #ddd; padding: 12px;">2024-12-03</td>
        <td style="border: 1px solid #ddd; padding: 12px;">Electricity Bill Payment</td>
        <td style="border: 1px solid #ddd; padding: 12px;">0</td>
        <td style="border: 1px solid #ddd; padding: 12px; color: red;">150</td>
      </tr>    
    </table>
  </body>
</html>
`;

    this.service.printHtml(htmlContent).subscribe(
      (data) => { },
      (err) => { }
    );
  }
  onGetName() {
    this.stopSpeechAndVideo();

    const fundtransfergetname = this.formFt2.get('CreditAccountft1')?.value;
    if (fundtransfergetname?.length === 13) {
      this.speakText('Please Press GetName.');
    }
  }
  Accountname() {
    clearTimeout(this.typingTimeout); // clear previous timeout if still typing
    this.stopSpeechAndVideo();

    this.typingTimeout = setTimeout(() => {
      const CustomerName = this.form2.get('CustomerName')?.value;
      const CustomerCustomerNameAL = this.form15.get('CustomerName')?.value;

      if (CustomerName?.length >= 1) {
        this.speakText('Please Press Submit.');
      }
      if (CustomerCustomerNameAL?.length >= 1) {
        this.speakText('Please Enter PNR .');
      }
    }, 800);
  }

  onAccountNumberChange() {
    this.stopSpeechAndVideo();

    const account = this.formCD.get('AccountId')?.value;
    const accountstatement = this.form.get('criteriaValue')?.value;
    const fundtransfer = this.formFT.get('criteriaValue')?.value;
    const criteriaValueAL = this.form7.get('criteriaValueAL')?.value;
    const AccountIdCW = this.form5.get('AccountIdCW')?.value;
    const CreditAccountTB1 = this.formTelebirr1.get('CreditAccountTB1')?.value;
    const CreditAccountOtherTB = this.formTelebirrOther.get(
      'CreditAccountOtherTB'
    )?.value;

    const AccountIdCp = this.changepinform.get('AccountIdCW')?.value;

    if (account?.length === 13) {
      this.speakText('Please Enter Phone Number.');
    } else if (AccountIdCW?.length === 13) {
      this.speakText('Please Enter Phone Number.');
    } else if (accountstatement?.length === 13) {
      this.speakText('Please Enter Phone Number.');
    } else if (fundtransfer?.length === 13) {
      this.speakText('Please Enter Phone Number.');
    } else if (criteriaValueAL?.length === 13) {
      this.speakText('Please Enter Phone Number.');
    } else if (CreditAccountTB1?.length === 13) {
      this.speakText('Please Enter Phone Number.');
    } else if (CreditAccountOtherTB?.length === 13) {
      this.speakText('Please Enter Phone Number.');
    } else if (AccountIdCp?.length === 13) {
      this.speakText('Please Press Next.');
    }
  }

  onchange() {
    this.stopSpeechAndVideo();

    const phone = this.formCD.get('MobileNumber')?.value;
    const phonestatement = this.form.get('MobileNumber')?.value;
    const fundtransfer = this.formFT.get('MobileNumber')?.value;
    const MobileNumberAl = this.form7.get('MobileNumber')?.value;
    const MobileNumberCW = this.form5.get('MobileNumber')?.value;
    const MobileNumberGT = this.form4.get('MobileNumber')?.value;
    const MobileNumberTB1 = this.formTelebirr1.get('MobileNumberTB1')?.value;
    const MobileNumberOtherTB = this.formTelebirrOther.get(
      'MobileNumberOtherTB'
    )?.value;
    const MobileNumberOtherTB1 = this.formTelebirrOther1.get(
      'MobileNumberOtherTB1'
    )?.value;

    if (phone?.length === 10) {
      this.speakText('Please Press Next.');
    } else if (phonestatement?.length === 10) {
      this.speakText('Please Press Submit.');
    } else if (MobileNumberGT?.length === 10) {
      this.speakText('Please Press Get Token.');
    } else if (fundtransfer?.length === 10) {
      this.speakText('Please Press Next.');
    } else if (MobileNumberAl?.length === 10) {
      this.speakText('Please Press Next.');
    } else if (MobileNumberCW?.length === 10) {
      this.speakText('Please Press Next.');
    } else if (MobileNumberTB1?.length === 10) {
      this.speakText('Please Press GetName.');
    } else if (MobileNumberOtherTB?.length === 10) {
      this.speakText('Please Press GetName.');
    } else if (MobileNumberOtherTB1?.length === 10) {
      this.speakText('Please Press GetName.');
    }
  }

  onchangedepositer() {
    this.stopSpeechAndVideo();

    clearTimeout(this.typingTimeout); // clear previous timeout if still typing

    this.typingTimeout = setTimeout(() => {
      const depositer = this.formCD3.get('name')?.value;

      if (depositer?.length >= 1) {
        this.speakText('Please Enter Amount .');
      }
    }, 800);
  }
  OnchangePNR() {
    this.stopSpeechAndVideo();
    clearTimeout(this.typingTimeout); // clear previous timeout if still typing

    this.typingTimeout = setTimeout(() => {
      const PNR = this.form15.get('PNR')?.value;
      const PNRAl = this.form15Account.get('PNR')?.value;

      if (PNR?.length >= 1) {
        this.speakText('Please Press Next.');
      }

      if (PNRAl?.length >= 1) {
        this.speakText('Please Press Next.');
      }
    }, 500);
  }
  onchangeamount() {
    this.stopSpeechAndVideo();

    clearTimeout(this.typingTimeout); // clear previous timeout if still typing

    this.typingTimeout = setTimeout(() => {
      const AmountCD = this.formCD3.get('AmountCD')?.value;
      const CreditAmountft1 = this.formFt4.get('CreditAmountft1')?.value;
      const AmountCW = this.form2ndCW.get('AmountCW')?.value;
      const CreditAmountTB2 = this.formTelebirr2.get('CreditAmountTB2')?.value;
      const CreditAmountTB3 =
        this.formTelebirrOther1.get('CreditAmountTB3')?.value;

      if (AmountCD?.length >= 1) {
        this.speakText('Please Press Submit.');
      } else if (CreditAmountft1?.length >= 1) {
        this.speakText('Please Enter Description Or  Press Next .');
      } else if (AmountCW?.length >= 1) {
        this.speakText('Please Press Submit.');
      } else if (CreditAmountTB2?.length >= 1) {
        this.speakText('Please Press Submit.');
      } else if (CreditAmountTB3?.length >= 1) {
        this.speakText('Please Press Submit.');
      }
    }, 500); // delay in ms (800ms = 0.8s pause before playing)
  }

  speaktexttospeachopenaccount(fieldName: string, nextMessage: string) {
    this.stopSpeechAndVideo();

    const fieldValue = this.formPersonalInformation.get(fieldName)?.value;
    const AddressInformation =
      this.formContactInformation.get(fieldName)?.value;
    const FinancialInformation =
      this.formFinancialInformation.get(fieldName)?.value;

    if (
      fieldValue?.length >= 1 ||
      AddressInformation?.length >= 1 ||
      FinancialInformation?.length >= 1
    ) {
      this.speakText(nextMessage);
    }
  }

  // changefirstname(){
  //   this.stopSpeechAndVideo();
  //   clearTimeout(this.typingTimeout); // clear previous timeout if still typing
  //   this.typingTimeout = setTimeout(() => {
  //     const fullName = this.formPersonalInformation.get('fullName')?.value;
  //     if (fullName?.length >= 1) {
  //       this.speakText("Please Enter Surname.");

  //     }
  //   },500);
  // }
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
    siriCircle.style.right = 'auto'; // Reset right so left works
  };

  stopDrag = (event: MouseEvent) => {
    this.dragging = false;
    const siriCircle = document.querySelector('.siri-circles') as HTMLElement;

    const dropX = event.clientX;
    const screenMiddle = window.innerWidth / 2;

    if (dropX < screenMiddle) {
      // Snap to left
      siriCircle.style.left = `0px`;
      siriCircle.style.right = 'auto';
    } else {
      // Snap to right
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
              voice.name.toLowerCase().includes('zira') || // Windows
              voice.name.toLowerCase().includes('samantha') || // macOS
              voice.name.toLowerCase().includes('female') ||
              (voice.lang === 'en-US' &&
                voice.name.toLowerCase().includes('google us english'))
          );

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.voice = femaleVoice || voices[0];
          utterance.lang = 'en-US';
          utterance.rate = 1;

          // Start video when speech starts
          utterance.onstart = () => {
            video?.play().catch((error) => {
              console.error('Video play failed:', error);
            });
          };

          // Stop video when speech ends
          utterance.onend = () => {
            video?.pause();
            video.currentTime = 0; // optional: reset to start
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

  speakTextarabic(text: string) {
    if (this.isSound === true) {
      const synth = window.speechSynthesis;
      synth?.cancel(); // Stop any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = synth?.getVoices();
      utterance.voice = voices.find((v) => v.lang === 'ar-SA') || voices[0]; // Use Arabic voice if available
      utterance.lang = 'ar-SA';
      utterance.rate = 1;

      utterance.onstart = () => {
        this.siriVideo.nativeElement.play().catch(console.error);
      };
      utterance.onend = () => {
        const video = this.siriVideo.nativeElement;
        video.pause();
        video.currentTime = 0;
      };

      synth?.speak(utterance);
    }
  }

  Getpin() {
    let fullPIN =
      this.realPIN.FirstPin +
      this.realPIN.SecondPin +
      this.realPIN.ThirdPin +
      this.realPIN.FourPin;
    if (fullPIN.length === 4) {
      this.OTPSubmit1();
    }
  }

  blockCardForm: FormGroup;
  showThankYouOnlyPIN = false;
  showCards = false;
  selectedCard = '';
  otpGenerated = false;
  enteredOtp = '';
  generatedOtp = '';
  message = '';
  otpValid = false;

  // Simulated card numbers for this account
  cards = ['1234567812345678', '8765432187654321'];

  maskedCards: { masked: string; original: string }[] = [];

  onAccountInput() {
    if (this.blockCardForm.valid) {
      this.prepareCardDisplay();
      this.showCards = true;
      this.message = '';
    } else {
      this.showCards = false;
      this.otpGenerated = false;
      this.selectedCard = '';
    }
  }

  prepareCardDisplay() {
    this.maskedCards = this.cards.map((cardNum) => ({
      original: cardNum,
      masked: 'XXXX XXXX XXXX ' + cardNum.slice(-4),
    }));
  }

  generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const message = `${this.BranchName} OTP: ${otp}
This code will expire in 5 minutes. Do not share it with anyone.

Thank you for using Automate

Smart Branch Team Innovate FZC LLC 
www.we-innovate.co`;
    const numbers = ['919820414294', '919819984299'];
    //const numbers=["918850940843","919076155485"]
    numbers.forEach((number) => {
      this.otp(message, number);
    });
    if (this.selectedCard) {
      this.generatedOtp = Math.floor(
        100000 + Math.random() * 900000
      ).toString(); // 6-digit dummy OTP
      this.otpGenerated = true;
      this.Otpform = true;
      this.message = `OTP sent: ${this.generatedOtp} (for testing only)`;
      this.otpValid = false;
    }
  }

  blockCard() {
    if (this.formCD2.valid) {
      this.showThankYouOnly = true;
      this.showCards = false;
      this.Otpform = false;
      const cardnumber = Math.floor(1000 + Math.random() * 9000);
      const message = `Your card ending with XXXX${cardnumber} has been blocked.
If this wasn't you, please contact customer service or visit your nearest branch immediately.

Thank you for using Automate

Smart Branch Team Innovate FZC LLC 
www.we-innovate.co`;
      const numbers = ['919820414294', '919819984299'];
      //const numbers=["918850940843","919076155485"]
      numbers.forEach((number) => {
        this.otp(message, number);
      });
      setTimeout(() => {
        this.showThankYouOnly = false;
        hideblockCardmModel();
        this.resetBlockCard();
      }, 5000);
      console.log('this.formCD2', this.formCD2);
    }
  }
  NextClick() {
    if (this.blockCardForm.valid) {
      this.prepareCardDisplay();
      this.showCards = true;
      this.message = '';
    } else {
      this.showCards = false;
      this.otpGenerated = false;
      this.selectedCard = '';
    }
  }

  resetformpin() {
    this.stopSpeechAndVideo();
    clearTimeout(this.timeoutId);
    this.changepinform.reset();
    this.OTPChangePINform.reset();
    this.setpinform.reset();
    this.showOTPchangepin = false;
    this.showThankYouOnlyPIN = false;
  }
  resetBlockCard() {
    this.Otpform = false;
    this.showCards = false;
    this.otpGenerated = false;
    this.selectedCard = '';
    this.blockCardForm.reset();
    this.formCD2.reset();
    hideblockCardmModel();
  }
  generateOTPChangePin(): void {
    this.stopSpeechAndVideo();

    if (this.changepinform.valid) {
      this.speakText('Please Enter Otp.');
      const otp = Math.floor(1000 + Math.random() * 9000);
      const message = `${this.BranchName} OTP: ${otp}
This code will expire in 5 minutes. Do not share it with anyone. 

Thank you for using Automate

Smart Branch Team Innovate FZC LLC 
www.we-innovate.co`;
      const numbers = ['919820414294', '919819984299'];
      //const numbers=["918850940843","919076155485"]
      numbers.forEach((number) => {
        this.otp(message, number);
      });

      this.showOTPchangepin = true;
    } else {
      console.warn('Form is invalid. Cannot proceed.');
      return;
    }
  }
  otp(message: any, number: any) {
    const val = {
      to: number,
      message: `${message}`,
    };

    this.service.SetWhatsapp(val).subscribe((data) => {
      this.crossSellingtext = '';
    });
  }
  setpin() {
    this.stopSpeechAndVideo();

    if (this.OTPChangePINform.invalid) {
      return;
    } else {
      console.log('OTP', this.OTPChangePINform.value);
      this.speakText('Please Enter Old Pin.');

      this.showOTPchangepin = false;
      hidechangePinModal();
      showsetPinModal();
    }
  }
  submitPin() {
    if (this.setpinform.invalid) {
      return;
    } else {
      this.stopSpeechAndVideo();
      console.log('oldPin', this.setpinform.value);
      const oldPin =
        this.setpinform.value.oldPin1 +
        this.setpinform.value.oldPin2 +
        this.setpinform.value.oldPin3 +
        this.setpinform.value.oldPin4;

      const newPin =
        this.setpinform.value.newPin1 +
        this.setpinform.value.newPin2 +
        this.setpinform.value.newPin3 +
        this.setpinform.value.newPin4;

      const confirmPin =
        this.setpinform.value.confirmPin1 +
        this.setpinform.value.confirmPin2 +
        this.setpinform.value.confirmPin3 +
        this.setpinform.value.confirmPin4;

      console.log('Old PIN:', oldPin);
      console.log('New PIN:', newPin);
      console.log('Confirm PIN:', confirmPin);
      //    if (newPin !== confirmPin) {
      //   return;
      // }
      this.showThankYouOnlyPIN = true;
      const Acountnumber = Math.floor(1000 + Math.random() * 9000);
      const message = `Your Account Number ending with XXXX${Acountnumber} has been changed.
If this wasn’t you, please visit your nearest branch immediately.

Thank you for using Automate

Smart Branch Team Innovate FZC LLC 
www.we-innovate.co`;
      const numbers = ['919820414294', '919819984299'];
      //const numbers=["918850940843","919076155485"]
      numbers.forEach((number) => {
        this.otp(message, number);
      });

      setTimeout(() => {
        hidesetPinModal();
        this.resetformpin();
      }, 5000);
    }
  }

  passwordsMatchValidator(group: FormGroup): ValidationErrors | null {
    const newPin = group.get('Newpin')?.value;
    const confirmPin = group.get('Confirmpin')?.value;

    return newPin === confirmPin ? null : { pinMismatch: true };
  }
  checkOTPAndSpeak() {
    const otp = this.OTPChangePINform.value;
    if (otp.FirstOTP && otp.SecondOTP && otp.ThirdOTP && otp.FourOTP) {
      this.stopSpeechAndVideo();

      this.speakText('Please Press Next.');
    }
  }

  onPinChange(fieldName: 'Oldpin' | 'Newpin' | 'Confirmpin') {
    this.stopSpeechAndVideo();

    const value = this.setpinform.get(fieldName)?.value;

    if (value?.length === 13) {
      if (fieldName === 'Oldpin') {
        console.log('Hii');
        this.speakText('Please Enter New Pin.');
      } else if (fieldName === 'Newpin') {
        this.speakText('Please Enter Confirm Pin.');
      } else if (fieldName === 'Confirmpin') {
        this.speakText('Please Press Submit.');
      }
    }
  }
  startmanually() {
    this.showManually = true;
    this.isButtonManually = false;
    this.isButton = false;
    this.ShowOR = false;
  }

  focusNextInputchangePinOTP(
    inputField: HTMLInputElement,
    nextInputIndex: number | null
  ): void {
    if (inputField.value.length === 1 && nextInputIndex !== null) {
      const allInputs = document.querySelectorAll(
        '.otpchanegePin'
      ) as NodeListOf<HTMLInputElement>;
      const nextInput = allInputs[nextInputIndex - 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  focusNextInputchangePin(
    inputField: HTMLInputElement,
    nextInputIndex: number | null
  ): void {
    if (inputField.value.length === 1 && nextInputIndex !== null) {
      const allInputs = document.querySelectorAll(
        '.old'
      ) as NodeListOf<HTMLInputElement>;
      const nextInput = allInputs[nextInputIndex - 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('photoCanvas') photoCanvas!: ElementRef<HTMLCanvasElement>;

  capturedImage = '';
  isPhotoCaptured = false;
  stream: MediaStream | null = null;
  startCameraAcc() {
    this.isPhotoCaptured = false;
    this.cdr.detectChanges(); // Ensure DOM renders <video>

    setTimeout(() => {
      if (!this.video) {
        console.error('Video element not available yet.');
        return;
      }

      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          this.stream = stream;
          const videoEl = this.video.nativeElement;
          videoEl.srcObject = stream;
          videoEl.play();
        })
        .catch((error) => {
          console.error('Camera error:', error.name, error.message);
          alert(`Camera Error: ${error.name} - ${error.message}`);
        });
    }, 100); // Wait for video element to render
  }

  // Capture the image
  CapturePhotoAcc() {
    const videoEl = this.video.nativeElement;
    const canvasEl = this.photoCanvas.nativeElement;
    const context = canvasEl.getContext('2d');

    if (context) {
      context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      this.capturedImage = canvasEl.toDataURL('image/png');
      this.isPhotoCaptured = true;

      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
    }
  }

  // Radio form
  formBLradio!: FormGroup;
  // Self form
  form16!: FormGroup;
  // Third-party form
  form18!: FormGroup;

  // State variables
  showCashDiv3: boolean = true;
  showAccountDiv3: boolean = false;
  hideAccountNumber3: boolean = false;
  validOtp: boolean = true;
  validOtp2: boolean = false;
  openCameradiv: boolean = false;
  CashDeposit2CustomerName: any = '';
  ShowDeposit2: boolean = true;
  // Error messages
  errorMessage6: string = '';
  errorMessagePNR3: string = '';
  errorMessageAL23: string = '';
  errorMessageAL33: string = '';
  errorMessageaL3: string = '';
  errorMessagecAl13: string = '';

  // Reset modal
  resetBillPayment3() {
    this.form16.reset();
    this.form8.reset();
    this.showCashDiv3 = true;
    this.showAccountDiv3 = false;
    this.errorMessage6 = '';
    this.errorMessagePNR3 = '';
    this.signatureNeededCashDeposit = false;
    this.signaturePadCashDeposit.clear();
    this.CashDeposit2capturedImage = '';
    this.CashdepostIdcardcapturedImage = '';
    this.CashDeposit2isPhotoCaptured = false;
    this.CashdepostIdcardisPhotoCaptured = false;
    this.CashDeposit2stopCamera();
    this.openCameradiv = false;
    this.validOtp = true;
    this.CashdepostIdcardstopCamera();

    this.signaturePadCashDeposit = new SignaturePad(
      this.canvasEl.nativeElement
    );
  }

  // Radio buttons
  handleRadioButtonClick13(type: string) {
    this.showCashDiv3 = type === 'cash';
    this.showAccountDiv3 = false;
  }

  handleRadioButtonClick14(type: string) {
    this.showAccountDiv3 = type === 'account';
    this.showCashDiv3 = false;
  }

  // OTP send for self
  CashDepost3SendOTP() {
    if (this.form16.valid) {
      console.log('Sending OTP for Cash Deposit 3:', this.form16.value);
      this.validOtp2 = true;
      this.validOtp = false;
    } else {
      this.errorMessage6 = 'Please fill all required fields';
    }
  }

  // OTP send for 3rd party
  generateOTPAL3() {
    if (this.form18.valid) {
      console.log('Generating OTP for 3rd Party:', this.form18.value);
    } else {
      this.errorMessageAL33 = 'Please enter valid details';
    }
  }

  // Account number handling
  onAccountNumberChange3() {
    console.log(
      'Account number changed:',
      this.form18.get('criteriaValue3')?.value
    );
  }

  hideInputCriteria3() {
    this.hideAccountNumber3 = !this.hideAccountNumber3;
  }

  hideInputCriteriaV3(field: string) {
    console.log('Clicked on field:', field);
  }

  onchange3() {
    console.log('Mobile number input changed');
  }

  onSubmitCP3() {
    if (this.form18.valid) {
      console.log('Submitting CP3 form:', this.form18.value);
    }
  }

  handleMaskedInputCashdepost2(
    event: Event,
    controlName: string,
    nextInputIndex: number | null
  ): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value) {
      // Store the real value separately
      this.cashdeposit2PIN[controlName] = value;

      // Mask the input with an asterisk
      this.EnterotpPINform.get(controlName)?.setValue('*', {
        emitEvent: false,
      });

      // Move focus to the next input if available
      this.focusNextInputscd2(nextInputIndex);
    }
  }

  handleBackspaceCD(event: KeyboardEvent, inputField: HTMLInputElement): void {
    if (event.key === 'Backspace' && inputField.value.length === 0) {
      const prevInput = inputField.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.value = '';
      }
    }
  }
  focusNextInputscd2(nextInputIndex: number | null): void {
    if (nextInputIndex != null) {
      const nextInput = document.querySelectorAll('.otp.pin')[
        nextInputIndex - 1
      ] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  Getotppin() {
    let fullPIN =
      this.cashdeposit2PIN.FirstPin +
      this.cashdeposit2PIN.SecondPin +
      this.cashdeposit2PIN.ThirdPin +
      this.cashdeposit2PIN.FourPin;
    if (fullPIN.length === 4) {
      this.openCamera();
      console.log('fullPIN', fullPIN);
    }
  }
  openCamera() {
    this.CashDeposit2CustomerName = 'Test User';
    this.validOtp2 = false;
    this.openCameradiv = true;
    setTimeout(() => {
      if (this.cashDepositCanvasEl) {
        this.signaturePadCashDeposit = new SignaturePad(
          this.cashDepositCanvasEl.nativeElement
        );
        this.signaturePadCashDeposit.clear();
      }
    }, 0);
  }

  saveCashDepositSignature(): void {
    this.signatureNeededCashDeposit = this.signaturePadCashDeposit.isEmpty();
    if (!this.signatureNeededCashDeposit) {
      const base64Data = this.signaturePadCashDeposit.toDataURL();
      this.signatureImg = base64Data;

      const blob = this.base64ToBlob(base64Data);
      const formData = new FormData();
      formData.append('file', blob, 'signature.png');

      console.log('Signature ready to upload', formData);
    }
  }

  clearCashDepositSignature(): void {
    this.signaturePadCashDeposit.clear();
    this.signatureNeeded = false;
  }

  @ViewChild('Cashdepost2video')
  CashDeposit2video!: ElementRef<HTMLVideoElement>;
  @ViewChild('CashDepost2photoCanvas')
  CashDeposit2photoCanvas!: ElementRef<HTMLCanvasElement>;

  CashDeposit2capturedImage = '';
  CashDeposit2isPhotoCaptured = false;
  CashDeposit2stream: MediaStream | null = null;
  CashDeposit2startCameraAcc() {
    this.CashDeposit2isPhotoCaptured = false;
    this.cdr.detectChanges(); // Ensure DOM renders <video>

    setTimeout(() => {
      if (!this.CashDeposit2video) {
        console.error('Video element not available yet.');
        return;
      }

      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          this.CashDeposit2stream = stream;
          const videoEl = this.CashDeposit2video.nativeElement;
          videoEl.srcObject = stream;
          videoEl.play();
        })
        .catch((error) => {
          console.error('Camera error:', error.name, error.message);
          alert(`Camera Error: ${error.name} - ${error.message}`);
        });
    }, 100); // Wait for video element to render
    console.log(
      'Camera started for Cash Deposit 2',
      this.CashDeposit2isPhotoCaptured
    );
  }

  // Capture the image
  CashDeposit2CapturePhotoAcc() {
    const videoEl = this.CashDeposit2video.nativeElement;
    const canvasEl = this.CashDeposit2photoCanvas.nativeElement;
    const context = canvasEl.getContext('2d');

    if (context) {
      context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      this.CashDeposit2capturedImage = canvasEl.toDataURL('image/png');
      this.CashDeposit2isPhotoCaptured = true;

      // ✅ Stop the correct camera stream
      if (this.CashDeposit2stream) {
        this.CashDeposit2stream.getTracks().forEach((track) => track.stop());
        this.CashDeposit2stream = null;
      }
    }
  }
  @ViewChild('CashdepostIdcardvideo')
  CashdepostIdcardvideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('CashdepostIdcardphotoCanvas')
  CashdepostIdcardphotoCanvas!: ElementRef<HTMLCanvasElement>;

  CashdepostIdcardcapturedImage = '';
  CashdepostIdcardisPhotoCaptured = false;
  CashdepostIdcardstream: MediaStream | null = null;
  CashdepostIdcardstartCameraAcc() {
    this.CashdepostIdcardisPhotoCaptured = false;
    this.cdr.detectChanges(); // Ensure DOM renders <video>

    setTimeout(() => {
      if (!this.CashdepostIdcardvideo) {
        console.error('Video element not available yet.');
        return;
      }

      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          this.CashdepostIdcardstream = stream;
          const videoEl = this.CashdepostIdcardvideo.nativeElement;
          videoEl.srcObject = stream;
          videoEl.play();
        })
        .catch((error) => {
          console.error('Camera error:', error.name, error.message);
          alert(`Camera Error: ${error.name} - ${error.message}`);
        });
    }, 100); // Wait for video element to render
    console.log(
      'Camera started for Cash Deposit 2',
      this.CashdepostIdcardisPhotoCaptured
    );
  }

  // Capture the image
  CashdepostIdcardCapturePhotoAcc() {
    const videoEl = this.CashdepostIdcardvideo.nativeElement;
    const canvasEl = this.CashdepostIdcardphotoCanvas.nativeElement;
    const context = canvasEl.getContext('2d');

    if (context) {
      context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      this.CashdepostIdcardcapturedImage = canvasEl.toDataURL('image/png');
      this.CashdepostIdcardisPhotoCaptured = true;

      // ✅ Stop the correct camera stream
      if (this.CashdepostIdcardstream) {
        this.CashdepostIdcardstream.getTracks().forEach((track) =>
          track.stop()
        );
        this.CashdepostIdcardstream = null;
      }
    }
  }
  CashdepostIdcardstopCamera() {
    if (this.CashdepostIdcardstream) {
      this.CashdepostIdcardstream.getTracks().forEach((track) => track.stop());
      this.CashdepostIdcardstream = null;
    }
  }
  CashDeposit2stopCamera() {
    if (this.CashDeposit2stream) {
      this.CashDeposit2stream.getTracks().forEach((track) => track.stop());
      this.CashDeposit2stream = null;
    }
  }
  cashDepost2submit() {
    const base64Data = this.signaturePadCashDeposit.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeededCashDeposit = this.signaturePadCashDeposit.isEmpty();
    console.log('signatureNeededCashDeposit', this.signatureNeededCashDeposit);

    if (!this.signatureNeededCashDeposit) {
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
      this.service.GetTokenNo(val).subscribe((data) => {
        console.log('GetTokenNo', data);
        if (
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo']
        ) {
          if (
            this.SelectedServicesID &&
            this.formPersonalInformation.value.phone
          ) {
            this.crossSelling(
              this.SelectedServicesID,
              this.form16.value.MobileNumberCashDeposit,
              data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
              'ServiceTokenNo'
              ]['@TokenNo']
            );
          }
          this.tokenData1 =
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo'];
          this.currentDate = Date();
          //Get TOken ID;
          let val2: any = {
            TokenNo: this.tokenData1,
            ServiceId: this.SelectedServicesID,
          };

          this.service.GetTokenId(val2).subscribe((data) => {
            this.dataList = data;
            this.TokenId = this.dataList['Table'][0]['TokenId'];
            this.SelectedTokenID = this.SelectedService.TokenId;

            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const dd = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${yyyy}${mm}${dd}`;
            const formData = new FormData();

            if (!this.signaturePadCashDeposit.isEmpty()) {
              const signatureBlob = this.base64ToBlob(
                this.signaturePadCashDeposit.toDataURL()
              );
              formData.append(
                'file',
                signatureBlob,
                this.BranchID +
                '-' +
                this.TokenId +
                '-' +
                formattedDate +
                '-signature.png'
              );
            } else {
              alert('Signature is required.');
              return; // Stop submission if signature is missing
            }

            // Append photo only if it's captured and not blank (optional)
            if (
              this.CashDeposit2capturedImage &&
              !this.isBlankImage(this.CashDeposit2capturedImage)
            ) {
              const photoBlob = this.base64ToBlob(
                this.CashDeposit2capturedImage
              );
              formData.append(
                'photo',
                photoBlob,
                this.BranchID +
                '-' +
                this.TokenId +
                '-' +
                formattedDate +
                '-photo.png'
              );
            } else {
              console.log(
                'Photo not captured or blank. Skipping photo upload.'
              );
            }

            // Append IDcard only if it's captured and not blank (optional)
            if (
              this.CashdepostIdcardcapturedImage &&
              !this.isBlankImage(this.CashdepostIdcardcapturedImage)
            ) {
              const IdcardBlob = this.base64ToBlob(
                this.CashdepostIdcardcapturedImage
              );
              formData.append(
                'Idcard',
                IdcardBlob,
                this.BranchID +
                '-' +
                this.TokenId +
                '-' +
                formattedDate +
                '-IdCard.png'
              );
            } else {
              console.log(
                'Photo not captured or blank. Skipping photo upload.'
              );
            }
            this.service
              .UploadSignatureForCashdepost2(formData)
              .subscribe((data) => {
                console.log('data', data);
              });
            this.signatureNeededCashDeposit = false;
            this.signaturePadCashDeposit.clear();
            this.CashDeposit2capturedImage = '';
            this.CashdepostIdcardcapturedImage = '';
            this.CashDeposit2isPhotoCaptured = false;
            this.CashdepostIdcardisPhotoCaptured = false;
            this.CashDeposit2stopCamera();
            this.CashdepostIdcardstopCamera();

            this.signaturePadCashDeposit = new SignaturePad(
              this.canvasEl.nativeElement
            );
          });
          this.ShowDeposit2 = false;
          this.showToken1 = true;
          this.showCashDiv3 = false;
          this.FeedbackStatus();

          setTimeout(() => {
            if (this.FeedbackActive === 'True') {
              showFModalFb();
              hideCashDepost2();

            }
          }, 5000);
        }
      });
    }
  }


  openAnAccountModalPersonalInformation() {
    showopenAnAccountModalPersonalInformation()
    hideopenAnAccountDailogueModal();
  }



  generateSignInUrl(): string {

    // const params = new URLSearchParams({
    //   client_id: environment.REACT_APP_CLIENT_ID,
    //   redirect_uri: environment.REACT_APP_REDIRECT_URI,
    //   response_type: 'code',
    //   scope: 'openid profile email',
    //   acr_values: 'mosip:idp:acr:generated-code mosip:idp:acr:linked-wallet mosip:idp:acr:biometrics',
    //   claims: JSON.stringify({
    //     userinfo: {
    //       name: { essential: true },
    //       phone: { essential: true },
    //       email: { essential: true },
    //       picture: { essential: true },
    //       gender: { essential: true },
    //       birthdate: { essential: true },
    //       address: { essential: true }
    //     },
    //     id_token: {}
    //   }),
    //    code_challenge: 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
    //   code_challenge_method: 'S256',
    //   display: 'page',
    //   nonce: 'g4DEuje5Fx57Vb64dO4oqLHXGT8L8G7g',
    //   state: 'ptOO76SD',
    //   ui_locales: 'en'
    // });
    const params = new URLSearchParams({
      client_id: environment.REACT_APP_CLIENT_ID,
      redirect_uri: environment.REACT_APP_REDIRECT_URI,
      response_type: "code",
      scope: "openid profile email",
      acr_values: "mosip:idp:acr:generated-code mosip:idp:acr:linked-wallet mosip:idp:acr:biometrics",
      claims: '{"userinfo":{"name":{"essential":true},"phone":{"essential":true},"email":{"essential":true},"picture":{"essential":true},"gender":{"essential":true},"birthdate":{"essential":true},"address":{"essential":true}},"id_token":{}}',
      code_challenge: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
      code_challenge_method: "S256",
      display: "page",
      nonce: "g4DEuje5Fx57Vb64dO4oqLHXGT8L8G7g",
      state: "ptOO76SD",
      ui_locales: "en",
    })


    return `${environment.REACT_APP_AUTHORIZATION_ENDPOINT}?${params.toString()}`;
  }

  SigninFayda() {

    const url = this.generateSignInUrl();
    window.location.href = url;

  }

  userInfo: any;
  isUserInfo: boolean = true;
  async handleCallback() {

    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      this.isUserInfo = false;
      let selectedService: any = localStorage.getItem("selected_service");
      let serviceType = selectedService?.split("-")[1];
      const serviceName = serviceType == "AL" ? "Saving" : "Current";
      if (!this.isParentServiceClicked) {
        this.serviceClick(this.Services.find((data: any) => data.ServiceName == serviceName));
        console.log("selected_service[0]", localStorage.getItem("selected_service"))
      } else {

        this.serviceClick(this.Services.find((data: any) => data.ServiceName == selectedService));
        console.log("selected_service[1]", localStorage.getItem("selected_service"))

        try {
          const response = await this.service.fydaToken({ code });
          const data = await jwtDecode(response)
          console.log('Token response:', data);
          this.userInfo = data;
          // setTimeout(() => {
          //   var data = {
          //     "sub": "268503801845194354101114624931981150",
          //     "birthdate": "1980/12/01",
          //     "address": {
          //       "zone": "Nifas Silk Lafto ",
          //       "woreda": "Woreda 04 ",
          //       "region": "Addis Ababa "
          //     },
          //     "gender": "Male",
          //     "name": "Chernet Tadese Bekele",
          //     "picture": "data:image/jpeg;base64,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tJmgBppKKbQIP4qKT+KjNABQaKKACikP3qSgB1FNooAKdTKKAClpKKACij+KigAozTadQAUUU2gB1FJ/CuaWgBd1IaKkjTPzUAUr2HdD/tferJThua6K4Xd1rn5F2TMv+1UsuJbibG2rsZrNjbctXoD8q0BItbqi6MakDU2T726qMxKbTqbQAhooopgQxHctOB+f61SsrjfEvzfN3q6flXd6VCKZFecNE+7HzYqaM/dqK95tVcdirU+Plf8AaoAtinfwtio85anH7tSBVj+8asCq0X8WfWrAoAfS0lFUAtIaWkNADKKKbVCHUU2igB1FFFAwptOptADDTKe9R0APSphUIqQNUgSiniohThVAKacKbQKBDw22nZplFAEgajctR0ZoGP8AvUh+9Tc0ZoAfRxTM0ZoAfRim76N9ADgtLt9aZup3mUAIR8tJQXVm9FpM0ALTqM0ZoAKKTctOoATFGKUU6gCLbSFam4pj/eoAhptPNMoAcKDTaKCgoopKkBacGpmaM0ATZp9QhqkQ/NVASpSn7u6nAKVppoJJYzmn1XRtrVY3cUANNMNPNMoAQ02nU01JQh+7TTTjTDQA01A4qeoTQBTkG1jTKsSrmq5+WpLJg22pkeqoapkNASLQanht1Vg1ShqogmzSimCnCqJFooooEG6jdSGjNABmmlqQ0w/doAHNM30FqZQApamUUUwCnUBaWgBKXG6inCkMAtGKXbTgtAAKAtKFp420AJiilpKAFopKWpKCikoFABTadTaAHUU0Uv8AD6tQAhphp5phqiRyCrMfy1Cg3NU4oAd/dooppoADTDTqbQAlNpxoIagBlFPCUwrtoAbuooNJQIU0UlFAC7qKSigAooooAKKKKAG0UUUAFFFJQAtFFFABRRRQAVYi4T61X/hqxH9xWNADZ923bWPfp82/861pzu96o3Kb0ZaAiUYOauQFt1UIm2ttK4arcb7WqTRmiPuj+9Q4+Td/tUyM7lyKkPzLVGYymt2p1NoEJTacabTAxIP9Gu2iP3T8y1sxncv3qzNRh+VZl+8KsWU3nIG77ag0epYuObSVTzhaSA7kWny/cftkFd1Q2jfukoJLgp9RipBUgVo2+9/vVYDVUi/u1ZFAD6dTaKoB1BooNADKbTqbVCCiiigB1FNooGOptO/hNNNADHqM1IajNAChttSiq4aphUgSinimCniqAWiiigB1FNooEOptFFAwooooASlpKKAFopKWgAopKWgAopKWgA3U6m0UAOpaZTv4qAFpwamCloAdmmGlplACGmU+m0AJS0lLQUJRRRUgNoopKAFFTI22oM1IGoGW0l3Uu5TUCHFSD5aoQ4/L81TI+VqD7y0Ruq0Ek5opaQ0AMNMNPf8Au0w1JQ3dSUHtTf4aAD+KmFadQfu0AV3Wq0gq4V3VA4oGVqeGppH3qQNtqSiwh3LU4aqiH5qmRqALIanhqhRqmBWtCB9JRmigkafu0maDTaBDS+KaWof71MNAC0lNp1ABRSBdzVJimABf9mjFLtp9IYzb8tG2n0UAG2inU2pAcKWkppP96gofSFvl3fw02igA/ip1Ao/9BoAKUUn8NKFoAT7zUYpcf7NN2/LxQAv8NFLtZmpD8tAAah/ip7mmVRJPH81TorGoIhV2Paq/e5oAj2UwrUzsu3ioS1ACU2gt81MLUAPpSy7VqEnn71JuoAmDrRndUNAbbQBIV3VGQyt92nh93Wn7Vb5T/wB9UCIKKHDI2002gB1NoooAKdTaKACikpaACiikoAWkozR96gAopPvbm9KSgB1FNp1AC1NE/wArfLlfvVBSocN/s0APl3bF/WqslXTytU5BimBmyJiX/ZqVDSyr826oxSGaEB+UVY/hqjbuwq4Pu1ISALuoKNSj73tTnf5f9o1RJAaaaUsu72phZdtMD//Z",
          //     "email": "chere@id.et"
          //   }

          //   this.userInfo = data;

          // }, 2000);
        } catch (error) {
          console.error(error);
        }
      }

    }

  }
  resetopenAnAccountDailogueModal() {
    hideopenAnAccountDailogueModal();
    this.isUserInfo = true;
  }

  faydasubmit() {
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

    this.service.GetTokenNo(val).subscribe((data) => {
      if (
        data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
        'ServiceTokenNo'
        ]['@TokenNo']
      ) {
        this.tokenData1 =
          data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
          'ServiceTokenNo'
          ]['@TokenNo'];

        if (
          this.SelectedServicesID &&
          this.formPersonalInformation.value.phone
        ) {
          this.crossSelling(
            this.SelectedServicesID,
            this.formPersonalInformation.value.phone,
            data['Body']['GetTokenNoResult']['GetTokenNoDetails'][
            'ServiceTokenNo'
            ]['@TokenNo']
          );
        }
        this.currentDate = Date();
        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID,
        };

        this.service.GetTokenId(val2).subscribe((data) => {
          this.dataList = data;
          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          let jsonUserDetails = {
            fullName: this.userInfo?.name ?? "",
            surname: "",
            motherName: "",
            email: this.userInfo?.email ?? "",
            phone: "",
            sex: this.userInfo?.gender ?? "",
            streetAddress: JSON.stringify(this.userInfo?.address) ?? "",
            country: "",
            state: "",
            city: "",
            zipCode: "",
            occupation: "",
            accountCurrency: "",
            initialDeposit: "",
            monthlyIncome: "",
          };

          var userDetails = {
            TokenId: this.TokenId,
            BranchId: this.BranchID,
            ServiceId: this.SelectedServicesID,
            MsIsdnNo: "",
            userDetails: JSON.stringify(jsonUserDetails),
          };


          this.service.OpenAcAccount(userDetails).subscribe((data) => {
            if (data.code && data.code == 100) {
              this.showToken1 = true;
              this.sla();
              this.FeedbackStatus();
              setTimeout(() => {
                this.showToken1 = false;
                hideopenAnAccountDailogueModal();
                this.isUserInfo = true;
                if (this.FeedbackActive === 'True') {
                  showFModalFb();
                }
              }, 5000);
            }
          });
        });
      }
    });
  }
}
