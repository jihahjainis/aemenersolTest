import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserTableModel } from '../model/charts.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  chartData: Array<any>;
  data: UserTableModel[];
  count = 0;

  constructor(
    private dashboardService: DashboardService
  ) { }

  async ngOnInit(): Promise<void> {
    const response = await lastValueFrom(this.dashboardService.chart());
    this.data = response['tableUsers'];

  }

}
