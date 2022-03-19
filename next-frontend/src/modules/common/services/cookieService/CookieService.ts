/* eslint-disable */
export class CookieService {
  static getCookie(name: string, cookie = document.cookie) {
    const matches = cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`,
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  static setCookie(name: string, value: string, options = {}) {
    options = {
      path: "/",
      ...options,
    };

    // @ts-ignore
    if (options.expires instanceof Date) {
      // @ts-ignore
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }

    document.cookie = updatedCookie;
  }

  static deleteCookie(name: string) {
    CookieService.setCookie(name, "", {
      "max-age": -1,
    });
  }
}
