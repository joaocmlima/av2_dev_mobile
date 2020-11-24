import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  providers: [Geolocation]
})
export class MapaPage implements OnInit {
  map: any;

  constructor(private geolocation: Geolocation) { }

  ngOnInit(){
  }

  ionViewDidEnter() {
    this.geolocation.getCurrentPosition({
      timeout:5000,
      enableHighAccuracy:true,
    }).then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 18,
          center: position
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });

      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });

      /*var watch = this.geolocation.watchPosition();
      watch.subscribe(
        (data)=>{
          this.loadMap(data);
          console.log(data)
        }
      );*/

  }

  loadMap(pos:any){
    const position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    const mapOptions = {
      zoom: 18,
      center: position
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({
      position: position,
      map: this.map
    });
  }



}
