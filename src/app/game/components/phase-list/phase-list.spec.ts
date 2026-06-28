import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseList } from './phase-list';

describe('PhaseList', () => {
  let component: PhaseList;
  let fixture: ComponentFixture<PhaseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
