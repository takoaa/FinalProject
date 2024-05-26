import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMateriauComponent } from './ajout-materiau.component';

describe('AjoutMateriauComponent', () => {
  let component: AjoutMateriauComponent;
  let fixture: ComponentFixture<AjoutMateriauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutMateriauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutMateriauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
