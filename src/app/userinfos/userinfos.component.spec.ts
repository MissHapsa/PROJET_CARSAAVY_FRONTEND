import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfosComponent } from './userinfos.component';

describe('UserinfosComponent', () => {
  let component: UserinfosComponent;
  let fixture: ComponentFixture<UserinfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserinfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
