import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

declare var vg;
@Component({
  templateUrl: 'build/pages/seed-detail/full-trial-results/full-trial-results.html',
})
export class FullTrialResultsPage {
  trialData:any;
  viewCtrl:any;

  constructor(private nav: NavController, params:NavParams, viewCtrl:ViewController) {
    this.trialData=params.data;
    this.viewCtrl=viewCtrl;
    console.log(this.trialData);
    visValues=this.generateVisValues()
    var vlSpec = getSpec();
    var embedSpec = {
      mode: "vega-lite",
      spec: vlSpec
    };

    vg.embed("#trialVis", embedSpec, function(error, result) {
      // Callback receiving the View instance and parsed Vega spec
      // result.view is the View, which resides under the '#vis' element
    });
  }

  generateVisValues(){
    var vals=[];
    for (let t of this.trialData.trials){
        vals.push({
          "grain yield":t['Grain yield'],"variety":t.Genotypes,"year":t['Trial Name'],"site":t['Location Name']
        })
    }
    console.log(vals);
    return vals
  }

  close(){
    this.viewCtrl.dismiss();
  }

}

var visValues;

function getSpec(){
  console.log(visValues);
  var spec = {
    "description": "The Trellis display by Becker et al. helped establish small multiples as a “powerful mechanism for understanding interactions in studies of how a response depends on explanatory variables”. Here we reproduce a trellis of Barley yields from the 1930s, complete with main-effects ordering to facilitate comparison.",
    "data": {
      "values": visValues
    },
    "mark": "point",
    "encoding": {
      "row": {"field": "site", "type": "ordinal"},
      "x": {"aggregate": "mean", "field": "grain yield", "type": "quantitative"},
      "y": {
        "field": "variety", "type": "ordinal",
        "sort": {"field": "grain yield","op": "mean"},
        "scale": {"bandSize": 12}
      },
      "color": {"field": "year", "type": "nominal"}
    }
  };
  return spec
}


