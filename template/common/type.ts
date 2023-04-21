import Taro from "@tarojs/taro";

// 如果有额外的配置项, 请在此声明类型
type Extend = {};

interface PathParam {
  path: { [key: string]: string };
}

export type Opts = Taro.request.Option & Extend;

export type WithPathOpts = Opts & PathParam;

export type Conf = Opts & { opts?: Partial<PathParam> };
