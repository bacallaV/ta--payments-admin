import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownPageComponent } from './unknown-page.component';

describe('UnknownPageComponent', () => {
  let component: UnknownPageComponent;
  let fixture: ComponentFixture<UnknownPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnknownPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
