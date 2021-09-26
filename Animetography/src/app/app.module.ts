import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { ReadMoreModule } from 'ng-readmore';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatContenteditableModule } from 'mat-contenteditable';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ValidateService } from './Services/validate.service';
import { AuthService } from './Services/auth.service';
import { PostService } from './Services/post.service';
import { AuthGuard } from './guards/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { EscapeHtmlPipe } from './Pipe/pipe.sanitize';
import { Custom_Ng2SearchPipe } from './Pipe/serach.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAccordion, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { DeleteComponent } from './delete/delete.component';
import { ArchiveComponent } from './archive/archive.component';
import { CreateImageComponent } from './create-image/create-image.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    BlogPageComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BlogEditComponent,
    BlogAddComponent,
    DeleteComponent,
    ArchiveComponent,
    CreateImageComponent,
    BlogPreviewComponent,
    EscapeHtmlPipe,
    Custom_Ng2SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCarouselModule,
    ReadMoreModule,
    NgxSpinnerModule,
    MaterialFileInputModule,
    ShareButtonsModule,
    ShareIconsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule,
    AppRoutingModule,
    CKEditorModule,
    MatContenteditableModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot(),
    NgbModule,
    SwiperModule,
    FontAwesomeModule
  ],
  providers: [
  ValidateService,
  PostService,
  AuthService,
  AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
