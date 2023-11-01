import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { Router, RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { SidebarNavigationComponent } from 'src/app/components/sidebar-navigation/sidebar-navigation.component';
import { NavigationButtonComponent } from 'src/app/components/navigation-button/navigation-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarFooterComponent } from 'src/app/components/sidebar-footer/sidebar-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';

@NgModule({
  declarations: [
    PlayerComponent,
    SidebarNavigationComponent,
    NavigationButtonComponent,
    SidebarFooterComponent,
    HomeComponent,
    TopArtistsComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes),
  ],
})
export class PlayerModule {}
