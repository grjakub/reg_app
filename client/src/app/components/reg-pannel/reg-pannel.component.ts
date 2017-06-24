import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reg-pannel',
  templateUrl: './reg-pannel.component.html',
  styleUrls: ['./reg-pannel.component.scss']
})
export class RegPannelComponent implements OnInit {

form: FormGroup

 constructor(
   private formBuilder:FormBuilder,
   private authService: AuthService
   ) { 
    this.createForm();
  }

createForm() {
  this.form = this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(22),
      this.validatorEmail
    ])],
    first_name:  ['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(22)
    ])],
    last_name:  ['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(22)
    ])],
    textarea_1: '',
    textarea_2: '',
    password:  ['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(22)
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
  textarea_1: this.form.get('textarea_1').value,
  textarea_2: this.form.get('textarea_2').value,
  email: this.form.get('email').value,
  password: this.form.get('password').value
}

this.authService.registerUser(user).subscribe(data => {
  console.log(data);
})
  
  console.log(this.form.get('email').value)
  console.log(this.form.get('first_name').value)
}

  ngOnInit() {
  }

}
