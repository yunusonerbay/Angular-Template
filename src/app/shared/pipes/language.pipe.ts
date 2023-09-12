import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'language',
  pure: false
})
export class LanguagePipe implements PipeTransform {

  constructor(
    private language: LanguageService
  ) {
  }

  transform(key: any): any {
    return this.language.data[key];
  }

}