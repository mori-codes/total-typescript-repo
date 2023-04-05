import { Equal, Expect } from "../helpers/type-utils"

const parser1 = {
  parse: () => 1,
}

const parser2 = () => "123"

const parser3 = {
  extract: () => true,
}

// type GetParserResult<T> = T extends { parse: () => infer TParser1 }
//   ? TParser1
//   : T extends () => infer TParser2
//   ? TParser2
//   : T extends { extract: () => infer TParser3 }
//   ? TParser3
//   : never

type GetParserResult<T> = T extends { parse: () => infer TResult } | (() => infer TResult) | { extract: () => infer TResult } ?
  TResult : never

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
]
