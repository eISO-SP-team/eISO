import { Component, OnInit } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.css']
})
export class GraphOneComponent implements OnInit {

  // dataSource: any;
  // type: string;
  width: string;
  height: string;

  // constructor() {
  //   this.type = 'timeseries';
  //   this.width = '100%';
  //   this.height = '400';
  //   // This is the dataSource of the chart
  //   this.dataSource = {
  //     // Initially data is set as null
  //     data: null,
  //     chart: {
  //       showLegend: 0
  //     },
  //     caption: {
  //       text: 'Daily Visitors Count of a Website'
  //     },
  //     yAxis: [
  //       {
  //         plot: {
  //           value: 'Daily Visitors',
  //           type: 'area'
  //         },
  //         title: 'Daily Visitors (in thousand)'
  //       }
  //     ]
  //   };
  //   this.fetchData();
  // }



  ngOnInit() {
  }

  // fetchData() {
  //   var jsonify = res => res.json();
  //   var dataFetch = fetch(
  //     'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/area-chart-with-time-axis-data.json'
  //   ).then(jsonify);
  //   var schemaFetch = fetch(
  //     'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/area-chart-with-time-axis-schema.json'
  //   ).then(jsonify);

  //   Promise.all([dataFetch, schemaFetch]).then(res => {
  //     const data = res[0];
  //     const schema = res[1];
  //     // First we are creating a DataStore
  //     const fusionDataStore = new FusionCharts.DataStore();
  //     // After that we are creating a DataTable by passing our data and schema as arguments
  //     const fusionTable = fusionDataStore.createDataTable(data, schema);
  //     // Afet that we simply mutated our timeseries datasource by attaching the above
  //     // DataTable into its data property.
  //     this.dataSource.data = fusionTable;
  //   });
  // }

  dataSource: Object;
  constructor() {

    this.width = '100%';
    this.height = '400';
  
    //STEP 2 - Chart Data
    const chartData = [
      {
        label: "Ronnie",
        value: "290",
      },
      {
        label: "Bob",
        value: "260"
      },
      {
        label: "June",
        value: "290"
      },
      {
        label: "Russell",
        value: "140"
      },
      {
        label: "Felicia",
        value: "115"
      },
      {
        label: "John",
        value: "100"
      },
      {
        label: "Gary",
        value: "30"
      },
      {
        label: "Steve",
        value: "30"
      }
    ];
    // STEP 3 - Chart Configuration
    const dataSource = {
      chart: {
        //Set the chart caption
        caption: "Number of Sales",
        //Set the chart subcaption
        subCaption: "(Number of sales each consultant does).",
        //Set the x-axis name
        xAxisName: "Consultants",
        //Set the y-axis name
        yAxisName: "Sales ($)",
        // numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion",

        // bgColor: "#000000",
        
      },
      // Chart Data - from step 2
      data: chartData
    };
    this.dataSource = dataSource;
  }

}
