import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPannelComponent } from './reg-pannel.component';

describe('RegPannelComponent', () => {
  let component: RegPannelComponent;
  let fixture: ComponentFixture<RegPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
