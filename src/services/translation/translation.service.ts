import * as deepl from 'deepl-node';
import config from 'config';
import { findKey } from 'lodash';
import { Languages } from '@/enums/languages.enum';
import { HttpException } from '@/exceptions/HttpException';

export default class TranslationService {
  private readonly authKey: string;
  private readonly translator: deepl.Translator;

  constructor() {
    this.authKey = config.get('deeplAuthKey');
    this.translator = new deepl.Translator(this.authKey);
  }

  public async translate(model: Object, keys: Array<string>, language: string) {
    const translatedObject: Object = {};
    const filteredModelValues: Array<string> = [];
    const filteredModelKeys: Array<string> = [];

    for (const property in model) {
      if (keys.includes(property)) {
        filteredModelValues.push(model[property]);
        filteredModelKeys.push(property);
      } else {
        translatedObject[property] = model[property];
      }
    }

    try {
      if (language == Languages.EN) {
        const translated = await this.translator.translateText(filteredModelValues, 'en', 'de');
        filteredModelValues.forEach((nonTranslatedItem, index) => {
          const key = filteredModelKeys[index];
          translatedObject[key + 'En'] = nonTranslatedItem;
          translatedObject[key + 'De'] = translated[index].text;
        });
      } else {
        const translated = await this.translator.translateText(filteredModelValues, 'de', 'en-US');
        filteredModelValues.forEach((nonTranslatedItem, index) => {
          const key = filteredModelKeys[index];
          translatedObject[key + 'De'] = nonTranslatedItem;
          translatedObject[key + 'En'] = translated[index].text;
        });
      }
    } catch (e) {
      console.log('Deepl error occured: ' + e);
      throw new HttpException('Translation Failed');
    }
    console.log('translated :' + translatedObject);
    return translatedObject;
  }
}
