import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { DemoOneDashboardComponent } from './demo-one/demo-one.component';
import { DemoTwoDashboardComponent } from './demo-two/demo-two.component';
import { LoginGuard } from '../shared/guards/login.guard';
//import { DemoThreeComponent } from './demo-three/demo-three.component';
// import { DemoFourComponent } from './demo-four/demo-four.component';

const routes: Routes = [
    // {
    //     path: 'demo-one',
    //     component: DemoOneDashboardComponent,
    //     data: {
    //         title: 'Demo One ',
    //     }
    // },
    {
        path: 'demo-two',
        component: DemoTwoDashboardComponent,
        data: {
            title: 'Yunus',
        }, canActivate: [LoginGuard],
    },
    // {
    //     path: 'demo-three',
    //     component: DemoThreeComponent,
    //     data: {
    //         title: 'Demo Three',
    //     }
    // },
    // {
    //     path: 'demo-four',
    //     component: DemoFourComponent,
    //     data: {
    //         title: 'Demo Four',
    //     }
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {

}
