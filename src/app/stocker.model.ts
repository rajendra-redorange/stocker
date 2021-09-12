export class Series {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class LineGraph {
  name: string;
  series: Series[];

  constructor(name: string) {
    this.name = name;
    this.series = [];
  }
}

export class Stocker {
  id: string;
  name: string;
  startTime: number;
  startHour: number;
  startMin: number;
  value: number;
  pullTime: number;
  formattedStartTime: string;
  formattedPullTime: string;
  track: boolean;
  timeoutTimer;
  values: number[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.track = false;
    this.values = [];
  }

  storeStockValue(value: number): void {
    this.values.push(value);
  }

  resetStockValues(): void {
    this.values = [];
  }

  setStartTime(): void {
    const now = new Date();
    this.startTime = now.getTime();
    this.startHour = now.getHours();
    this.startMin = now.getMinutes();
    this.formattedStartTime =
      this.startHour.toString() + ':' + this.startMin.toString();
    this.pullTime = now.getTime();
    this.formattedPullTime =
      now.getHours().toString() + ':' + now.getMinutes().toString();
  }

  setPullTime(): void {
    const now = new Date();
    this.pullTime = now.getTime();
    this.formattedPullTime =
      now.getHours().toString() + ':' + now.getMinutes().toString();
  }

  resetStartTime(): void {
    this.startTime = null;
    this.startHour = null;
    this.startMin = null;
    this.formattedStartTime = '';
    this.pullTime = null;
    this.formattedPullTime = '';
  }
}
