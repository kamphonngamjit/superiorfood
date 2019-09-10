import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-joball',
  templateUrl: './joball.page.html',
  styleUrls: ['./joball.page.scss'],
})
export class JoballPage implements OnInit {

  data: any;
  form :any = {
    name : '',
    body : ''
  };
  name:any;
  constructor(public DataService: AuthServiceService) { 

    this.DataService.getJobAll().subscribe(data => {
      this.data = data;
//       for(let i = 0; i <= this.data.length; i++){
//         this.name  = this.data[0].CustomerName
//         console.log(this.name);
// } 
      
    });
    
  }
click(data){
// if(data.EmpID == '01225f87-e6cc-4725-afe2-7e5a63f9a183'){
  
  this.DataService.EmpID = data.EmpID
  window.location.href="/joball/listpm";
  console.log(this.DataService.EmpID)
  // console.log(data);
}

ngOnInit() {
    
}
}

  // insertnewnote() {
  //   console.log(this.form);
  //   this.DataService.insert(this.form).then((data:any) => {
  //     console.log(data);
  //   });
  // }
//}
