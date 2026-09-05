import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Captcha } from './captcha/captcha';
import { Result } from './result/result';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Angul-It | Start'
  },
  { 
    path: 'challenge/:id', 
    component: Captcha,
    title: 'Angul-It | Verification'
  },
  { 
    path: 'results', 
    component: Result,
    title: 'Angul-It | Success'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];