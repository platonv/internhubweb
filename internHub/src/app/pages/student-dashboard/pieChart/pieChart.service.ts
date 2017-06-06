import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Visits',
        stats: '73',
        icon: 'person',
      }, 
      {
        color: pieColor,
        description: 'Students',
        stats: '158',
        icon: 'face',
      }, 
      {
        color: pieColor,
        description: 'Companies',
        stats: '87',
        icon: 'refresh',
      },
      {
        color: pieColor,
        description: 'Jobs',
        stats: '297',
        icon: 'refresh',
      }
    ];
  }
}
