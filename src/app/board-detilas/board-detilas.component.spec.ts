import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetilasComponent } from './board-detilas.component';

describe('BoardDetilasComponent', () => {
  let component: BoardDetilasComponent;
  let fixture: ComponentFixture<BoardDetilasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDetilasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetilasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
