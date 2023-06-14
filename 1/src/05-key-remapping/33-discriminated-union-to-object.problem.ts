import { Equal, Expect } from "../helpers/type-utils"

type Route =
  | {
      route: "/"
      search: {
        page: string
        perPage: string
      }
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} }

// This was my original idea, I am clearly stoopid
// type RoutesObject = {
//   [K in Route["route"]]: Extract<Route, {route: K}>["search"]
// };

type RoutesObject = {
  [K in Route as K["route"]]: K["search"]
}

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string
          perPage: string
        }
        "/about": {}
        "/admin": {}
        "/admin/users": {}
      }
    >
  >
]
