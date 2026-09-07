import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaStateService {
  currentStage = signal<number>(1);
  completedStages = signal<number[]>([]);
  isVerified = signal<boolean>(false);

  constructor() {
    this.loadState();
    
    effect(() => {
      const state = {
        currentStage: this.currentStage(),
        completedStages: this.completedStages(),
        isVerified: this.isVerified()
      };
      localStorage.setItem('captcha_state', JSON.stringify(state));
    });
  }

  private loadState(): void {
    const saved = localStorage.getItem('captcha_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.currentStage.set(parsed.currentStage || 1);
      this.completedStages.set(parsed.completedStages || []);
      this.isVerified.set(parsed.isVerified || false);
    }
  }

  // Call this when a user successfully passes a CAPTCHA stage
  completeStage(stage: number): void {
     const currentCompleted = this.completedStages();
     if (!currentCompleted.includes(stage)) {
       this.completedStages.set([...currentCompleted, stage]);
     }
     this.currentStage.set(stage + 1);
  }

  // Call this when the final stage is passed
  markAsVerified(): void {
      this.isVerified.set(true);
  }

  // Called by HomeComponent to wipe previous sessions
  resetState(): void {
    this.currentStage.set(1);
    this.completedStages.set([]);
    this.isVerified.set(false);
    localStorage.removeItem('captcha_state');
  }
}