import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// Assume you have generated this state service in the core folder
import { CaptchaStateService } from '../core/state/captcha-state'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomeComponent {
  private router = inject(Router);
  private stateService = inject(CaptchaStateService);

  startChallenge(): void {
    this.stateService.resetState();
    this.router.navigate(['/challenge/1']);
  }
}