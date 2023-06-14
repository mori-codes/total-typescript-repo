import { Equal, Expect } from "../helpers/type-utils"

type UserPath = "/users/:id"

type UserOrganisationPath = "/users/:id/organisations/:organisationId"

type Split<T> = T extends `${infer Prev}/${infer Post}`
  ? Prev extends ""
    ? [...Split<Post>]
    : [Prev, ...Split<Post>]
  : [T]

type ExtractPathParams<T extends string> = {
  [Param in Split<T>[number] as Param extends `:${infer Key}` ? Key : never]: string
}

type UserParams = ExtractPathParams<UserPath>

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
]
