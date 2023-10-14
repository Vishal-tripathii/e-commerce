import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrarchComponent } from './srarch.component';

describe('SrarchComponent', () => {
  let component: SrarchComponent;
  let fixture: ComponentFixture<SrarchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SrarchComponent]
    });
    fixture = TestBed.createComponent(SrarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
