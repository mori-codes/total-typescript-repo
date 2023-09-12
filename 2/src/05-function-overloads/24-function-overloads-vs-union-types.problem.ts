import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

type GeneratorType<T> = () => T | { run: () => T }

function runGenerator<T>(generator: () => T): T // Optional
function runGenerator<T>(generator: {run: () => T}): T // Optional
function runGenerator<T>(generator: (() => T) | {run: () => T}) {
  if (typeof generator === "function") {
    return generator()
  }
  return generator.run()
}

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator({
    run: () => "hello",
  })

  expect(result).toBe("hello")

  type test1 = Expect<Equal<typeof result, string>>
})

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator(() => "hello")

  expect(result).toBe("hello")

  type test1 = Expect<Equal<typeof result, string>>
})
