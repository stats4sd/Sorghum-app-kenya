import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";
import {SeedMasterData} from "../../providers/seed-master-data/seed-master-data";
import {MapService} from "../../providers/map-provider/map-provider";

//declare L to allow for awesome markers (couldn't figure out how to update typescript index)
declare var L;
@Component({
  templateUrl: 'build/pages/seed-detail/suppliers-tab.html',
})

export class SuppliersTabPage {

  seedData:any;
  suppliers:any;
  activeSeedSuppliers:any;
  mapService:any;
  zoomWarning:boolean=false;

  constructor(private nav: NavController, params:NavParams, seedMasterData:SeedMasterData, mapService:MapService) {
    this.seedData=params.data;
    this.suppliers=seedMasterData.data.suppliersBySeed;
    this.activeSeedSuppliers=this.suppliers[this.seedData.Genotypes];
    console.log(this.activeSeedSuppliers);
    this.mapService=mapService;
  }

  //after view loaded add the map
  ionViewLoaded() {
    var map = new L.Map('map', {
      zoomControl: false,
      center: new L.LatLng(this.activeSeedSuppliers[0]['Location Latitude'], this.activeSeedSuppliers[0]['Location Longitude']),
      zoom: 7,
      maxNativeZoom:8,
      minZoom: 1,
      maxZoom: 15,
      layers: [this.mapService.baseMaps.Offline],
      touchZoom: false
    });

    L.control.zoom({position:'topright'}).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    //timeout function needed to recentre map in div
    setTimeout(function(){
      map.invalidateSize({reset:true});
    },0);
    //need to remove then readd as sometimes basemap disappears after navigating away
    map.removeLayer(this.mapService.baseMaps.Offline);
    map.addLayer(this.mapService.baseMaps.Offline);
    var baseMaps=this.mapService.baseMaps;

    map.on('zoomend',function(){
      var z =map.getZoom();
      if (z<8){this.zoomWarning=false}
      if (z>=8){this.zoomWarning=true}
      if (z>8){return baseMaps.Online.addTo(map) }
      //bind this allows to update scope through external callback function
    }.bind(this));

    //add markers
    var redMarker = L.AwesomeMarkers.icon({
      icon: 'shopping-cart',
      markerColor: 'red',
      prefix:'fa'
    });
    console.log(this.activeSeedSuppliers);
    for (let supplier of this.activeSeedSuppliers){
      console.log(supplier);
      if(supplier['Location Latitude']&&supplier['Location Longitude'])
      var marker = L.marker([supplier['Location Latitude'],supplier['Location Longitude']], {icon: redMarker})
      var popupContent=
          "<h3>"+supplier.Name+"</h3>"
          +"<p>"+supplier['Contact Person']+"</p>"
          +"<p><strong>"+supplier['Contact Number']+"</strong></p>";
      marker.bindPopup(popupContent);
      marker.addTo(map);
    }


    console.log('adding marker');

    /*
    var greyMarker = L.AwesomeMarkers.icon({
      icon: '',
      markerColor: 'black',
      prefix:'fa'
    });

    var markersClusterGroup=L.markerClusterGroup({
      showCoverageOnHover:false,
    });
//add different markers for vendors that have and that doesn't have - probably better way to do this
    for(let vendor of this.inputVendors.has){
      var marker = L.marker([vendor.longitude, vendor.latitude],{icon:redMarker});
      markersClusterGroup.addLayer(marker);
      marker.bindPopup(
          "<h3>"+vendor.vquien+"</h3>"
          +"<p>"+vendor.vdonde+"</p>"
          +"<p><strong>"+vendor.vtel+"</strong></p>"
      );
    }
    //include greyed out markers of vendors who don't sell
    /!*for(let vendor of this.inputVendors.hasnt){
     var marker = L.marker([vendor.longitude, vendor.latitude],{icon:greyMarker});
     markersClusterGroup.addLayer(marker);
     marker.bindPopup(
     "<h3>"+vendor.vquien+"</h3>"
     +"<p>"+vendor.vdonde+"</p>"
     +"<p><strong>"+vendor.vtel+"</strong></p>"
     );
     }*!/
    map.addLayer(markersClusterGroup);*/
    this.mapService.map = map;
  }

}
