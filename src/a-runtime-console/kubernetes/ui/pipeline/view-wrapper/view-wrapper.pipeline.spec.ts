/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-modal';
import { RestangularModule } from 'ngx-restangular';
import { Fabric8CommonModule } from '../../../../common/common.module';
import { KubernetesStoreModule } from '../../../kubernetes.store.module';
import { BuildConfigDialogsModule } from '../../buildconfig/delete-dialog/buildconfig.dialogs.module';
import { PipelineViewToolbarComponent } from '../view-toolbar/view-toolbar.pipeline.component';
import { PipelineViewComponent } from '../view/view.pipeline.component';
import { TestAppModule } from './../../../../app.test.module';
import { StageTimePipe } from './../build-stage-view/stage-time.pipe';
import { PipelineViewWrapperComponent } from './view-wrapper.pipeline.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PipelineViewWrapperComponent', () => {
  let pipeline: PipelineViewWrapperComponent;
  let fixture: ComponentFixture<PipelineViewWrapperComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule,
          Fabric8CommonModule,
          FormsModule,
          MomentModule,
          ModalModule,
          RouterTestingModule.withRoutes([]),
          RestangularModule.forRoot(),
          KubernetesStoreModule,
          BuildConfigDialogsModule,
          TestAppModule
        ],
        declarations: [
          PipelineViewWrapperComponent,
          PipelineViewToolbarComponent,
          PipelineViewComponent,
          StageTimePipe
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineViewWrapperComponent);
    pipeline = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(pipeline).toBeTruthy(); });
});
