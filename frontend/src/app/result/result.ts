import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../core/state/captcha-state';

@Component({
  selector: 'app-result',
  standalone: true,
  template: `
    <main class="result-container">
      <div class="card">
        <div class="badge">✓</div>
        <h1>Verification Complete</h1>
        <p>You have successfully passed all security challenges.</p>

        <!-- Summary Area (Add stats, time taken, or challenge breakdown here) -->
        <section class="summary-box">
          <p class="placeholder-text">[ Results Summary Details Go Here ]</p>
        </section>

        <button class="primary-btn" (click)="onRestart()">
          Restart Challenge
        </button>
      </div>
    </main>
  `,
  styles: [`
    .result-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f7fa;
    }
    .card {
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    .badge {
      width: 60px;
      height: 60px;
      background-color: #4caf50;
      color: white;
      font-size: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem auto;
    }
    .summary-box {
      margin: 2rem 0;
      padding: 2rem 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .placeholder-text {
      color: #888;
    }
    .primary-btn {
      padding: 0.75rem 2rem;
      font-size: 1.1rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  `]
})
export class ResultComponent {
  private router = inject(Router);
  private stateService = inject(CaptchaStateService);

  onRestart(): void {
    // TODO: Add your reset logic here
    this.stateService.resetState();
    this.router.navigate(['/']);
  }
}