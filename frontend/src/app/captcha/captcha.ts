import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CaptchaStateService } from '../core/state/captcha-state'; 

interface ImageTile {
  id: number;
  label: string;
  isCat: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './captcha.html',
  styleUrl: './captcha.css'
})
export class CaptchaComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public stateService = inject(CaptchaStateService);

  currentStageId = 1;
  maxStages = this.stateService.totalStages;
  errorMessage = signal<string | null>(null);

  // Stage 1 State
  mathInput: number | null = null;

  // Stage 2 State (Cat Selection)
  tiles = signal<ImageTile[]>([
    { id: 1, label: '🐱', isCat: true, selected: false },
    { id: 2, label: '🐶', isCat: false, selected: false },
    { id: 3, label: '🚗', isCat: false, selected: false },
    { id: 4, label: '🐱', isCat: true, selected: false },
    { id: 5, label: '🍎', isCat: false, selected: false },
    { id: 6, label: '🐱', isCat: true, selected: false },
  ]);

  // Stage 3 State
  targetCode = 'ANGUL22';
  textInput = '';

  constructor() {
    this.route.params.subscribe(params => {
      this.currentStageId = Number(params['id']) || 1;
      this.errorMessage.set(null);
    });
  }

  getStageTitle(): string {
    switch (this.currentStageId) {
      case 1: return 'Math Challenge';
      case 2: return 'Image Recognition';
      case 3: return 'Text Verification';
      default: return 'Security Challenge';
    }
  }

  getStageDescription(): string {
    switch (this.currentStageId) {
      case 1: return 'Calculate the sum to prove you are human.';
      case 2: return 'Select all tiles containing a cat.';
      case 3: return 'Enter the verification code shown below.';
      default: return '';
    }
  }

  toggleTile(id: number): void {
    this.tiles.update(list => 
      list.map(t => t.id === id ? { ...t, selected: !t.selected } : t)
    );
  }

  validateCurrentStage(): boolean {
    this.errorMessage.set(null);

    if (this.currentStageId === 1) {
      if (this.mathInput !== 27) {
        this.stateService.recordError();
        this.errorMessage.set('Incorrect math answer. Try again.');
        return false;
      }
    }

    if (this.currentStageId === 2) {
      const failed = this.tiles().some(tile => tile.isCat !== tile.selected);
      if (failed) {
        this.stateService.recordError();
        this.errorMessage.set('Incorrect tile selection. Select all cat tiles.');
        return false;
      }
    }

    if (this.currentStageId === 3) {
      if (this.textInput.trim().toUpperCase() !== this.targetCode) {
        this.stateService.recordError();
        this.errorMessage.set('Verification code does not match.');
        return false;
      }
    }

    return true;
  }

  onNext(): void {
    if (!this.validateCurrentStage()) return;

    this.stateService.completeStage(this.currentStageId);

    if (this.currentStageId < this.maxStages) {
      this.router.navigate(['/challenge', this.currentStageId + 1]);
    } else {
      this.stateService.markAsVerified();
      this.router.navigate(['/results']);
    }
  }

  onPrevious(): void {
    if (this.currentStageId > 1) {
      this.errorMessage.set(null);
      this.router.navigate(['/challenge', this.currentStageId - 1]);
    }
  }
}