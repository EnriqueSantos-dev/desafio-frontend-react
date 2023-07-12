import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/services/users/get-auth-session";
import { SessionData } from "@/types";

type HandlerFunction<
  TParams extends { params: Record<string, string | number> } = any
> = (data: {
  request: NextRequest;
  params: TParams["params"];
  user: SessionData;
}) => Promise<NextResponse>;

/**
 *
 * @typeParam TParams, the params of the route
 * @description this function is a HOC that will check if the user is authenticated
 * @returns call the handler if the user is authenticated and pass user object, otherwise return a 401 response
 */
export function withAuthRoute<
  TParams extends { params: Record<string, string | number> }
>(handler: HandlerFunction<TParams>) {
  return async (request: NextRequest, params: TParams) => {
    const hasSession = await getAuthSession();

    if (!hasSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return handler({ request, params: params.params, user: hasSession });
  };
}
