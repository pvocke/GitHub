import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGaurd } from "./auth/auth.gaurd";
import { HomePageComponent } from "./home-page/home-page.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ServiceFormComponent } from "./service-form/service-form.component";


const routes: Routes = [
    
    { path: '', component: HomePageComponent},
    { path: 'admin', component: PostListComponent, canActivate: [AuthGaurd] },
    { path: 'edit/:postId', component: PostCreateComponent},
    { path: 'create', component: PostCreateComponent },
    { path: 'contact', component: ContactFormComponent },
    { path: 'service', component: ServiceFormComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    
   
   
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: [AuthGaurd]
})
export class AppRoutingModule {}
