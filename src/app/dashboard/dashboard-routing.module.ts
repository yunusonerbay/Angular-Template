import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoTwoDashboardComponent } from './demo-two/demo-two.component';
import { LoginGuard } from '../shared/guards/login.guard';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            title: 'Yunus dashboard',
        }
    },
    {
        path: 'demo-two',
        component: DemoTwoDashboardComponent,
        data: {
            title: 'Yunus',
        },
        //  canActivate: [LoginGuard],
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {

}
