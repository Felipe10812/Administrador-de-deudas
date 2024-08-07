import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropUsuariosComponent } from './drop-usuarios.component';

describe('DropUsuariosComponent', () => {
  let component: DropUsuariosComponent;
  let fixture: ComponentFixture<DropUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
