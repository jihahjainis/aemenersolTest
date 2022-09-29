import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SimpleDataModel } from '../model/charts.model';
import { D3Service } from '../services/d3.service';
import { DashboardService } from '../services/dashboard.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-bar',
  templateUrl: './d3-bar.component.html',
  styleUrls: ['./d3-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class D3BarComponent implements OnInit {

  private svg;
  private margin = 50;
  private width = 400 - (this.margin * 2);
  private height = 300 - (this.margin * 2);
  data: SimpleDataModel[];

  constructor(
    private dashboardService: DashboardService) {}

  async ngOnInit(): Promise<void> {
    const response = await lastValueFrom(this.dashboardService.chart());
    this.data = response['chartBar'];

    this.createSvg();
    this.drawBars(this.data);

    // Parse data from a CSV
    // d3.csv("/assets/frameworks.csv").then(data => this.drawBars(data));

    // Fetch JSON from an external endpoint
    // d3.json('https://api.jsonbin.io/b/5eee6a5397cb753b4d149343').then(data => this.drawBars(data));
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Add X axis
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.name))
    .padding(0.2);

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 100])
    .range([this.height, 0]);

    this.svg.append("g")
    .call(d3.axisLeft(y));
    
    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.value.toString()))
    .attr("width", x.bandwidth())
    .attr("height", (d) => this.height - y(d.value.toString()))
    .attr("fill", "#999999");
  }
}