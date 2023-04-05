import { Equal, Expect } from "../helpers/type-utils";

type Fruit = "apple" | "banana" | "orange";

type AppleOrBanana = Fruit extends "apple" | "banana"
  ? "apple" | "banana"
  : never;
// Mirar las soluciones, no se puede hacer sin un contexto genérico
type tests = [Expect<Equal<AppleOrBanana, "apple" | "banana">>];
