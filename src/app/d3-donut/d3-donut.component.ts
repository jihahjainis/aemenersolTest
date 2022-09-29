import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SimpleDataModel } from '../model/charts.model'
import { D3Service } from '../services/d3.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-d3-donut',
  templateUrl: './d3-donut.component.html',
  styleUrls: ['./d3-donut.component.scss'],
})
export class D3DonutComponent implements OnInit {

  private margin = { top: 5, right: 5, bottom: 5, left: 5 };
  private width = 20;
  private height = 20;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  data: SimpleDataModel[];

  constructor(
    private d3: D3Service,
    private dashboardService: DashboardService) {}

  async ngOnInit(): Promise<void> {

    const response = await lastValueFrom(this.dashboardService.chart());
    this.data = response['chartDonut'];

    this.createSvg();
    this.createColors(this.data);
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = this.d3.d3
      .select('figure#donut')
      .append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 3 + ',' + this.height / 3 + ')'
      );
  }

  private createColors(data): void {
    let index = 0;
    const defaultColors = [
      '#999999',
      '#bcbcbc',
      '#5b5b5b',
      '#aca6a6',
    ];
    const colorsRange: string[] = [];
    this.data.forEach((element) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = this.d3.d3
      .scaleOrdinal()
      .domain(data.map((d) => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    var pie = this.d3.d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    var data_ready = pie(this.data);

    // The arc generator
    var arc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.35) // This is the size of the donut hole
      .outerRadius(this.radius * 0.9);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.1)
      .outerRadius(this.radius * 0.1);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => this.colors(d.data.value))
      .attr('none', 'white')
      .style('stroke-width', '0px')
      .style('opacity', 0.7);
  }
}
