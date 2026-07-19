import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumOnFire } from './stadium-on-fire';

describe('StadiumOnFire', () => {
  let component: StadiumOnFire;
  let fixture: ComponentFixture<StadiumOnFire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadiumOnFire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadiumOnFire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
