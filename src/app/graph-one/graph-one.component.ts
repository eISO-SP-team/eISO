import { Component, OnInit } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.css']
})
export class GraphOneComponent implements OnInit {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      // Initially data is set as null
      data: null,
      chart: {
        showLegend: 0
      },
      caption: {
        text: 'Daily Visitors Count of a Website'
      },
      yAxis: [
        {
          plot: {
            value: 'Daily Visitors',
            type: 'area'
          },
          title: 'Daily Visitors (in thousand)'
        }
      ]
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    var jsonify = res => res.json();
    // var dataFetch = fetch(
    //   //  'href = ../../time.json'
    // ).then(jsonify);
    var dataFetch = []
    dataFetch = [
      [
        "1/4/2011",
        16.448
      ],
      [
        "1/5/2011",
        272.736
      ],
      [
        "1/5/2011",
        11.784
      ],
      [
        "12/31/2014",
        20.72
      ],
      [
        "12/31/2014",
        13.904
      ],
      [
        "12/31/2014",
        3.024
      ]
    ]

    var schemaFetch = []
    schemaFetch = [{
      "name": "Time",
      "type": "date",
      "format": "%Y-%m-%d"
    }, {
      "name": "Daily Visitors",
      "type": "number"
    }];

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }

  ngOnInit() {

  }
}