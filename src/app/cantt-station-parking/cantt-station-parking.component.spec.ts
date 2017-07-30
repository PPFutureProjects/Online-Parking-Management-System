import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanttStationParkingComponent } from './cantt-station-parking.component';

describe('CanttStationParkingComponent', () => {
  let component: CanttStationParkingComponent;
  let fixture: ComponentFixture<CanttStationParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanttStationParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanttStationParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
