import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowStatisticsComponent } from './flow-statistics.component';

describe('FlowStatisticsComponent', () => {
  let component: FlowStatisticsComponent;
  let fixture: ComponentFixture<FlowStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
