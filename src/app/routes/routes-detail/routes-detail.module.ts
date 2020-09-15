import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutesDetailPageRoutingModule } from './routes-detail-routing.module';

import { RoutesDetailPage } from './routes-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [RoutesDetailPage]
})
export class RoutesDetailPageModule {}
