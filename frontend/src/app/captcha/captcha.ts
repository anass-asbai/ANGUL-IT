import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CaptchaStateService } from '../core/state/captcha-state';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './captcha.html',
  styles: [`
    .captcha-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f7fa;
    }
    .card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 550px;
    }
    .captcha-header h2 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    .challenge-workspace {
      margin: 2rem 0;
      padding: 3rem 1.5rem;
      border: 2px dashed #ccc;
      border-radius: 8px;
      text-align: center;
      background-color: #fafafa;
    }
    .placeholder-text {
      color: #888;
      font-weight: 500;
    }
    .action-bar {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .primary {
      background-color: #3f51b5;
      color: white;
    }
    .secondary {
      background-color: #e0e0e0;
      color: #333;
    }
  `]
})
export class Captcha {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public stateService = inject(CaptchaStateService);

  currentStageId: number = 1;

  constructor() {
    // Read the :id route parameter
    this.route.params.subscribe(params => {
      this.currentStageId = +params['id'] || 1;
    });
  }

  onPrevious(): void {
    if (this.currentStageId > 1) {
      this.router.navigate(['/challenge', this.currentStageId - 1]);
    } 
  }

  onNext(): void {
    this.stateService.completeStage(this.currentStageId);
    this.router.navigate(['/challenge', this.currentStageId + 1]);

  }
}