import { Routes } from '@angular/router';
import { PHome } from './components/pages/p-home/p-home';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: PHome},
    // {path: 'menu', component: },
    // {path: 'deals', component: },
    // {path: 'reservation', component: },
    // {path: 'delivery', component: }
];
