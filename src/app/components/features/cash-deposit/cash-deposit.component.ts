import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { Observable, retry } from 'rxjs';

declare function showCashDepositModal(): any;
declare function hideCashDepositModal(): any;
declare function showFirstModalCP(): any;   // Get Token modal

// ─── Step enum ────────────────────────────────────────────
export enum CashDepositStep {
  DepositType   = 1,
  Identification = 2,
  AmountInput   = 3,
  OtpVerify     = 4,
  KycScan       = 5,
  Signature     = 6,
  TokenDisplay  = 7,
}

@Component({
  selector: 'app-cash-deposit',
  templateUrl: './cash-deposit.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CashDepositComponent implements OnDestroy {

  @Input() branchId: any;
  @Input() getValueForCaption!: (key: string) => string;
  @Output() proceedToToken = new EventEmitter<void>();

  // Expose enum to template
  Step = CashDepositStep;
  TOTAL_STEPS = 7;

  // Current step
  currentStep: CashDepositStep = CashDepositStep.DepositType;

  // Step 1 — Deposit type
  depositorType: 'holder' | 'third-party' | null = null;

  // Step 2 — Identification form
  identForm: FormGroup;
  identSubmitted = false;

  // Step 3 — Amount form
  amountForm: FormGroup;
  amountSubmitted = false;

  // Step 4 — OTP
  otp: string[] = ['', '', '', ''];
  otpSent = false;
  otpError = '';
  resendCooldown = 0;
  private resendTimer: any;

  // Step 5 — KYC
  idScanned   = false;
  selfieTaken = false;
  kycSimulating = false;

  // Step 6 — Signature
  hasSigned = false;

  // Step 7 — Token display
  generatedToken = '';
  transactionRef  = '';

  // Shared UI state
  isLoading    = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private service: SharedService) {
    this.identForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber:  ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
    });

    this.amountForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(10000000)]],
    });
  }

  // Called by HomeComponent's serviceClick()
  open() {
    this.resetState();
    showCashDepositModal();
  }

  close() {
    hideCashDepositModal();
    this.resetState();
  }

  get progressPercent(): number {
    return Math.round((this.currentStep / this.TOTAL_STEPS) * 100);
  }

  get canGoBack(): boolean {
    return this.currentStep > CashDepositStep.DepositType && this.currentStep !== CashDepositStep.TokenDisplay;
  }

  goBack() {
    if (this.canGoBack) {
      this.currentStep--;
      this.errorMessage = '';
    }
  }

  // ─── Step 1: Deposit Type ──────────────────────────────
  selectDepositorType(type: 'holder' | 'third-party') {
    this.depositorType = type;
    this.errorMessage  = '';
    this.advance();
  }

  // ─── Step 2: Identification ────────────────────────────
  get identF(): { [key: string]: AbstractControl } { return this.identForm.controls; }

  submitIdentification() {
    this.identSubmitted = true;
    if (this.identForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    // DUMMY API — replace with real service call
    this.dummyApi({ endpoint: 'ValidateAccount', payload: this.identForm.value }, 1200).subscribe(
      () => {
        this.isLoading = false;
        this.sendOtp();   // pre-trigger OTP send before moving to step 4
        this.advance();
      },
      () => {
        this.isLoading = false;
        this.errorMessage = 'Account not found. Please check your details.';
      }
    );
  }

  // ─── Step 3: Amount Input ──────────────────────────────
  get amountF(): { [key: string]: AbstractControl } { return this.amountForm.controls; }

  submitAmount() {
    this.amountSubmitted = true;
    if (this.amountForm.invalid) return;
    this.advance();
  }

  // ─── Step 4: OTP ──────────────────────────────────────
  sendOtp() {
    // DUMMY API — replace with real SMS OTP service call
    this.dummyApi({ endpoint: 'SendOtp', payload: { mobile: this.identForm.value.mobileNumber } }, 800).subscribe(
      () => {
        this.otpSent = true;
        this.startResendCooldown();
      }
    );
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val   = input.value.replace(/\D/g, '');
    this.otp[index] = val;

    // Auto-advance focus to next box
    if (val && index < 3) {
      const next = document.getElementById(`otp-box-${index + 1}`) as HTMLInputElement;
      next?.focus();
    }
    this.otpError = '';
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    // Backspace goes to previous box
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      const prev = document.getElementById(`otp-box-${index - 1}`) as HTMLInputElement;
      prev?.focus();
    }
  }

  resendOtp() {
    if (this.resendCooldown > 0) return;
    this.otp = ['', '', '', ''];
    this.otpError = '';
    this.sendOtp();
  }

  submitOtp() {
    this.isLoading = false; this.advance();
    return;
    const code = this.otp.join('');
    if (code.length < 4) { this.otpError = 'Please enter the 4-digit code.'; return; }
    this.isLoading = true;
    this.otpError  = '';

    // DUMMY API — accepts any 4-digit code for simulation
    // Replace with: this.service.VerifyOtp({ otp: code, mobile: this.identForm.value.mobileNumber })
    this.dummyApi({ endpoint: 'VerifyOtp', payload: { code } }, 1000).subscribe(
      () => { this.isLoading = false; this.advance(); },
      () => { this.isLoading = false; this.otpError = 'Invalid code. Please try again.'; }
    );
  }

  private startResendCooldown(seconds = 30) {
    this.resendCooldown = seconds;
    this.resendTimer = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) clearInterval(this.resendTimer);
    }, 1000);
  }

  // ─── Step 5: KYC / ID Scan ────────────────────────────
  simulateScanId() {
    this.kycSimulating = true;
    // DUMMY — simulate scan delay
    // Replace with: this.service.ScanIdDocument(...)
    this.dummyApi({ endpoint: 'ScanId', payload: {} }, 2000).subscribe(() => {
      this.idScanned     = true;
      this.kycSimulating = false;
    });
  }

  simulateSelfie() {
    this.kycSimulating = true;
    // DUMMY — simulate camera capture delay
    // Replace with: this.service.CaptureSelfie(...)
    this.dummyApi({ endpoint: 'CaptureSelfie', payload: {} }, 1500).subscribe(() => {
      this.selfieTaken   = true;
      this.kycSimulating = false;
    });
  }

  submitKyc() {
    if (!this.idScanned || !this.selfieTaken) {
      this.errorMessage = 'Please complete both ID scan and selfie before continuing.';
      return;
    }
    this.errorMessage = '';
    this.advance();
  }

  // ─── Step 6: Signature ────────────────────────────────
  simulateSign() {
    // In production: integrate a canvas signature pad
    // Replace with real signature capture: e.g. signature_pad library
    this.hasSigned = true;
  }

  clearSignature() {
    this.hasSigned = false;
  }

  submitSignature() {
    if (!this.hasSigned) { this.errorMessage = 'Please sign before continuing.'; return; }
    this.errorMessage = '';
    this.isLoading    = true;

    // DUMMY API — final deposit submission
    // Replace with: this.service.SubmitCashDeposit({ ...all collected data })
    const payload = {
      depositorType:  this.depositorType,
      accountNumber:  this.identForm.value.accountNumber,
      mobileNumber:   this.identForm.value.mobileNumber,
      amount:         this.amountForm.value.amount,
      branchId:       this.branchId,
    };

    this.dummyApi({ endpoint: 'SubmitCashDeposit', payload }, 1800).subscribe(
      (res: any) => {
        this.isLoading      = false;
        this.generatedToken = res.token;
        this.transactionRef = res.ref;
        this.advance();
      },
      () => {
        this.isLoading    = false;
        this.errorMessage = 'Submission failed. Please try again.';
      }
    );
  }

  // ─── Step 7: Token Display → open Get Token modal ─────
  finishAndGetToken() {
    hideCashDepositModal();
    this.proceedToToken.emit();   // HomeComponent opens Get Token modal
  }

  // ─── Private helpers ──────────────────────────────────
  private advance() {
    if (this.currentStep < this.TOTAL_STEPS) {
      this.currentStep++;
      this.errorMessage = '';
    }
  }

  private resetState() {
    this.currentStep    = CashDepositStep.DepositType;
    this.depositorType  = null;
    this.identSubmitted = false;
    this.amountSubmitted = false;
    this.otp            = ['', '', '', ''];
    this.otpSent        = false;
    this.otpError       = '';
    this.resendCooldown = 0;
    this.idScanned      = false;
    this.selfieTaken    = false;
    this.kycSimulating  = false;
    this.hasSigned      = false;
    this.generatedToken = '';
    this.transactionRef = '';
    this.isLoading      = false;
    this.errorMessage   = '';
    this.identForm.reset();
    this.amountForm.reset();
    clearInterval(this.resendTimer);
  }

  // ─── DUMMY API SIMULATOR ──────────────────────────────
  // Simulates HTTP call with delay. Always succeeds EXCEPT OTP "0000" fails.
  // Replace each call site with the real this.service.XxxMethod(payload) call.
  private dummyApi(req: { endpoint: string; payload: any }, delayMs: number) {
  return new Observable((observer: any) => {
    setTimeout(() => {

      if (req.endpoint === 'VerifyOtp' ) {

        observer.error('Invalid OTP');

      } else if (req.endpoint === 'SubmitCashDeposit') {

        observer.next({
          token: `CD-${Math.floor(1000 + Math.random() * 9000)}`,
          ref: `TXN${Date.now()}`
        });

        observer.complete();

      } else {

        observer.next({ success: true });
        observer.complete();

      }

    }, delayMs);
  });
}

get stepLabel(): string {
  const labels: Record<number, string> = {
    1: 'Depositor Type',
    2: 'Account Identification',
    3: 'Deposit Amount',
    4: 'OTP Verification',
    5: 'Identity Verification',
    6: 'Electronic Signature',
    7: 'Confirmation',
  };
  return labels[this.currentStep] ?? '';
}
 

  ngOnDestroy() {
    clearInterval(this.resendTimer);
  }
}