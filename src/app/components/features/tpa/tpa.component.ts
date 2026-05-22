import { Component, Input, Output, EventEmitter } from '@angular/core';

// JS modal functions - defined in main.js
declare function showTPAPopupModal(): any;
declare function hideTPAPopupModal(): any;
declare function showFirstModalCP(): any;   // Get Token modal opener (stays in main.js)

@Component({
  selector: 'app-tpa',
  templateUrl: './tpa.component.html',
  styleUrls: ['./tpa.component.css'],
})
export class TpaComponent {

  // Pass HomeComponent's caption resolver in so TPA can use getValueForCaption()
  // without duplicating the captions API call
  @Input() getValueForCaption!: (key: string) => string;

  // Fired when TPA checks pass and Get Token modal should open
  @Output() proceedToToken = new EventEmitter<void>();

  // All TPA state - no longer lives in HomeComponent
  showTPAMessage          = false;
  showEligibilityMessage  = false;
  showEligibilityNoMessage = false;

  // Called by HomeComponent's serviceClick() when ServiceName === 'TPA'
  open() {
    this.showTPAMessage           = false;
    this.showEligibilityMessage   = false;
    this.showEligibilityNoMessage = false;
    showTPAPopupModal();
  }

  // --- Step 1: Have you collected estimation? ---
  onTPAYes() {
    this.showTPAMessage           = false;
    this.showEligibilityNoMessage = false;
    this.showEligibilityMessage   = true;   // move to step 2
  }

  onTPANo() {
    this.showEligibilityMessage   = false;
    this.showEligibilityNoMessage = false;
    this.showTPAMessage           = true;   // show "go to estimation desk" warning
  }

  // --- Step 2: Have you checked eligibility? ---
  onEligibilityYes() {
    // All checks passed → close TPA modal, open Get Token modal
    hideTPAPopupModal();
    this.proceedToToken.emit();
  }

  onEligibilityNo() {
    this.showTPAMessage         = false;
    this.showEligibilityMessage = false;
    this.showEligibilityNoMessage = true;  // show "visit URL" warning
  }

  // OK button on estimation warning - just closes back to initial state
  dismissEstimationWarning() {
    hideTPAPopupModal();
    this.showTPAMessage = false;
  }
}