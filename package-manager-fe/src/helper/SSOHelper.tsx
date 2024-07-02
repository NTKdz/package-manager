export interface SSOVinorSoftFEOptions {
  realmUrl: string;
  clientId: string;
  callbackUrl: string;
  scope?: string;
  idpHint?: string;
  logoutCallbackUrl?: string;
}

export interface TokenInfo {
  header: any;
  content: {
    exp: number;
    expired: boolean;
  };
  signature: string;
  signed: string;
}

export const isNodeEnvironment = (): boolean => {
  return typeof process === "object" && typeof window === "undefined";
};

export const Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (input: string): string {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }

    return output;
  },
  decode: function (input: string): string {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8_decode(output);

    return output.replace(/\0/g, "");
  },
  _utf8_encode: function (string: string): string {
    string = string.replace(/\r\n/g, "\n");
    let utftext = "";

    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  },
  _utf8_decode: function (utftext: string): string {
    let string = "";
    let i = 0;
    let c = 0;
    // let c1 = 0;
    let c2 = 0;
    let c3 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }

    return string;
  },
};

export const tokenInfo = (token: string): TokenInfo => {
  const res: any = {
    header: {},
    content: {
      exp: 0,
      expired: false,
    },
    signature: "",
    signed: "",
  };

  const isExpired = () => res.content.exp * 1000 < Date.now();

  try {
    const parts = token.split(".");
    const tt1 = Base64.decode(parts[0]).trim();
    const tt2 = Base64.decode(parts[1]).trim();
    const tt3 = Base64.decode(parts[2]).trim();

    res.header = JSON.parse(tt1);
    res.content = JSON.parse(tt2);
    if (isExpired()) throw new Error("Token expired");
    res.signature = tt3;
    res.signed = parts[0] + "." + parts[1];
    res.content.expired = false;
  } catch (_ex) {
    res.content.exp = 0;
    res.content.expired = true;
  }
  return res;
};

export const isExpired = (token: string): boolean => {
  const info = tokenInfo(token);
  return info.content.expired;
};

export const userInfo = (accessToken: string): any => {
  const info = tokenInfo(accessToken);
  return info.content.expired ? {} : info.content;
};

export const getLoginUrl = (opt: SSOVinorSoftFEOptions): string => {
  const config: SSOVinorSoftFEOptions = {
    realmUrl: opt.realmUrl,
    clientId: opt.clientId,
    callbackUrl: opt.callbackUrl,
    scope: opt.scope,
    idpHint: opt.idpHint,
    logoutCallbackUrl: opt.logoutCallbackUrl,
  };
  const callbackUrl = config.callbackUrl;

  const genUUid = (): string => {
    const s: any = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      const x1 = Math.floor(Math.random() * 0x10);
      s[i] = hexDigits.substring(x1, x1 + 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
  };

  const uuid = genUUid();
  let url =
    config.realmUrl +
    "protocol/openid-connect/auth" +
    "?client_id=" +
    encodeURIComponent(config.clientId) +
    "&state=" +
    encodeURIComponent(uuid) +
    "&redirect_uri=" +
    encodeURIComponent(callbackUrl) +
    "&scope=" +
    encodeURIComponent(config.scope ? "openid " + config.scope : "openid") +
    "&response_type=code";

  if (config.idpHint) {
    url += "&kc_idp_hint=" + encodeURIComponent(config.idpHint);
  }
  return url;
};

export const logoutUrl = (
  opt: SSOVinorSoftFEOptions,
  idTokenHint: string
): string => {
  const url = new URL(opt.realmUrl + "protocol/openid-connect/logout");
  if (opt.logoutCallbackUrl && idTokenHint) {
    url.searchParams.set("post_logout_redirect_uri", opt.logoutCallbackUrl);
    url.searchParams.set("id_token_hint", idTokenHint);
  }

  return url.toString();
};
