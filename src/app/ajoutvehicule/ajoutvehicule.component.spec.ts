import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutvehiculeComponent } from './ajoutvehicule.component';

describe('AjoutvehiculeComponent', () => {
  let component: AjoutvehiculeComponent;
  let fixture: ComponentFixture<AjoutvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutvehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
