/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PipelinesFullHistoryPage } from './full-history-page.pipeline.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APIsStore } from '../../../store/apis.store';
import { BuildStore } from '../../../store/build.store';
import { BuildConfigStore } from '../../../store/buildconfig.store';

import { BuildService } from '../../../service/build.service';
import { BuildConfigService } from '../../../service/buildconfig.service';
import { DevNamespaceScope, TestDevNamespaceScope } from '../../../service/devnamespace.scope';

describe('PipelinesFullHistoryPage', () => {
  let component: PipelinesFullHistoryPage;
  let fixture: ComponentFixture<PipelinesFullHistoryPage>;

  beforeEach(async(() => {
    let mockBuildConfigService: any = jasmine.createSpy('BuildConfigService');
    let mockDevNameSpaceScrope: any = jasmine.createSpy('DevNamespaceScope');
    let mockBuildService: any = jasmine.createSpy('BuildService');
    let mockAPIsStore: any = jasmine.createSpy('APIsStore');
    TestBed.configureTestingModule({
      declarations: [
        PipelinesFullHistoryPage
      ],
      providers: [
        {
          provide: BuildConfigStore, useFactory: (
            buildConfigService: BuildConfigService,
            namespaceScope: DevNamespaceScope
          ) => {
            return new BuildConfigStore(buildConfigService, namespaceScope);
          },
          deps: [BuildConfigService, DevNamespaceScope]
        },
        { provide: BuildConfigService, useValue: mockBuildConfigService},
        { provide: BuildService, useValue: mockBuildService},
        { provide: DevNamespaceScope, useClass: TestDevNamespaceScope },
        {
          provide: BuildStore, useFactory: (
            buildService: BuildService,
            namespaceScope: DevNamespaceScope
          ) => {
            return new BuildStore(buildService, namespaceScope);
          },
          deps: [BuildService, DevNamespaceScope]
        },
        { provide: APIsStore, useVale: mockAPIsStore }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesFullHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
