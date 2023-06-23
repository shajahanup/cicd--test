import errCodes from '@exceptions/error_codes';
import config from 'config';
const defaultLanguage = config.get('serverConfig.defaultLanguage');

/**
 * Singleton implementation of translation class
 * TODO: Add locking mechanism to have exclusive access on update to this
 */
class Translations {
  translations: {};

  constructor() {
    this.translations = {};
  }

  /**
   * Provide translation for the given key.
   * If not found returns the key
   * @param {*} key
   * @param {*} language
   */
  translate(key, language) {
    if (!language) {
      language = defaultLanguage;
    }
    if (!this.translations[language]) {
      console.error(errCodes.INVALID_LANGUAGE, language);
      return key;
    }
    return this.translations[language][key] ? this.translations[language][key] : key;
  }

  loadTranslations() {
    this.translations = {};
    // TODO: Load translations from database
  }
}

export default new Translations();
