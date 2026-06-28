import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffsMatches } from './playoffs-matches';

describe('PlayoffsMatches', () => {
  let component: PlayoffsMatches;
  let fixture: ComponentFixture<PlayoffsMatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayoffsMatches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayoffsMatches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
