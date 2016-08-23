import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";

declare var vg;

@Component({
  templateUrl: 'build/pages/seed-detail/performance-tab.html',
})
export class PerformanceTabPage {
  seedData:any;

  constructor(private nav: NavController, params:NavParams) {
    console.log(params);
    this.seedData=params.data;
    console.log(this.seedData);
    var vlSpec = {
      "data": {
        "values": [
          {"a": "C", "b": 2}, {"a": "C", "b": 7}, {"a": "C", "b": 4},
          {"a": "D", "b": 1}, {"a": "D", "b": 2}, {"a": "D", "b": 6},
          {"a": "E", "b": 8}, {"a": "E", "b": 4}, {"a": "E", "b": 7}
        ]
      },
      "mark": "bar",
      "encoding": {
        "y": {"field": "a", "type": "nominal"},
        "x": {
          "aggregate": "average", "field": "b", "type": "quantitative",
          "axis": {
            "title": "Average of b"
          }
        }
      }
    };
    var embedSpec = {
      mode: "vega-lite",
      spec: vlSpec
    };
    console.log(vg)
    vg.embed("#vis", embedSpec, function(error, result) {
      // Callback receiving the View instance and parsed Vega spec
      // result.view is the View, which resides under the '#vis' element
    });
  }

}
