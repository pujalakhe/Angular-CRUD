import { Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';

export const routes: Routes = [
  {
    path: ' ',
    redirectTo: 'student',
    pathMatch: 'full',
  },
  { path: 'student', component: StudentComponent },
];
