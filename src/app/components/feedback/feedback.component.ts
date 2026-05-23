import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

declare function showFModalFb(): any;
declare function hideFModalFb(): any;
declare function showSecondModalFb(): any;

const IDLE_TIMEOUT_MS = 20000; // 20s of no activity → auto close

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FeedbackComponent implements OnDestroy {

  @Input() branchId: any;
  @Input() getValueForCaption!: (key: string) => string;
  @Output() done = new EventEmitter<void>();

  FeedbackRadio: FormGroup;
  feedbackForm: FormGroup;
  emojiRating = new FormControl('', Validators.required);

  ShowFeedbackdiv1  = true;
  showSuggetionDiv1 = false;
  showSuggetion1    = false;
  errorMessageFB    = '';

  private feedbackIdleTimeout: any;

  // Bound reference so we can removeEventListener cleanly
  private activityListener = () => this.resetIdleTimeout();

  constructor(private fb: FormBuilder, private service: SharedService) {
    this.FeedbackRadio = this.fb.group({
      transactionTypeFS: ['Feedback', Validators.required],
    });

    this.feedbackForm = this.fb.group({
      feedback:    [''],
      name:        [''],
      emojiRating: this.emojiRating,
    });
  }

  open() {
    this.reset(false);
    showFModalFb();
    this.startActivityTracking();  // ← start listening for user activity
    this.resetIdleTimeout();       // ← start the countdown
  }

  setRating(rating: number) {
    this.emojiRating.setValue(rating.toString());
    this.emojiRating.markAsTouched();
    this.emojiRating.updateValueAndValidity();
    this.resetIdleTimeout();       // ← rating tap = activity, reset countdown
  }

  SubmitRate() {
    if (this.feedbackForm.valid) {
      this.sendFeedback();
    } else {
      this.touchAll(this.feedbackForm);
    }
  }

  SubmitRate1() {
    if (this.feedbackForm.valid) {
      this.showSuggetion1 = true;
      this.sendSuggestion();
    } else {
      this.touchAll(this.feedbackForm);
    }
  }

  handleRadioButtonClick3(value: string) {
    if (value === 'Feedback') {
      this.showSuggetionDiv1 = false;
      this.ShowFeedbackdiv1  = true;
      this.feedbackForm.get('feedback')?.clearValidators();
      this.feedbackForm.get('feedback')?.updateValueAndValidity();
    } else {
      this.showSuggetionDiv1 = false;
      this.ShowFeedbackdiv1  = false;
    }
  }

  handleRadioButtonClick4(value: string) {
    if (value === 'Suggetion') {
      this.ShowFeedbackdiv1  = false;
      this.showSuggetionDiv1 = true;
      this.feedbackForm.get('feedback')?.setValidators([Validators.required]);
      this.feedbackForm.get('feedback')?.updateValueAndValidity();
    } else {
      this.ShowFeedbackdiv1  = false;
      this.showSuggetionDiv1 = false;
    }
  }

  closeAndReset() {
    this.stopActivityTracking();
    clearTimeout(this.feedbackIdleTimeout);
    this.reset(true);
  }

  ngOnDestroy() {
    // Clean up listeners if component is destroyed mid-session
    this.stopActivityTracking();
    clearTimeout(this.feedbackIdleTimeout);
  }

  // ─── Private ─────────────────────────────────────────────

  // Attach listeners to the modal so ANY interaction restarts the timer:
  // typing, tapping, scrolling, mouse movement inside the modal
  private startActivityTracking() {
    const modal = document.getElementById('exampleModalFB');
    if (!modal) return;
    modal.addEventListener('keydown',    this.activityListener);
    modal.addEventListener('input',      this.activityListener);
    modal.addEventListener('touchstart', this.activityListener);
    modal.addEventListener('click',      this.activityListener);
    modal.addEventListener('mousemove',  this.activityListener);
  }

  private stopActivityTracking() {
    const modal = document.getElementById('exampleModalFB');
    if (!modal) return;
    modal.removeEventListener('keydown',    this.activityListener);
    modal.removeEventListener('input',      this.activityListener);
    modal.removeEventListener('touchstart', this.activityListener);
    modal.removeEventListener('click',      this.activityListener);
    modal.removeEventListener('mousemove',  this.activityListener);
  }

  // Clear and restart the countdown — called on every user activity
  private resetIdleTimeout() {
    clearTimeout(this.feedbackIdleTimeout);
    this.feedbackIdleTimeout = setTimeout(() => {
      this.stopActivityTracking();
      const modal = document.getElementById('exampleModalFB');
      if (modal) {
        const btn = modal.querySelector('.close-btn') as HTMLElement;
        btn ? btn.click() : (hideFModalFb(), this.done.emit());
      } else {
        hideFModalFb();
        this.done.emit();
      }
    }, IDLE_TIMEOUT_MS);
  }

  private sendFeedback() {
    this.errorMessageFB = '';
    const val = {
      Name:     this.feedbackForm.value.name,
      BranchID: this.branchId,
      Details:  this.feedbackForm.value.feedback,
      Type:     this.FeedbackRadio.value.transactionTypeFS,
      Rating:   this.feedbackForm.value.emojiRating,
    };

    this.service.SendFeedback(val).subscribe(
      (data: any) => {
        const response = data ? data['status_code'] : null;
        if (response == 100) {
          this.stopActivityTracking();   // user is done, stop tracking
          clearTimeout(this.feedbackIdleTimeout);
          hideFModalFb();
          showSecondModalFb();
          setTimeout(() => {
            const modal = document.getElementById('exampleModalFB2');
            if (modal) {
              const btn = modal.querySelector('.close-btn') as HTMLElement;
              if (btn) btn.click();
            }
            this.done.emit();
          }, 3000);
        } else {
          this.errorMessageFB = 'Invalid form submission. Please try again.';
        }
      },
      () => { this.errorMessageFB = 'Something went wrong. Try again later'; }
    );
  }

  private sendSuggestion() {
    this.errorMessageFB = '';
    const val = {
      Name:     this.feedbackForm.value.name,
      BranchID: this.branchId,
      Details:  this.feedbackForm.value.feedback,
      Type:     this.FeedbackRadio.value.transactionTypeFS,
      Rating:   this.feedbackForm.value.emojiRating,
    };

    this.service.SendFeedback(val).subscribe(
      (data: any) => {
        const response = data ? data['status_code'] : null;
        if (response == 100) {
          this.stopActivityTracking();   // user is done, stop tracking
          clearTimeout(this.feedbackIdleTimeout);
          setTimeout(() => {
            const modal = document.getElementById('exampleModalFB');
            if (modal) {
              const btn = modal.querySelector('.close-btn') as HTMLElement;
              if (btn) btn.click();
            }
            this.done.emit();
          }, 3000);
        } else {
          this.errorMessageFB = 'Invalid form submission. Please try again.';
        }
      },
      () => { this.errorMessageFB = 'Something went wrong. Try again later'; }
    );
  }

  private reset(emitDone: boolean) {
    this.feedbackForm.reset();
    this.FeedbackRadio.reset();
    this.FeedbackRadio.patchValue({ transactionTypeFS: 'Feedback' });
    this.ShowFeedbackdiv1  = true;
    this.showSuggetionDiv1 = false;
    this.showSuggetion1    = false;
    this.errorMessageFB    = '';
    this.feedbackForm.get('feedback')?.clearValidators();
    this.feedbackForm.get('feedback')?.updateValueAndValidity();
    if (emitDone) this.done.emit();
  }

  private touchAll(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) this.touchAll(control);
    });
  }
}