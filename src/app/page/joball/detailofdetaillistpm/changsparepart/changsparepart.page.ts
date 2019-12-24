import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { PostDataService } from '../../../../post-data.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-changsparepart',
  templateUrl: './changsparepart.page.html',
  styleUrls: ['./changsparepart.page.scss'],
})
export class ChangsparepartPage implements OnInit {

  installID;
  planID;
  data;
  SerialNo;
  jobtype;

  constructor(private modalController: ModalController,
    private postDataService: PostDataService,
    private barcodeScanner: BarcodeScanner,
    private navParams: NavParams) { 

      this.planID = this.navParams.data.planID;
      this.installID = this.navParams.data.installID;
      this.jobtype = this.navParams.data.jobtype;

      if (this.jobtype == "PM") {
        let params = {
          installID: this.installID,
          planID: this.planID,
          typedevice: "changspare"
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          console.log(this.data);
        });
      }else if (this.jobtype == "INSTALL") {
        let params = {
          installID: this.installID,
          planID: this.planID,
          typedevice: "pmspare"
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          console.log(this.data);
        });
      }
     
    }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let barcode = barcodeData
      this.SerialNo = barcode.text
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async submit(data){
    console.log(data);
    
    let params = {
      installID: this.installID,
      planID: this.planID,
      typedevice: "savespare",
      spare:data
    }
    console.log(params);
    this.postDataService.postdevice(params).then(data => {
      this.data = data
      console.log(this.data);
    });
    await this.modalController.dismiss(0);
  }
}
