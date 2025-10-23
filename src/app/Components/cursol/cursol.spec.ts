import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cursol } from './cursol';

describe('Cursol', () => {
  let component: Cursol;
  let fixture: ComponentFixture<Cursol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cursol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cursol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
