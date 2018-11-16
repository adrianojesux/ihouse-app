import { UserInterface } from './../../interfaces/user';
import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Dialog } from '../../providers/dialog/dialog';
import { Job } from '../../interfaces/job';


@IonicPage()
@Component({
  selector: 'page-myjobs-list',
  templateUrl: 'myjobs-list.html',
})
export class MyjobsListPage {
  myJobs: Job[] = [];

  constructor(
    private navCtrl: NavController,
    private dialog: Dialog,
    private auth: AuthProvider,
    private database: DatabaseProvider,
    private navParams: NavParams
  ) { }

  ionViewDidLoad(): void {
    this.dialog.showLoading();
    this.auth.getUser().subscribe((user) => {
      if(user){
        this.database.getUserByID(user.uid).subscribe((u: UserInterface)=>{
          if(u.type == 'employer'){
            this.database.getJobsByEmployer<Job>(user.uid).subscribe((jobs) => {
              console.log(jobs);
              this.myJobs = jobs;
              this.dialog.hideLoading();
            }, (err) => {
              this.dialog.presentAlert(err.message);
            });
          } else {
            this.database.getJobsByEmployee<Job>(user.uid).subscribe((jobs) => {
              console.log(jobs);
              this.myJobs = jobs;
              this.dialog.hideLoading();
            }, (err) => {
              this.dialog.presentAlert(err.message);
            });  
          }
        })
      }      
    });
  }

  onVerDetalhes(job: Job): void {
    this.navCtrl.push('MyJobContentPage', { job: job });
  }
}
