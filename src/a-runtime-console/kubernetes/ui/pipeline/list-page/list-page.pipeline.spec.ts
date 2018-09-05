/* tslint:disable:no-unused-variable */
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PipelinesListPage } from './list-page.pipeline.component';

import { BuildConfigService } from '../../../service/buildconfig.service';
import { BuildConfigStore } from '../../../store/buildconfig.store';
import { BuildStore } from '../../../store/build.store';
import { APIsStore } from '../../../store/apis.store';

@Component({
  selector: 'fabric8-pipelines-list',
  template: ''
})
class MockPipelinesListComponent { }

@Component({
  selector: 'fabric8-pipelines-list-toolbar',
  template: ''
})
class MockPipelinesListToolbarComponent { }

fdescribe('PipelinesListPage', () => {
  let component: PipelinesListPage;
  let fixture: ComponentFixture<PipelinesListPage>;
  let mockBuildConfigStore: any = jasmine.createSpy('BuildConfigStore');
  let mockBuildStore: any = jasmine.createSpy('BuildStore');
  let mockAPIsStore: any = jasmine.createSpy('APIsStore');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PipelinesListPage,
        MockPipelinesListComponent,
        MockPipelinesListToolbarComponent
      ],
      providers: [
        { provide: BuildConfigStore, useVale: mockBuildConfigStore },
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
