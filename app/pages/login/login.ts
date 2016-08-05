import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  showRegister:boolean = false;
  btnText:string = 'Registrarse';
  constructor(private nav: NavController) {
    
  }

  toggleLogin(){
    if(this.showRegister){
      this.showRegister = false;
      this.btnText = 'Registrarse'
    }else{
      this.showRegister = true;
      this.btnText = 'Iniciar Sesion'
    }
  }

}
