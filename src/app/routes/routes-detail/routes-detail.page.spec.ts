import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutesDetailPage } from './routes-detail.page';

describe('RoutesDetailPage', () => {
  let component: RoutesDetailPage;
  let fixture: ComponentFixture<RoutesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
