import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const icons: IconDefinition[] = [
  faAngleDown
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class AppIconsModule { 
  constructor(lib: FaIconLibrary) {
    library.add(...icons);
  }
}
