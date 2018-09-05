/* tslint:disable:no-unused-variable */
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment';
import { PipelinesHistoryComponent } from './history.pipeline.component';

@Component({
  selector: 'BuildStageViewComponent',
  template: ''
})
class MockBuildStageViewComponent { }

describe('PipelinesHistoryComponent', () => {
  let component: PipelinesHistoryComponent;
  let fixture: ComponentFixture<PipelinesHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MomentModule
      ],
      declarations: [
        MockBuildStageViewComponent,
        PipelinesHistoryComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
