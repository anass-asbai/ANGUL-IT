import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CaptchaComponent } from './captcha/captcha';
import { ResultComponent  } from './result/result';
import { captchaStageGuard, resultsGuard } from './core/guards/captcha-guard';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Angul-It | Start'
  },
  { 
    path: 'challenge/:id', 
    component: CaptchaComponent,
    canActivate: [captchaStageGuard],
    title: 'Angul-It | Verification'
  },
  { 
    path: 'results', 
    component: ResultComponent,
    canActivate: [resultsGuard],
    title: 'Angul-It | Success'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];