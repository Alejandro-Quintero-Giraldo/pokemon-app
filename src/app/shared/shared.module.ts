import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderImageComponent } from './loader-image/loader-image.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LoaderImageComponent,
    ToastComponent
  ],
  declarations: [
    SidebarComponent,
    LoaderImageComponent,
    ToastComponent
  ],
  providers: [],
})
export class SharedModule { }
