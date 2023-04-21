import Taro from "@tarojs/taro";
import { omit } from "lodash";
import type { Conf } from "./type";

const defaultParams = {
  header: {
    "Content-type": "application/json",
  },
};

function createAPI(baseURL?: string) {
  return function (conf: Conf) {
    conf = conf || {};

    const paramsSerializer = conf.paramsSerializer;

    const requestData = conf.data;

    return Taro.request(
      Object.assign(
        {},
        defaultParams,
        {
          url: `${baseURL}${conf.url}`,
          method: conf.method,
        },
        omit(conf.opts, ["path", "paramsSerializer"]),
        !!paramsSerializer
          ? {
              data: paramsSerializer(requestData) || requestData,
            }
          : {}
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
