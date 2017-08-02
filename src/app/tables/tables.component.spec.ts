import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilteringExample } from './tables.component';

describe('TablesComponent', () => {
  let component: TableFilteringExample;
  let fixture: ComponentFixture<TableFilteringExample>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFilteringExample ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFilteringExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
