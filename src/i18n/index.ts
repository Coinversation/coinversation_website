import intl from "react-intl-universal";
import storage from "@/utils/storage";
import en from "./en-us";
import zh from "./zh-cn";

/**
 * 国际化
 */

let currentLocale: string = intl.determineLocale({
  urlLocaleKey: "lang",
  localStorageLocaleKey: "lang",
});
// 如果没映射到，默认为英文
if (!currentLocale) {
  currentLocale = "en";
}
// 浏览默认语言映射成合法的格式

if (!currentLocale) {
  currentLocale = "en";
} else {
  currentLocale = currentLocale.toLocaleLowerCase();
  if (currentLocale.indexOf("zh") > -1) {
    currentLocale = "zh";
  } else {
    currentLocale = "en";
  }
}
// 存入storage初始化
storage.set("lang", currentLocale);
intl.init({
  currentLocale,
  locales: {
    en: en,
    zh: zh,
  },
});
