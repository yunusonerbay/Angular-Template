import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginGuard } from '../shared/guards/login.guard';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [

    {
        path: '',
        component: DashboardComponent,
        data: {
            title: 'Dashboard',
        },
      },
    {
        path: 'transaction',
        component: TransactionComponent,
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
