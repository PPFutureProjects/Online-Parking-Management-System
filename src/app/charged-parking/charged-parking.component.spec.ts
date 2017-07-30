import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargedParkingComponent } from './charged-parking.component';

describe('ChargedParkingComponent', () => {
  let component: ChargedParkingComponent;
  let fixture: ComponentFixture<ChargedParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargedParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargedParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
