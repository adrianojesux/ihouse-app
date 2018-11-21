import { UserInterface } from './../../interfaces/user';
import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Dialog } from './../../providers/dialog/dialog';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ModalController, ViewController } from 'ionic-angular';
import { Job } from '../../interfaces/job';

@IonicPage()
@Component({
  selector: 'page-myjob-content',
  templateUrl: 'myjob-content.html',
})
export class MyJobContentPage {
  myJob: Job;
  view: boolean;

  constructor(navParams: NavParams, private viewCtrl: ViewController, private navCtrl: NavController, private base64: Base64,private auth: AuthProvider, private db: DatabaseProvider, private camera: Camera, private dialog: Dialog,private angularFireDB: AngularFireDatabase,) {
    this.myJob = navParams.data.job;
    this.view = navParams.data.view;
  }

  addPhoto(){
    const options: CameraOptions = {
      quality: 100,
      cameraDirection: 1,
      targetHeight: 400,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let photo = "data:image/jpeg;base64," + imageData;  
      this.base64.encodeFile(photo).then((imgBase64: string) => {
        console.log("encodeFile", imgBase64);
        this.myJob.urlPhoto = imgBase64;
      }).catch(err => {
        console.log("Falha ao converte imagem");
        this.dialog.presentAlert(err);
      });
    }, (err) => {
      this.dialog.presentAlert(err);
    });
  }

  completeJob(){
    if(!!this.myJob.urlPhoto || this.myJob.urlPhoto === ""){
      this.dialog.presentAlert('Add a photo of your work');
    }else{
      this.myJob.hasCompleted = true;
      this.update();
    }
  }

  update(){
    this.dialog.showLoading()
    this.angularFireDB.list("/jobs", (ref) =>
    ref.orderByChild('employerID').equalTo(this.myJob.employerID)
    ).snapshotChanges(['child_added']).subscribe(res => {
      console.log('JOBS', res)
      res.forEach(j => {
        if(j.payload.val()['hasAccepted'] == false && j.payload.val()['timestamp'] == this.myJob.timestamp && j.payload.val()['category'].id == this.myJob.category.id){
          this.myJob.hasCompleted = true;
          this.dialog.hideLoading()
          this.navCtrl.popToRoot();
        }
      })
    });
  }

  back(){
    this.viewCtrl.dismiss();
  }


}
