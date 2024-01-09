import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

function compose<TParam5, TParam4, TParam3, TParam2, TParam1, TReturn>(
  ...funcs: [
    (param: TParam5) => TParam4,
    (param: TParam4) => TParam3,
    (param: TParam3) => TParam2,
    (param: TParam2) => TParam1,
    (param: TParam1) => TReturn
  ]
): (param: TParam5) => TReturn
function compose<TParam4, TParam3, TParam2, TParam1, TReturn>(
  ...funcs: [
    (param: TParam4) => TParam3,
    (param: TParam3) => TParam2,
    (param: TParam2) => TParam1,
    (param: TParam1) => TReturn
  ]
): (param: TParam4) => TReturn
function compose<TParam3, TParam2, TParam1, TReturn>(
  ...funcs: [
    (param: TParam3) => TParam2,
    (param: TParam2) => TParam1,
    (param: TParam1) => TReturn
  ]
): (param: TParam3) => TReturn
function compose<TParam2, TParam1, TReturn>(
  ...funcs: [(param: TParam2) => TParam1, (param: TParam1) => TReturn]
): (param: TParam2) => TReturn
function compose<TParam1, TReturn>(
  ...funcs: [(param: TParam1) => TReturn]
): (param: TParam1) => TReturn
function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input)
  }
}

const addOne = (num: number) => {
  return num + 1
}

const addTwoAndStringify = compose(addOne, addOne, String)

it("Should compose multiple functions together", () => {
  const result = addTwoAndStringify(4)

  expect(result).toEqual("6")

  type tests = [Expect<Equal<typeof result, string>>]
})

it("Should error when the input to a function is not typed correctly", () => {
  const stringifyThenAddOne = compose(
    // addOne takes in a number - so it shouldn't be allowed after
    // a function that returns a string!
    // @ts-expect-error
    String,
    addOne
  )
})
