import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosDeudasPagosComponent } from './registros-deudas-pagos.component';

describe('RegistrosDeudasPagosComponent', () => {
  let component: RegistrosDeudasPagosComponent;
  let fixture: ComponentFixture<RegistrosDeudasPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosDeudasPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrosDeudasPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
