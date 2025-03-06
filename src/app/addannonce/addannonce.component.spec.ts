import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddannonceComponent } from './addannonce.component';

describe('AddannonceComponent', () => {
  let component: AddannonceComponent;
  let fixture: ComponentFixture<AddannonceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddannonceComponent]
    });
    fixture = TestBed.createComponent(AddannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
