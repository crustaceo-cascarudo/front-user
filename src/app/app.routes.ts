import { Routes } from '@angular/router';
import { PHome } from './components/pages/p-home/p-home';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: PHome}
];
