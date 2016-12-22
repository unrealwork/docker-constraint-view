import {Component, OnInit, ViewChild} from '@angular/core';
import {Configuration} from './models/configuration.interface';
import {ConfigurationService} from './services/configuration.service';
import {ElementRef} from '@angular/core';
import any = jasmine.any;


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
  @ViewChild('widget0') el: ElementRef;


  constructor(private confServise: ConfigurationService) {
  }


  onChange(): void {
    console.log('a');
    this.loadConfigurations();
  }

  ngOnInit(): void {
    this.confServise.getTypes().subscribe(
      types => {
        console.log(types);
        this.types = types;
        this.currentType = types[0];
        this.loadConfigurations();
        let config = {
          initSize: {width: 600, height: 600},
          timespan: '10 minute',
          rotateticks: '90',
          displaypanels: 'false',
          timezone: "UTC",
          series: [{
            label: 'PageViews',
            entity: 'nurswgvml007',
            metric: 'cpu_busy'
          }],
          url: "https://apps.axibase.com",
        };
        updateWidget(config, 0);
      }
    )
  }

  private loadConfigurations() {
    this.confServise.getConfigurations(this.currentType).subscribe(
      configurations => {
        this.configurations = configurations;
        this.configuration = configurations[0];
      },
      err => {
        console.log(err);
      }
    );
  }
}
