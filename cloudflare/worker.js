// 同查找 _U 一样, 查找 KievRPSSecAuth 的值并替换下方的xxx
const KievRPSSecAuth = 'FABKBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACCAw3g18sVJ5CASxUlIfk5w2q+fxAJMVptBhq+5j9LewsnCC5H/5GQLXgtcfqBiNBhwxWJfeTW6qoXIYGDxfNrwXeXCFe24HEkn6a8g+H3k11GpeoThZWgh+CBersdIgGOtorgsrT6cT0wMe/hfmmAu5iIzyI1VSYXJ+D8fekayHH1guJfY+yYaZrLM+R+hqHTAuNTF+lE79NiUYKvfMLmGOxEyBxlDPzdRyXUuJqK6/XSh67oQOfMf96Kv+uWapsS0WK7CcVx5+ozY3OPKtyeYprMNmEnTJyFiPVVTMQuoQBMCT/x3TyrIwxjd3MNWVePTbbzYUFqRLDxQqxtC0Zh3fIdIaxPcYGFXizLcRz6vCv8qUcVK1ShOmTpI1DpVb31Ue5jcZ658lQgBW9WYOLtlI0dX7+18gtNfNX4xft+4xQq4S4TwitMl7Ym68MGnw0WvaH8PSVxMDH6IKHIYl7QGqoa4LrJrpn9OqCxDKsHXdq5LMHhsT3SvRnr74CeTxo8gvobqM0PGNiFNxzl6al6NvgOYODqiRkCnZ/o+IePNTKyxCOaoT8I7EDQXUC5qbfouY1DKGabq5vcLKXUMmrBmVLUi8on1hWVNsiYmkCxp13k3WCzDEmz//QZ0dh9r2qkbOfzRTgOGNjZCnD/mYWxBT4mmPmXvkpWUjjXLYkmInK+XecgGK8fj068PDq0w7oc8joh2WQavjFMh0JtndVdyxOJ+YZyKGfHX9jymlKp2oAIMQOIhtRkkoCYhK8gvgl0J1xCiSmVm4X5CAztvo9vztmB2fgeNhsovX8csZGgCC2UC0/ZuENv3VD1LABudnqnzpiyQK27I/O99TnKNYqZdGtDE+gDLDcWXTWL5D4Xxf1SP25VF8bgU/1sBFXg+ZskZyPTECFQF3MJBhYdkVNsNLYpkIzxn6clRMeHc8n/m28belXqqe3DHq+0zBXkYZljZEIz+k06GOXhYhZVl9jOlLOs5u3Dlsb4vAg4ZkDo/XdlsEo/iah9/x5eMBfzoIPCNaSYW76EqBaVRtgw5a7xuZXTizyPqF0EHZuvTnoRO6WKkvQHw7DfsFZdaL1vgNuqy+t+10CWb2gOFFlQigQsFvIeEWBVfxu15wcCSu26uTgtBA2NgvUuBFvSShEZmZdt4KDSY3+gXDgYfpMywN03p3srr3PELV6bFhjuFdzHgD26ChZPXsq+yyHhQOw7YCs0jP4WBQZi/9bnGPj+MnWJX6brV2J/HMg16UFTx6Z56mkSCLfWWIq08zV1A+S/OrujhdrgchH76SwrQ0+beJm89ktccs3FDUaJzcUq/89X2fqRpIYr17Bk/xRGUC+BB789/m+iD81ZjHUEnM+hrQoPqWn0VtiFk2b4Wx5sr/IiBTBusUAF2YJ21IL/jIDePoYcyhBva0CyLC';
const SYDNEY_ORIGIN = 'https://sydney.bing.com';
const KEEP_REQ_HEADERS = [
  'accept',
  'accept-encoding',
  'accept-language',
  'connection',
  'cookie',
  'upgrade',
  'user-agent',
  'sec-websocket-extensions',
  'sec-websocket-key',
  'sec-websocket-version',
  'x-request-id',
  'content-length',
  'content-type',
  'access-control-request-headers',
  'access-control-request-method',
];
const IP_RANGE = [
  ['3.2.50.0', '3.5.31.255'], //192,000
  ['3.12.0.0', '3.23.255.255'], //786,432
  ['3.30.0.0', '3.33.34.255'], //205,568
  ['3.40.0.0', '3.63.255.255'], //1,572,864
  ['3.80.0.0', '3.95.255.255'], //1,048,576
  ['3.100.0.0', '3.103.255.255'], //262,144
  ['3.116.0.0', '3.119.255.255'], //262,144
  ['3.128.0.0', '3.247.255.255'], //7,864,320
];

/**
 * 随机整数 [min,max)
 * @param {number} min
 * @param {number} max
 * @returns
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * ip 转 int
 * @param {string} ip
 * @returns
 */
const ipToInt = (ip) => {
  const ipArr = ip.split('.');
  let result = 0;
  result += +ipArr[0] << 24;
  result += +ipArr[1] << 16;
  result += +ipArr[2] << 8;
  result += +ipArr[3];
  return result;
};

/**
 * int 转 ip
 * @param {number} intIP
 * @returns
 */
const intToIp = (intIP) => {
  return `${(intIP >> 24) & 255}.${(intIP >> 16) & 255}.${(intIP >> 8) & 255}.${intIP & 255}`;
};

const getRandomIP = () => {
  const randIndex = getRandomInt(0, IP_RANGE.length);
  const startIp = IP_RANGE[randIndex][0];
  const endIp = IP_RANGE[randIndex][1];
  const startIPInt = ipToInt(startIp);
  const endIPInt = ipToInt(endIp);
  const randomInt = getRandomInt(startIPInt, endIPInt);
  const randomIP = intToIp(randomInt);
  return randomIP;
};

/**
 * home
 * @param {string} pathname
 * @returns
 */
const home = async (pathname) => {
  const baseUrl = 'https://raw.githubusercontent.com/adams549659584/go-proxy-bingai/master/';
  let url;
  // if (pathname.startsWith('/github/')) {
  if (pathname.indexOf('/github/') === 0) {
    url = pathname.replace('/github/', baseUrl);
  } else {
    url = baseUrl + 'cloudflare/index.html';
  }
  const res = await fetch(url);
  const newRes = new Response(res.body, res);
  if (pathname === '/') {
    newRes.headers.delete('content-security-policy');
    newRes.headers.set('content-type', 'text/html; charset=utf-8');
  }
  return newRes;
};

export default {
  /**
   * fetch
   * @param {Request} request
   * @param {*} env
   * @param {*} ctx
   * @returns
   */
  async fetch(request, env, ctx) {
    const currentUrl = new URL(request.url);
    // if (currentUrl.pathname === '/' || currentUrl.pathname.startsWith('/github/')) {
    if (currentUrl.pathname === '/' || currentUrl.pathname.indexOf('/github/') === 0) {
      return home(currentUrl.pathname);
    }
    const targetUrl = new URL(SYDNEY_ORIGIN + currentUrl.pathname + currentUrl.search);

    const newHeaders = new Headers();
    request.headers.forEach((value, key) => {
      // console.log(`old : ${key} : ${value}`);
      if (KEEP_REQ_HEADERS.includes(key)) {
        newHeaders.set(key, value);
      }
    });
    newHeaders.set('host', targetUrl.host);
    newHeaders.set('origin', targetUrl.origin);
    newHeaders.set('referer', 'https://www.bing.com/search?q=Bing+AI');
    const randIP = getRandomIP();
    // console.log('randIP : ', randIP);
    newHeaders.set('X-Forwarded-For', randIP);
    newHeaders.set('Cookie', 'KievRPSSecAuth='+KievRPSSecAuth+';');
    const oldUA = request.headers.get('user-agent');
    const isMobile = oldUA.includes('Mobile') || oldUA.includes('Android');
    if (isMobile) {
      newHeaders.set(
        'user-agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/605.1.15 BingSapphire/1.0.410427012'
      );
    } else {
      newHeaders.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35');
    }

    // newHeaders.forEach((value, key) => console.log(`${key} : ${value}`));
    const newReq = new Request(targetUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
    });
    // console.log('request url : ', newReq.url);
    const res = await fetch(newReq);
    return res;
  },
};
