import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDeudasUsuariosComponent } from './tabla-deudas-usuarios.component';

describe('TablaDeudasUsuariosComponent', () => {
  let component: TablaDeudasUsuariosComponent;
  let fixture: ComponentFixture<TablaDeudasUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDeudasUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaDeudasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
