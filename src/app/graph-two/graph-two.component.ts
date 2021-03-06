import { Component, OnInit, NgZone } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'app-graph-two',
  templateUrl: './graph-two.component.html',
  styleUrls: ['./graph-two.component.css']
})
export class GraphTwoComponent implements OnInit {



  chartInstance: any = {};
  width: string;
  height: string;

  // Callback to get chart instance
  initialized(e) {
    this.chartInstance = e.chart; // Save it for further use

    // Configure Drilldown attributes 
    // See this : https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods#configureLink
    this.chartInstance.configureLink({
      type: "pie2d",
      overlayButton: {
        message: 'close',
        fontColor: '880000',
        bgColor: 'FFEEEE',
        borderColor: '660000'
      }
    }, 0)
  }
  dataSource = {
    "chart": {
      //Set the chart caption
      "caption": "Sales Overview",
      //Set the chart subcaption
      "subCaption": "(Amount of sales from each product).",
      //Set the x-axis name
      "xaxisname": "Product category",
      //Set the y-axis name
      "yaxisname": "Amount (In USD)",
      // numberSuffix: "K",
      //Set the theme for your chart
      "theme": "fusion",

      "numberprefix": "$",

      "rotateValues": "0",

    },

    "data": [{
      "label": "Cement",
      "value":  "620000",
      "link": "newchart-xml-kelly"
    },
    {
      "label": "Tiles",
      "value": "810000",
      "link": "newchart-xml-bob"
    },
    {
      "label": "Carpentry",
      "value": "350000",
      "link": "newchart-xml-dwight"
    }
    ],
    "linkeddata": [{
      "id": "kelly",
      "linkedchart": {
        "chart": {
          "caption": "Cement brands ",
          "subcaption": " (sales figure from respective brands)",
          "numberprefix": "$",
          "theme": "fusion",
          "rotateValues": "0",
          "plottooltext": "$label, $dataValue,  $percentValue"
        },
        "data": [{
          "label": "CNBM",
          "value": "291000"
        }, {
          "label": "Jidong",
          "value": "157000"
        }, {
          "label": "Cemex",
          "value": "172000"
        }]
      }
    },
    {
      "id": "bob",
      "linkedchart": {
        "chart": {
          "caption": "Tile brands",
          "subcaption": "(sales figure from respective brands)",
          "numberprefix": "$",
          "theme": "fusion",
          "plottooltext": "$label, $dataValue,  $percentValue"
        },
        "data": [{
          "label": "Malford",
          "value": "289000"
        },
        {
          "label": "Hafary",
          "value": "124800"
        },
        {
          "label": "GF+A Global",
          "value": "396200"
        }
        ]
      }
    },
    {
      "id": "dwight",
      "linkedchart": {
        "chart": {
          "caption": "Type of wood sold",
          "subcaption": "(sales figure from respective types)",
          "numberprefix": "$",
          "theme": "fusion",
          "rotateValues": "0",
          "plottooltext": "$label, $dataValue,  $percentValue"
        },
        "data": [{
          "label": "Cedarwood",
          "value": "132000‬"
        }, {
          "label": "Rosewood",
          "value": "73000"
        }, {
          "label": "Timber",
          "value": "145000"
        }]
      }
    }
    ]
  };
  constructor(private zone: NgZone) { 

    // width: "90%",
    // height: 490, 
    // window.onresize = (e) => {
    //   //ngZone.run will help to run change detection
    //   if (window.innerWidth < 1025) {
    //     // this.onMenuClose(false);
    //     resizeTo(400,300)
    //   } else {
    //     resizeTo(700,400)
    //   }
    // };
    
      //  this.width = '60%';
      // this.height = '400';
  }

  ngOnInit() {

  }
}