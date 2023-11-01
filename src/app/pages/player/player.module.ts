import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { Router, RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { SidebarNavigationComponent } from 'src/app/components/sidebar-navigation/sidebar-navigation.component';
import { NavigationButtonComponent } from 'src/app/components/navigation-button/navigation-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarFooterComponent } from 'src/app/components/sidebar-footer/sidebar-footer.component';

@NgModule({
  declarations: [
    PlayerComponent,
    SidebarNavigationComponent,
    NavigationButtonComponent,
    SidebarFooterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes),
  ],
})
export class PlayerModule {}
