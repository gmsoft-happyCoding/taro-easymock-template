import Taro from "@tarojs/taro";
import type { Conf } from "./type";

const defaultParams = {
  header: {
    "Content-type": "application/json",
  },
};

function createAPI(baseURL: string) {
  return function (conf: Conf) {
    conf = conf || {};
    return Taro.request(
      Object.assign(
        {},
        defaultParams,
        {
          url: conf.url,
          baseURL: baseURL,
          method: conf.method,
        },
        conf.opts
      )
    );
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp("(:" + key + "|{" + key + "})", "g");
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export { createAPI, convertRESTAPI };
