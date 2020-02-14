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
      "caption": "Number of Sales",
      //Set the chart subcaption
      "subCaption": "(Number of sales each consultant does).",
      //Set the x-axis name
      "xaxisname": "Consultants",
      //Set the y-axis name
      "yaxisname": "Amount (In USD)",
      // numberSuffix: "K",
      //Set the theme for your chart
      "theme": "fusion",

      "numberprefix": "$",

      "rotateValues": "0",

    },

    "data": [{
      "label": "Kelly",
      "value":  "620000",
      "link": "newchart-xml-kelly"
    },
    {
      "label": "Bob",
      "value": "810000",
      "link": "newchart-xml-bob"
    },
    {
      "label": "Dwight",
      "value": "350000",
      "link": "newchart-xml-dwight"
    }
    ],
    "linkeddata": [{
      "id": "kelly",
      "linkedchart": {
        "chart": {
          "caption": "Kelly's Clients ",
          "subcaption": " (sales figure from respective clients)",
          "numberprefix": "$",
          "theme": "fusion",
          "rotateValues": "0",
          "plottooltext": "$label, $dataValue,  $percentValue"
        },
        "data": [{
          "label": "Singapore Polytechnic",
          "value": "291000"
        }, {
          "label": "Ngee Ann Polytechnic",
          "value": "157000"
        }, {
          "label": "Temasek Polytechnic",
          "value": "172000"
        }]
      }
    },
    {
      "id": "bob",
      "linkedchart": {
        "chart": {
          "caption": "Bob's Clients",
          "subcaption": "(sales figure from respective clients)",
          "numberprefix": "$",
          "theme": "fusion",
          "plottooltext": "$label, $dataValue,  $percentValue"
        },
        "data": [{
          "label": "Google",
          "value": "289000"
        },
        {
          "label": "Facebook",
          "value": "124800"
        },
        {
          "label": "Microsoft",
          "value": "396200"
        }
        ]
      }
    },
    {
      "id": "dwight",
      "linkedchart": {
        "chart": {
          "caption": "Dwight's Clients",
          "subcaption": "(sales figure from respective clients)",
          "numberprefix": "$",
          "theme": "fusion",
          "rotateValues": "0",
          "plottooltext": "$label, $dataValue,  $percentValue"
        },
        "data": [{
          "label": "DHL",
          "value": "132000‬"
        }, {
          "label": "Ninja Van",
          "value": "73000"
        }, {
          "label": "SingPost",
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