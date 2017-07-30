import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPlazaComponent } from './parking-plaza.component';

describe('ParkingPlazaComponent', () => {
  let component: ParkingPlazaComponent;
  let fixture: ComponentFixture<ParkingPlazaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPlazaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPlazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
