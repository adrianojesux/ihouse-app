import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public name: string = "";

  constructor(private navCtrl: NavController, auth: AuthProvider) {
    auth.getUser().subscribe((user) => {
      this.name = user.displayName;
    });
  }

  onMensagens(): void {
    this.navCtrl.push('MessagesPage');
  }

  onMyJobs(): void {
    this.navCtrl.push('MyjobsListPage');
  }

  onOfferJobs(): void {
    this.navCtrl.push('JobCategoryPage');
  }

  onSettings(): void {
    this.navCtrl.push('SettingsPage');
  }

  onSearchJobs(): void {
    this.navCtrl.push('SearchJobsPage');
  }
}
