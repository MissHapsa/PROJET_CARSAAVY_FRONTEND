import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutrdvComponent } from './ajoutrdv.component';

describe('AjoutrdvComponent', () => {
  let component: AjoutrdvComponent;
  let fixture: ComponentFixture<AjoutrdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutrdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutrdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
