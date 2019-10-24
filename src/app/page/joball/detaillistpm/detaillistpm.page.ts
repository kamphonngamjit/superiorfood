import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { PostDataService } from '../../../post-data.service';
import { StorageService } from '../../../storage.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-detaillistpm',
  templateUrl: './detaillistpm.page.html',
  styleUrls: ['./detaillistpm.page.scss'],
})
export class DetaillistpmPage implements OnInit {

  //#region data
  myId;
  workfinish;
  cusID;
  planID;
  detaillistpm;
  data;
  Customername;
  Name;
  month;
  year;
  insID;
  item;
  type;
  date;
  items;
  empID;
  AssetID;
  Serial;
  new = false;
  //#endregion

  //#region constructor
  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private postDataService: PostDataService,
    private storageService: StorageService,
    public alertController: AlertController) {
    this.detaillistpm = [];

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      this.item = this.myId.item
      this.type = this.myId.type
      this.date = this.myId.date

      this.cusID = this.item.cusID
      this.planID = this.item.planID
      this.workfinish = this.item.WorkFinish
      this.month = this.item.month
      this.year = this.item.year
      console.log("receive", this.myId);
    });
  }

  //#endregion

  //#region start

  ngOnInit() {
    if (this.type == "CM") {
      this.storageService.getUser().then(items => {
        this.items = items;
        // console.log(items);      
        for (let i = 0; i < this.items.length; i++) {
          this.empID = this.items[i].empID;
          console.log(this.empID);
        }
        this.detaillistpm.cusID = this.cusID;
        this.detaillistpm.planID = this.planID;
        this.detaillistpm.month = this.month;
        this.detaillistpm.year = this.year;
        this.detaillistpm.type = this.type;
        this.detaillistpm.date = this.date;
        this.detaillistpm.empid = this.empID;

        console.log(this.detaillistpm);

        this.postDataService.postDetailListpm(this.detaillistpm).then(work => {
          this.data = work;
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            this.Customername = this.data[i].CustomerName;
            this.data[i].productInstall = JSON.parse(this.data[i].productInstall);

          }
        });
      });
    } else {
      this.storageService.getUser().then(items => {
        this.items = items;
        // console.log(items);      
        for (let i = 0; i < this.items.length; i++) {
          this.empID = this.items[i].empID;
          // console.log(this.empID);
        }
        this.detaillistpm.cusID = this.cusID;
        this.detaillistpm.planID = this.planID;
        this.detaillistpm.month = this.month;
        this.detaillistpm.year = this.year;
        this.detaillistpm.type = this.type;
        this.detaillistpm.date = this.date;
        this.detaillistpm.empid = this.empID;

        console.log(this.detaillistpm);

        this.postDataService.postDetailListpm(this.detaillistpm).then(work => {
          this.data = work;
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            this.Customername = this.data[i].CustomerName;
            this.data[i].productInstall = JSON.parse(this.data[i].productInstall);
            for (let j = 0; j < this.data[i].productInstall.length; j++) {
              console.log(this.data[i].productInstall[j]);
              this.Serial = this.data[i].productInstall[j].SerialNo
              this.AssetID = this.data[i].productInstall[j].AssetID
            }
          }
        });
      });
    }
  }

  //#endregion

  //#region click

  async click(data, item) {
    console.log('Data', data);
    console.log('item', item);
    console.log(this.AssetID);
    console.log(this.Serial);
    if (item.Workfinish == 0) {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน!',
        message: 'ต้องการเริ่มทำงาน',
        buttons: [
          {
            text: 'ตกลง',
            handler: () => {
              let data = {
                AssetID: this.AssetID,
                Serial: this.Serial,
                planID: item.planID,
                empID: this.empID,
                insID: item.installId,
                type: this.type
              }
              console.log(data);

              this.postDataService.postTranService(data).then(TranService => {
                // console.log(TranService);  
              });
              let params = {
                planID: item.planID,
                install: item,
                insID: item.installId,
              }
              console.log(params);

              const navigationExtras: NavigationExtras = {
                queryParams: {
                  data: JSON.stringify(params)
                }
              };
              this.navCtrl.navigateForward(['joball/listpm/detailofdetaillistpm'], navigationExtras);
              console.log("sent", navigationExtras);
            }
          }, {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }
        ]
      });
      await alert.present();
    }

    if (item.Workfinish == 1) {
      if (this.type == "CM") {
        let params = {
          data: data,
          installID: item.newinstallID,
          tranID: item.tranID,
          planID: item.planID,
          type: this.type
        }
        console.log(params);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            data: JSON.stringify(params)
          }
        };
        this.navCtrl.navigateForward(['/job/jobdetail'], navigationExtras);
        console.log("sent", navigationExtras);
      }
      else if (this.type != "CM") {
        let params = {
          data: data,
          installID: item.installId,
          tranID: item.tranID,
          planID: item.planID,
          type: this.type
        }
        console.log(params);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            data: JSON.stringify(params)
          }
        };
        this.navCtrl.navigateForward(['/job/jobdetail'], navigationExtras);
        console.log("sent", navigationExtras);
      }
    }
  }

  //#endregion

}
