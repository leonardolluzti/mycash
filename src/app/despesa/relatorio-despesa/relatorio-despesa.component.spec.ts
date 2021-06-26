import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDespesaComponent } from './relatorio-despesa.component';

describe('RelatorioDespesaComponent', () => {
  let component: RelatorioDespesaComponent;
  let fixture: ComponentFixture<RelatorioDespesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDespesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
