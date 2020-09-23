import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
	public mainFormGroup: FormGroup;
	public submitAttempt: boolean = false;

    constructor(public formBuilder: FormBuilder) {
      this.mainFormGroup = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }

    save(){

      this.submitAttempt = true;

      if(this.mainFormGroup.valid){
          console.log("success!")
          console.log(this.mainFormGroup.value);
      }
    }
}
