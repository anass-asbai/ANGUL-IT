import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../state/captcha-state';

export const captchaStageGuard: CanActivateFn = (route) => {
  const stateService = inject(CaptchaStateService);
  const router = inject(Router);
  const targetStage = Number(route.paramMap.get('id')) || 1;

  if (targetStage < 1 || targetStage > stateService.totalStages || targetStage > stateService.currentStage()) {
    return router.createUrlTree(['/challenge', stateService.currentStage()]);
  }
  return true;
};

export const resultsGuard: CanActivateFn = () => {
  const stateService = inject(CaptchaStateService);
  const router = inject(Router);

  if (!stateService.isVerified()) {
    return router.createUrlTree(['/challenge', stateService.currentStage()]);
  }
  return true;
};