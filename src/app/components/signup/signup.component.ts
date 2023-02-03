import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
//import ValidateForm from 'src/app/helpers/ValidateForm';

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

  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router){ }
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


  onSignUp() {
    if (this.signupForm.valid) {
      alert('signup')
      //send object to database
      this.auth.signUp(this.signupForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          error: (err => {
            alert(err?.error.message)
          })
        })

      // this.auth.signUp(this.signupForm.value)
      // .subscribe({
      //   next:(res=>{
      //     alert(res.message)
      //   })
      //   .error:(err=>{
      //     alert(err?.error.message)
      //   })
      // })

    } else {
      //through the error using toaster and with required fields
      this.validateAllFormFields(this.signupForm)
      //alert("form is invalid")
    }
  }
}




