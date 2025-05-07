import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'token') {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
       'eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ.' +
       'signaturePlaceholder'; 
      }
      return null;
    });
    
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [SidebarComponent, HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: mockStore },
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});