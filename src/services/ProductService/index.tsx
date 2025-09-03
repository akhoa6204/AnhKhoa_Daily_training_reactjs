import { ENDPOINT } from "../../constant/endpoint";
import type { Params } from "../../interface/params";
import httpClient from "../httpClient";

export default class ProductService {
  static async getProducts(params?: Params, signal?: AbortSignal) {
    try {
      const res = await httpClient.get(ENDPOINT.PRODUCTS, {
        params,
        signal,
      });
      return res.data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
