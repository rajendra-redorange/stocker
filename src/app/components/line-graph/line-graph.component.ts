import { Component, Input, OnChanges } from '@angular/core';
import { LineGraph, Series } from 'src/app/stocker.model';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
})
export class LineGraphComponent implements OnChanges {
  @Input() name: string;
  @Input() xSeriesLabel: string;
  @Input() ySeriesValue: number;
  lineGraph: LineGraph[] = [];
  view: any[] = [400, 200];
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  timeline = true;
  xAxisLabel = 'Time';
  yAxisLabel = 'Value';

  constructor() {
    this.lineGraph.push(new LineGraph(this.name));
  }

  ngOnChanges(): void {
    this.lineGraph[0].name = this.name;

    if (this.lineGraph[0].series.length > 4) {
      this.lineGraph[0].series.splice(0, 1);
    }
    this.lineGraph[0].series.push(
      new Series(this.xSeriesLabel, this.ySeriesValue)
    );
    this.lineGraph = [...this.lineGraph];
  }
}
