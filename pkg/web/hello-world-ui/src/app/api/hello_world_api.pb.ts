/* eslint-disable */
// @ts-nocheck

/**
 * This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
 */

import * as fm from "./fetch.pb";

export type VersionRequest = Record<string, never>;

export type VersionResponse = {
  version?: string;
};

export type Value = {
  key?: string;
  value?: string;
};

export type Values = {
  values?: Value[];
};

export type GetRequest = {
  key?: string;
};

export type SetRequest = {
  vals?: Values;
};

export type SetResponse = Record<string, never>;

export class helloWorldAPI {
  static Version(this: void, req: VersionRequest, initReq?: fm.InitReq): Promise<VersionResponse> {
    return fm.fetchRequest<VersionResponse>(`/api/version?${fm.renderURLSearchParams(req, [])}`, { ...initReq, method: "GET" });
  }
  static Get(this: void, req: GetRequest, initReq?: fm.InitReq): Promise<Value> {
    return fm.fetchRequest<Value>(`/api/get/${req.key}?${fm.renderURLSearchParams(req, ["key"])}`, { ...initReq, method: "GET" });
  }
  static Set(this: void, req: SetRequest, initReq?: fm.InitReq): Promise<SetResponse> {
    return fm.fetchRequest<SetResponse>(`/api/set`, { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) });
  }
}
