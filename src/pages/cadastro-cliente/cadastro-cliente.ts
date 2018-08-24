import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CadastroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  public usuario = {
    nome: "",
    email: "",
    endereco: "",
    tel: "",
    senha: "",
    confirmSenha: ""
  }

  constructor(
    public navCtrl: NavController,
    public dialogo: DialogoProvider,
    private alertCtrl: AlertController,
    private auth: AngularFireAuth
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroClientePage');
  }

  onRegister() {
    let me = this;
    if (this.usuario.senha !== this.usuario.confirmSenha) {
      this.dialogo.presentAlert("As senhas não conferem");
    } else {
      let alert = this.alertCtrl.create();
      alert.present();
      this.auth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)
        .then((res) => {
          alert.dismiss();
          console.log(res);
          if (res) {
            me.dialogo.presentAlert("Cadastro realizado com sucesso!");
            me.navCtrl.pop();
          } else {
            me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
          }
        }).catch((error) => {
          alert.dismiss();
          me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
          console.error(error);
        })
    }
  }

}