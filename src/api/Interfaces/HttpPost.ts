import { Result } from "../../Core/Result";

export interface HttpPost<T> {
  post(...args: any): Promise<Result<T>>;
}
