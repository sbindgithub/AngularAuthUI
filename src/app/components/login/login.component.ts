import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

type: string = "password";
isText:boolean=false;
eyeIcon:string="fa-eye-slash";
loginForm!:FormGroup;

constructor(private fb: FormBuilder,private auth:AuthService, private router:Router){}

ngOnInit(): void {
  this.loginForm=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
}
hideShowPassword(){
this.isText=!this.isText;

this.isText?this.eyeIcon='fa-eye':this.eyeIcon="fa-eye-slash";
this.isText?this.type="text":this.type="password";
}

onLogin(){
  if(this.loginForm.valid)
  {
    alert('login')
    //send object to database
    this.auth.login(this.loginForm.value)
      .subscribe({
      next:(res)=>{
      alert(res.message)
      this.loginForm.reset;
      this.router.navigate(['dashboard'])
    },
      error:(err)=>{
        alert(err?.error.message)
      }
    })
  }else
  {
    //through the error using toaster and with required fields
this.validateAllFormFields(this.loginForm);
alert("form is invalid")
  }
}

private validateAllFormFields(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach(field=>{
    const control=formGroup.get(field);
    if(control instanceof FormControl){
      control?.markAsDirty({onlySelf:true});
    }else if(control instanceof FormGroup){
      this.validateAllFormFields(control)
    }
  })
}
}

