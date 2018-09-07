/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PipelinesListPage } from './list-page.pipeline.component';

import { APIsStore } from '../../../store/apis.store';
import { BuildStore } from '../../../store/build.store';
import { BuildConfigStore } from '../../../store/buildconfig.store';

import { Observable } from 'rxjs';

describe('PipelinesListPage', () => {
  let component: PipelinesListPage;
  let fixture: ComponentFixture<PipelinesListPage>;


  beforeEach(async(() => {
    let mockBuildConfigStore: any = jasmine.createSpy('BuildConfigService');
    mockBuildConfigStore.loading = Observable.of(false);
    let mockBuildStore: any = jasmine.createSpy('BuildStore');
    mockBuildStore.loading = Observable.of(true);
    let mockAPIsStore: any = jasmine.createSpy('APIsStore');
    TestBed.configureTestingModule({
      declarations: [
        PipelinesListPage
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
    fixture = TestBed.createComponent(PipelinesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
