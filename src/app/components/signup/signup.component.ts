import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  hideShowPassword() {
    this.isText = !this.isText;

    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUp() {
    if (this.signupForm.valid) {
      //send object to database
    } else {
      //through the error using toaster and with required fields
      this.validateAllFormFields(this.signupForm);
      alert("form is invalid")
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control?.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
}

