import {Component, OnInit, ViewChild} from '@angular/core';
import {Configuration} from './models/configuration.interface';
import {ConfigurationService} from './services/configuration.service';
import {WidgetService} from './services/widget.service';
import {ElementRef} from '@angular/core';
import {Period} from "./models/period.interface";
import {WidgetType} from  './models/widgettype.enum';
import {StatisticService} from './services/statistic.service'
import {StatisticType} from "./models/statistictype.enum";
import {Metric} from "./models/metric.enum";


declare function updateWidget(widget: any, element: any): void;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
})

export class AppComponent implements OnInit {
  public configurations: Configuration[] = null;
  public currentType: string = null;
  public types: string [] = null;
  public configuration: any = null;
  public statistic: any = {
    responseTime: [],
    cpuUsage: []
  };
  @ViewChild('widget0') el: ElementRef;


  constructor(private confServise: ConfigurationService, private widgetService: WidgetService, private statisticService: StatisticService) {
  }


  onChange(): void {
    this.loadConfigurations();
  }

  ngOnInit(): void {
    this.confServise.getTypes().subscribe(
      types => {
        console.log(types);
        this.types = types;
        this.currentType = types[0];
        this.loadConfigurations();

      }
    )
  }

  private loadConfigurations() {
    this.confServise.getConfigurations(this.currentType).subscribe(
      configurations => {
        this.configurations = configurations;
        this.configuration = configurations[0];
        this.loadStatistic();
      },
      err => {
        console.log(err);
      }
    );
  }

  onConfigurationChange() {
    //this.drawWidgets();
    this.loadStatistic();
  }

  private loadStatistic() {
    let period: Period = this.configuration.period;
    this.statisticService.getStatistic(Metric.RESPONSE_TIME, period, StatisticType.AVG).subscribe(
      data => {
        console.log(data);
        this.statistic = {
          responseTime: data
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  private drawWidgets() {
    let period: Period = this.configuration.period;
    this.widgetService.getWidget(WidgetType.RESPONSE_TIME, period).subscribe(
      config => {
        console.log(config);
        updateWidget(config, 0);
      },
      err => {
        console.log(err);
      }
    );
  }
}
