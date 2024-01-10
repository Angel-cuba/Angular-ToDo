import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalTextComponent } from './normal-text.component';

describe('NormalTextComponent', () => {
  let component: NormalTextComponent;
  let fixture: ComponentFixture<NormalTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormalTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
