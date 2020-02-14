import { Component, OnInit, NgZone } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'app-graph-two',
  templateUrl: './graph-two.component.html',
  styleUrls: ['./graph-two.component.css']
})
export class GraphTwoComponent implements OnInit {

  

  chartInstance: any = {};

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
          "caption": "Top 3 Juice Flavors",
          "subcaption": "Last year",
          "xaxisname": "Flavor",
          "yaxisname": "Amount (In USD)",
          "numberprefix": "$",
          "theme": "fusion",
          "rotateValues": "0"
      },
      "data": [{
              "label": "Apple",
              "value": "810000",
              "link": "newchart-xml-apple"
          },
          {
              "label": "Cranberry",
              "value": "620000",
              "link": "newchart-xml-cranberry"
          },
          {
              "label": "Grapes",
              "value": "350000",
              "link": "newchart-xml-grapes"
          }
      ],
      "linkeddata": [{
              "id": "apple",
              "linkedchart": {
                  "chart": {
                      "caption": "Apple Juice - Quarterly Sales",
                      "subcaption": "Last year",
                      "numberprefix": "$",
                      "theme": "fusion",
                      "rotateValues": "0",
                      "plottooltext": "$label, $dataValue,  $percentValue"
                  },
                  "data": [{
                      "label": "Q1",
                      "value": "157000"
                  }, {
                      "label": "Q2",
                      "value": "172000"
                  }, {
                      "label": "Q3",
                      "value": "206000"
                  }, {
                      "label": "Q4",
                      "value": "275000"
                  }]
              }
          },
          {
              "id": "cranberry",
              "linkedchart": {
                  "chart": {
                      "caption": "Cranberry Juice - Quarterly Sales",
                      "subcaption": "Last year",
                      "numberprefix": "$",
                      "theme": "fusion",
                      "plottooltext": "$label, $dataValue,  $percentValue"
                  },
                  "data": [{
                          "label": "Q1",
                          "value": "102000"
                      },
                      {
                          "label": "Q2",
                          "value": "142000"
                      },
                      {
                          "label": "Q3",
                          "value": "187000"
                      },
                      {
                          "label": "Q4",
                          "value": "189000"
                      }
                  ]
              }
          },
          {
              "id": "grapes",
              "linkedchart": {
                  "chart": {
                      "caption": "Grapes Juice - Quarterly Sales",
                      "subcaption": "Last year",
                      "numberprefix": "$",
                      "theme": "fusion",
                      "rotateValues": "0",
                      "plottooltext": "$label, $dataValue,  $percentValue"
                  },
                  "data": [{
                      "label": "Q1",
                      "value": "45000"
                  }, {
                      "label": "Q2",
                      "value": "72000"
                  }, {
                      "label": "Q3",
                      "value": "95000"
                  }, {
                      "label": "Q4",
                      "value": "108000"
                  }]
              }
          }
      ]
  };
  constructor(private zone: NgZone) {}

  ngOnInit(){
    
  }
}