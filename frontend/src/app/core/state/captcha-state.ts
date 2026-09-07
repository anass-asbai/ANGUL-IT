import { Injectable, effect, signal } from '@angular/core';

interface CaptchaSnapshot {
  currentStage: number;
  completedStages: number[];
  isVerified: boolean;
  numberOfErrors: number;
}

@Injectable({
  providedIn: 'root'
})
export class CaptchaStateService {
  readonly totalStages = 3;
  readonly currentStage = signal(1);
  readonly completedStages = signal<number[]>([]);
  readonly isVerified = signal(false);
  readonly numberOfErrors = signal(0);

  constructor() {
    this.loadState();

    effect(() => {
      const state: CaptchaSnapshot = {
        currentStage: this.currentStage(),
        completedStages: this.completedStages(),
        isVerified: this.isVerified(),
        numberOfErrors: this.numberOfErrors()
      };
      localStorage.setItem('captcha_state', JSON.stringify(state));
    });
  }

  private loadState(): void {
    const saved = localStorage.getItem('captcha_state');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<CaptchaSnapshot>;
      const stage = Number(parsed.currentStage);
      const completed = Array.isArray(parsed.completedStages)
        ? parsed.completedStages.filter((item): item is number => Number.isInteger(item))
        : [];
      const errorCount = parsed.numberOfErrors;

      this.currentStage.set(stage >= 1 && stage <= this.totalStages ? stage : 1);
      this.completedStages.set(completed);
      this.isVerified.set(parsed.isVerified === true);
      this.numberOfErrors.set(Number.isInteger(errorCount) ? (errorCount ?? 0) : 0);
    } catch {
      localStorage.removeItem('captcha_state');
    }
  }

  completeStage(stage: number): void {
    const currentCompleted = this.completedStages();
    if (!currentCompleted.includes(stage)) {
      this.completedStages.set([...currentCompleted, stage]);
    }
    this.currentStage.set(Math.min(stage + 1, this.totalStages));
  }

  markAsVerified(): void {
    this.isVerified.set(true);
  }

  recordError(): void {
    this.numberOfErrors.update((count) => count + 1);
  }

  getSummary(): string {
    const completed = this.completedStages();
    const errorLabel = this.numberOfErrors() === 1 ? 'mistake' : 'mistakes';
    return `You completed ${completed.length} stages with ${this.numberOfErrors()} ${errorLabel}.`;
  }

  resetState(): void {
    this.currentStage.set(1);
    this.completedStages.set([]);
    this.isVerified.set(false);
    this.numberOfErrors.set(0);
    localStorage.removeItem('captcha_state');
  }
}