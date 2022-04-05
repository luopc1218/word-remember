
export const playWordVoice = (word: string) => {
  const VOCIE_URL = 'http://dict.youdao.com/dictvoice?type=0&audio=';
  const vocie = new Audio(VOCIE_URL + word);
  vocie.play();
};

export const parseUrlToJson = (url: string): Record<string, string> => {
  const arr = url.split('?')[1].split('&'); //先通过？分解得到？后面的所需字符串，再将其通过&分解开存放在数组里
  const obj = {};
  for (const i of arr) {
    obj[i.split('=')[0]] = i.split('=')[1]; //对数组每项用=分解开，=前为对象属性名，=后为属性值
  }
  return obj;
};

export const parseJsonToUrl = (obj: Record<string, any>): string =>
  Object.keys(obj)
    .map(function (key: string) {
      return key + '=' + encodeURIComponent(obj[key]);
    })
    .join('&');
