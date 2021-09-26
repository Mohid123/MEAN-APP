import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { DeleteComponent } from './delete/delete.component';
import { ArchiveComponent } from './archive/archive.component';
import { CreateImageComponent } from './create-image/create-image.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
{path: 'blog-page', component: BlogPageComponent},
{path: 'blog-page/:id', component: BlogPageComponent},
{path: 'blog-preview', component: BlogPreviewComponent},
{path: 'archive', component: ArchiveComponent},
{path: 'create-image', component: CreateImageComponent},
{path: 'delete-post/:id', component: DeleteComponent},
{path: 'landing-page', component: LandingPageComponent},
{path: 'register', component: RegisterComponent},
{path: 'login', component: LoginComponent},
{path: 'blog-edit', component: BlogEditComponent, canActivate: [AuthGuard]},
{path: 'blog-edit/:id', component: BlogEditComponent, canActivate: [AuthGuard]},
{path: 'blog-add', component: BlogAddComponent, canActivate: [AuthGuard]},
{path: '', redirectTo: '/landing-page', pathMatch: 'full'}
];
