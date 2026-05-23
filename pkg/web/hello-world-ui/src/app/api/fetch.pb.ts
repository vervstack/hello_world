/* eslint-disable */
// @ts-nocheck
/*
 * This file is a created by the TypeScript generator for the GRPC Gateway.
 * DO NOT MODIFY
 */

export interface InitReq extends RequestInit {
  pathPrefix?: string;
}

export function replacer(_key: string, value: unknown): unknown {
  if (value && value instanceof Uint8Array) {
    return b64Encode(value, 0, value.length);
  }
  return value;
}

export function fetchRequest<R>(path: string, init?: InitReq): Promise<R> {
  const { pathPrefix, ...req } = init ?? {};
  const url = pathPrefix ? `${pathPrefix}${path}` : path;
  return fetch(url, req).then((r) =>
    r.json().catch((_err) => { throw r; }).then((body: R) => {
      if (!r.ok) throw body;
      return body;
    })
  );
}

type Primitive = string | boolean | number;
type RequestPayload = Record<string, unknown>;
type FlattenedRequestPayload = Record<string, Primitive | Primitive[]>;

function isPlainObject(value: unknown): boolean {
  const isObject = Object.prototype.toString.call(value).slice(8, -1) === "Object";
  const isObjLike = value !== null && isObject;
  if (!isObjLike || !isObject) return false;
  const proto: unknown = Object.getPrototypeOf(value);
  const hasObjectConstructor = !!(proto && typeof proto === "object" && proto.constructor === Object.prototype.constructor);
  return hasObjectConstructor;
}

function isPrimitive(value: unknown): boolean {
  return ["string", "number", "boolean"].some((t) => typeof value === t);
}

function flattenRequestPayload<T extends RequestPayload>(requestPayload: T, path = ""): FlattenedRequestPayload {
  return Object.keys(requestPayload).reduce((acc: T, key: string): T => {
    const value = requestPayload[key];
    const newPath = path ? [path, key].join(".") : key;
    const isNonEmptyPrimitiveArray = Array.isArray(value) && value.every((v) => isPrimitive(v)) && value.length > 0;
    let objectToMerge = {};
    if (isPlainObject(value)) {
      objectToMerge = flattenRequestPayload(value as RequestPayload, newPath);
    } else if (isPrimitive(value) || isNonEmptyPrimitiveArray) {
      objectToMerge = { [newPath]: value };
    }
    return { ...acc, ...objectToMerge };
  }, {} as T) as FlattenedRequestPayload;
}

export function renderURLSearchParams<T extends RequestPayload>(requestPayload: T, urlPathParams: string[] = []): string {
  const flattenedRequestPayload = flattenRequestPayload(requestPayload);
  const urlSearchParams = Object.keys(flattenedRequestPayload).reduce((acc: string[][], key: string): string[][] => {
    const value = flattenedRequestPayload[key];
    if (urlPathParams.find((f) => f === key)) return acc;
    return Array.isArray(value)
      ? [...acc, ...value.map((m) => [key, m.toString()])]
      : (acc = [...acc, [key, value.toString()]]);
  }, [] as string[][]);
  return new URLSearchParams(urlSearchParams).toString();
}

// base64 helpers
const b64 = new Array<number>(64);
const s64 = new Array<number>(123);
for (let i = 0; i < 64; ) {
  s64[(b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : (i - 59) | 43)] = i++;
}

export function b64Encode(buffer: Uint8Array, start: number, end: number): string {
  let parts: string[] | null = null;
  const chunk: number[] = [];
  let i = 0, j = 0, t = 0;
  while (start < end) {
    const b = buffer[start++];
    switch (j) {
      case 0: chunk[i++] = b64[b >> 2]; t = (b & 3) << 4; j = 1; break;
      case 1: chunk[i++] = b64[t | (b >> 4)]; t = (b & 15) << 2; j = 2; break;
      case 2: chunk[i++] = b64[t | (b >> 6)]; chunk[i++] = b64[b & 63]; j = 0; break;
    }
    if (i > 8191) { (parts ?? (parts = [])).push(String.fromCharCode(...chunk)); i = 0; }
  }
  if (j) { chunk[i++] = b64[t]; chunk[i++] = 61; if (j === 1) chunk[i++] = 61; }
  if (parts) { if (i) parts.push(String.fromCharCode(...chunk.slice(0, i))); return parts.join(""); }
  return String.fromCharCode(...chunk.slice(0, i));
}
