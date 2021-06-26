import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioReceitaComponent } from './relatorio-receita.component';

describe('RelatorioReceitaComponent', () => {
  let component: RelatorioReceitaComponent;
  let fixture: ComponentFixture<RelatorioReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
