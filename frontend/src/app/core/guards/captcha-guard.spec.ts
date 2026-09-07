import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { captchaStageGuard } from './captcha-guard';

describe('captchaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => captchaStageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
