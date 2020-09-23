import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
	public mainFormGroup: FormGroup;
	public submitAttempt: boolean = false;

    constructor(public formBuilder: FormBuilder) {
      this.mainFormGroup = formBuilder.group({
        username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.email])],
        password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
        passwordConfirm: ['', Validators.required],
      }, {validator: this.password.bind(this)});
    }

    password(formGroup: FormGroup) {
      const { value: password } = formGroup.get('password');
      const { value: confirmPassword } = formGroup.get('passwordConfirm');
      return password === confirmPassword ? null : { passwordMismatch: true };
    }

    save(){

      this.submitAttempt = true;

      if(this.mainFormGroup.valid){
          console.log("success!")
          console.log(this.mainFormGroup.value);
      }
    }
}
