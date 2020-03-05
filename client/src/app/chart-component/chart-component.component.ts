import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.scss']
})
export class ChartComponentComponent implements OnInit {

  public categories = ['Mass', 'Prestige'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getChartData().subscribe(
      res => {
        console.log(res);
        this.plotChart(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  public plotChart(chartData: any) {
    let massData = [];
    let prestigeData = [];

    chartData.rows.map((elem) => {
      if (elem[0].value === "MASS") {
        massData.push({ name: elem[1].value, data: [(elem[2].value / 1000000)] });
      } else {
        prestigeData.push({ name: elem[1].value, data: (elem[2].value / 1000000) });
      }
    });

    massData.map((elem) => {
      prestigeData.map((elem1) => {
        if (elem.name === elem1.name) {
          elem.data.push(elem1.data);
        }
      })
    });

    const options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Highcharts Bar Chart Task'
      },
      subtitle: {
        text: 'For Project: <a href="https://github.com/Sangeethshiv36/MEAN-er">MEAN-er</a>'
      },
      xAxis: {
        categories: this.categories,
        title: {
          text: 'Channel'
        }
      },
      yAxis: {
        min: 0,
        max: 2500,
        tickInterval: 250,
        title: {
          text: 'Revenue',
          align: 'high'
        },
        labels: {
          formatter: function () {
            return this.value + 'M';
          },
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'bottom',
        x: 70,
        y: 0,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      },
      credits: {
        enabled: false
      },
      series: massData
    }

    Highcharts.chart('container', options as any);
  }



}
