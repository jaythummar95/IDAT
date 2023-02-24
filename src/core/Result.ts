export interface IResult {
  isSuccess: boolean;
  isFailure: boolean;
  isWaiting: boolean;
  isEmpty: boolean;
}

export class Result<T> implements IResult {
  public isSuccess: boolean;
  public isFailure: boolean;
  public isWaiting: boolean;
  public error?: string;
  data?: T;

  private constructor(
    isSuccess: boolean,
    isWaiting: boolean,
    error?: string,
    data?: T,
  ) {
    if (!isWaiting && isSuccess && error) {
      throw new Error('Invalid Operation');
    }
    if (!isWaiting && !isSuccess && !error) {
      throw new Error('Invalid Operation');
    }

    this.isWaiting = isWaiting;
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.data = data;

    Object.freeze(this);
  }

  public getValue(): T {
    if (this.isWaiting || this.isFailure) {
      return {} as T;
    }
    if (!this.isSuccess) {
      throw new Error('No data found');
    }
    return this.data as T;
  }

  get isEmpty(): boolean {
    return !!(Array.isArray(this.data) && this.data.length === 0);
  }
  public static ok<U>(value?: U): Result<U> {
    if (value) {
      let mValue = value as Object;
      // @ts-ignore
      // console.log('mValue ==>', mValue.success);
      if (mValue.hasOwnProperty('success')) {
        // @ts-ignore
        if (mValue?.success === 1) {
          // @ts-ignore
          return new Result<U>(true, false, undefined, value);
        } else {
          // console.log("PPPP");
          // @ts-ignore
          return new Result<U>(false, false, mValue?.message);
        }
      } else {
        // console.log('DDDDD');
        return new Result<U>(true, false, undefined, value);
      }
    }

    return new Result<U>(true, false, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, false, error);
  }

  public static waiting<U>(): Result<U> {
    return new Result<U>(false, true);
  }

  // combine several results and determine the overall success or failure states
  public static combine(results: Result<any>[]): Result<any> {
    for (let index = 0; index < results.length; index += 1) {
      if (results[index].isFailure || results[index].isWaiting) {
        return results[index];
      }
    }
    return Result.ok<any>();
  }
}
