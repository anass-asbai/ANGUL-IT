import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CaptchaStateService } from '../core/state/captcha-state';
@Component({
  selector: 'app-result',
  standalone: true,
  templateUrl: './result.html',
  styleUrl: './result.css',
  imports: [RouterLink]
})
export class ResultComponent {
  private router = inject(Router);
  public stateService = inject(CaptchaStateService);

  onRestart(): void {
    this.stateService.resetState();
    this.router.navigate(['/']);
  }
}