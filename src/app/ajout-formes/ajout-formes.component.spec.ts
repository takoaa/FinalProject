import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFormesComponent } from './ajout-formes.component';

describe('AjoutFormesComponent', () => {
  let component: AjoutFormesComponent;
  let fixture: ComponentFixture<AjoutFormesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutFormesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutFormesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
