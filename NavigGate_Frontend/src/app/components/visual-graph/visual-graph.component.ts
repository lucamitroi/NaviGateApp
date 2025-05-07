import { Component, Input, signal } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { Ship } from '../../model/data.type';

function countryList(ship: Ship) {
  const voyages = ship.listOfVoyages;
  const ports = ship.listOfPorts;

  const portToCountryMap = ports.reduce((acc, port) => {
    acc[port.portId] = port.portCountry;
    return acc;
  }, {} as { [portId: number]: string });

  const countryVisitMap: { [countryName: string]: number } = {};

  voyages.forEach(voyage => {
    const departureCountry = portToCountryMap[voyage.voyageDeparturePortId];
    const arrivalCountry = portToCountryMap[voyage.voyageArrivalPortId];

    if (departureCountry) {
      countryVisitMap[departureCountry] = (countryVisitMap[departureCountry] || 0) + 1;
    }

    if (arrivalCountry) {
      countryVisitMap[arrivalCountry] = (countryVisitMap[arrivalCountry] || 0) + 1;
    }
  });

  const countryVisitList = Object.entries(countryVisitMap).map(([name, value]) => ({
    name,
    value
  }));

  return countryVisitList;
}

@Component({
  selector: 'app-visual-graph',
  imports: [NgxChartsModule],
  templateUrl: './visual-graph.component.html',
  styleUrl: './visual-graph.component.scss'
})
export class VisualGraphComponent {
  constructor(
      private store: Store<AppState>,
    ) {}

  @Input() shipId = 0;

  storedShip = signal<Ship | null>(null);
  userIdSignal = signal(0);
  chartData = signal({});
  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fruit';
  showYAxisLabel = true;
  yAxisLabel = 'Quantity';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  ngOnChanges() {
    this.store.select('listOfAllShips').subscribe({
      next: (data) => {
        this.userIdSignal.set(Number(this.shipId));
        this.storedShip.set(data.find(ship => ship.shipId === Number(this.shipId)) || null);
        const ship = this.storedShip();
        if (ship) {
          this.chartData.set(countryList(ship));
        }
      },
      error: (err) => {
        console.error('Error fetching ships:', err);
      }
    });

  }
}
