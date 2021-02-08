import intl from 'react-intl-universal';
import en_US from './en'
import zh_CN from './zh'

const language = {
  en_US,
  zh_CN
}

/**
 * 加载多语言
 * @param {string} lang zh_CN|en_US
 */
export default function loadLanguage(lang) {
  intl.init({
    currentLocale: lang, // TODO: determine locale here
    locales: language,
  });
}