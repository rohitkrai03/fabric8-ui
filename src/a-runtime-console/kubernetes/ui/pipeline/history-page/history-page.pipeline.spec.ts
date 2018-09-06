/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { APIsStore } from '../../../store/apis.store';
import { BuildStore } from '../../../store/build.store';
import { BuildConfigStore } from '../../../store/buildconfig.store';
import { PipelinesHistoryPage } from './history-page.pipeline.component';

describe('PipelinesHistoryPage', () => {
  let component: PipelinesHistoryPage;
  let fixture: ComponentFixture<PipelinesHistoryPage>;

  beforeEach(async(() => {
    let mockBuildConfigStore: any = jasmine.createSpy('BuildConfigService');
    mockBuildConfigStore.loading = Observable.of(false);
    let mockBuildStore: any = jasmine.createSpy('BuildStore');
    mockBuildStore.loading = Observable.of(true);
    let mockAPIsStore: any = jasmine.createSpy('APIsStore');
    TestBed.configureTestingModule({
      declarations: [
        PipelinesHistoryPage
      ],
      providers: [
        { provide: BuildConfigStore, useValue: mockBuildConfigStore },
        { provide: BuildStore, useVale: mockBuildStore },
        { provide: APIsStore, useVale: mockAPIsStore }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
