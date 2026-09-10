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
  mathQuestion = { a: Math.floor(Math.random() * 20) + 1, b: Math.floor(Math.random() * 20) + 1 };
  
  // Stage 2 State (Cat Selection) - initialized with a random tile grid
  tiles = signal<ImageTile[]>(this.generateRandomTiles());

  // Generates a dynamic random grid of 6 tiles with 2–4 cats and random non-cats
  private generateRandomTiles(): ImageTile[] {
    const catEmojis = ['🐱', '🐈', '😺', '😸', '😻'];
    const nonCatEmojis = ['🐶', '🚗', '🍎', '🐰', '🍔', '🚀', '⚽', '🍕', '🌲', '🐼', '🦊', '🍩', '🛸', '🍉', '🚲'];

    const numCats = Math.floor(Math.random() * 3) + 2; // Pick 2, 3, or 4 cats
    const numNonCats = 6 - numCats;

    const catItems = Array.from({ length: numCats }, () => ({
      label: catEmojis[Math.floor(Math.random() * catEmojis.length)],
      isCat: true
    }));

    const nonCatItems = Array.from({ length: numNonCats }, () => ({
      label: nonCatEmojis[Math.floor(Math.random() * nonCatEmojis.length)],
      isCat: false
    }));

    return [...catItems, ...nonCatItems]
      .sort(() => Math.random() - 0.5) // Shuffle
      .map((item, index) => ({
        id: index + 1,
        label: item.label,
        isCat: item.isCat,
        selected: false
      }));
  }

  generateCaptchaCode(length: number = 6): string {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let targetCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      targetCode += characters[randomIndex];
    }

    return targetCode;
  }
  
  targetCode = this.generateCaptchaCode();
  textInput = '';

  constructor() {
    this.route.params.subscribe(params => {
      this.currentStageId = Number(params['id']) || 1;
      this.errorMessage.set(null);

      // Regenerate random tiles every time Stage 2 is loaded
      if (this.currentStageId === 2) {
        this.tiles.set(this.generateRandomTiles());
      }
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
      if (this.mathInput !== this.mathQuestion.a + this.mathQuestion.b) {
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
        // Generate new random tiles on failure
        this.tiles.set(this.generateRandomTiles());
        return false;
      }
    }

    if (this.currentStageId === 3) {
      if (this.textInput !== this.targetCode) {
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