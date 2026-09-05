import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
// Assume you have generated this state service in the core folder
import { CaptchaStateService } from '../core/state/captcha-state'; 

@Component({
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomeComponent {
  private router = inject(Router);
  private stateService = inject(CaptchaStateService);

  startChallenge(): void {
    // 1. Wipe out any old progress in local storage/signals
    this.stateService.resetState();
    
    // 2. Navigate to the first stage of the CAPTCHA funnel
    this.router.navigate(['/challenge/1']);
  }
}