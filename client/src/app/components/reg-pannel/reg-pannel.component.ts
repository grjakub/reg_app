import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { info } from '../../informationSet/mock-info';
import { Information } from '../../informationSet/info';
import { validInfo } from '../../validinfo/mock-valid-info';
import { ValidInformation } from '../../validinfo/validinfo';


@Component({
  selector: 'app-reg-pannel',
  templateUrl: './reg-pannel.component.html',
  styleUrls: ['./reg-pannel.component.scss']
})
export class RegPannelComponent implements OnInit {

form: FormGroup
logoPath:string
logoAlt:string 
public infoSet: Information;
public setText: Information;
public setValidText: ValidInformation;

 constructor(
   private formBuilder:FormBuilder,
   private authService: AuthService,
   ) { 
     this.logoPath = "/../../assets/images/logo.png";
     this.logoAlt = "nazwa firmy";
     this.createForm();
  }

createForm() {
  console.log(info[0] + '<--');
  this.setText = info[0];
  this.setValidText = validInfo[0];
  
  this.form = this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      this.validatorEmail
    ])],
    first_name:  ['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ])],
    last_name:  ['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(39)
    ])],
    textarea_1: '',
    textarea_2: '',
    ticket: '',
    password:  ['', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ])]
  })
}

validatorEmail(control) {
  const validValue = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)
  validValue.test(control.value);
  if(validValue.test(control.value)) {
    return null;
  } else {
    return {'validatorEmail': true}
  }
}

onRegisterSubmit(){
const user = {
  first_name: this.form.get('first_name').value,
  last_name: this.form.get('last_name').value,
  ticket: this.form.get('ticket').value,
  textarea_1: this.form.get('textarea_1').value,
  textarea_2: this.form.get('textarea_2').value,
  email: this.form.get('email').value,
  password: this.form.get('password').value
}

this.authService.registerUser(user).subscribe(data => {
  console.log(data);
})
}

  ngOnInit() {
  }

}
