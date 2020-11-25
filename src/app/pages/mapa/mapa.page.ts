import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import {Map,tileLayer,marker} from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  providers: [Geolocation]
})
export class MapaPage implements OnInit {
  map: any;

  constructor(
    private geolocation: Geolocation,
    public loadingController:LoadingController
    ) { }

  ngOnInit(){
  }

  ionViewDidEnter() {
    this.loadMap();
    this.efeitoLoading();
  }

  loadMap(){
    this.geolocation.getCurrentPosition({timeout:10000}).then(
      (resp) => {
        this.map = new Map("mapId").setView([resp.coords.latitude,resp.coords.longitude], 17);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { 
            attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>'
          }
        ).addTo(this.map); // This line is added to add the Tile Layer to our map
        const newMarker = marker([resp.coords.latitude,resp.coords.longitude]).addTo(this.map);
        newMarker.bindPopup("Sua localização").openPopup();
      }).catch(
        (error) => {
          console.log('Error getting location', error);
      });
     
  }

  async efeitoLoading(){
    const loading = await this.loadingController.create({
      message: 'Carregando mapa', 
      duration: 4000
    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
