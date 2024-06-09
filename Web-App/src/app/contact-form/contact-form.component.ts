import { Component, OnInit } from '@angular/core';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  public isMobile: boolean = false;


  
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  



contactForm!: FormGroup;
  isSubmit = true;
  submitMessage='';

  private myForm?: AngularFirestoreCollection<any>;
  
constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore,breakpointObserver: BreakpointObserver) {
  breakpointObserver.observe([
    Breakpoints.Handset
  ]).subscribe(result => {
    this.isMobile = result.matches;
  });
}

  

ngOnInit() {

  this.myForm = this.firestore.collection('mail');
  
  this.contactForm = new FormGroup({
    name: new FormControl (null, { validators: [Validators.required]}),
    email:  new FormControl (null, { validators: [Validators.required]}),
    message: new FormControl (null, { validators: [Validators.required]})
});





  
}

submitData(value:any) {
  // console.log(value);
  this.myForm?.add({
    to: ['philvocke@gmail.com'],
    message: {
      html:   value.email + value.message
    },
  })
  .then(res=>{
    this.submitMessage = 'Submitted Successfully';
  })
 
  .catch(err=>{
    console.log(err);
  })

  this.isSubmit=true;
  this.submitMessage = 'Submitted Successfully';
  setTimeout(()=> {
    this.isSubmit=false;
  },8000);
 }

}



