import { z } from "zod";

import { NextResponse } from "next/server";

import { getDatabaseAdmin } from "@/config/firebase/server";

import { withAuthRoute } from "@/utils/with-auth-hoc";

const schema = z.object({
  gameId: z.number().positive(),
  isFav: z.boolean(),
});

export const POST = withAuthRoute(async ({ request, user }) => {
  try {
    const body = await request.json();

    const parsedResult = schema.safeParse(body);

    if (!parsedResult.success) {
      return NextResponse.json({ message: "Invalid game id" }, { status: 400 });
    }

    const { gameId, isFav } = parsedResult.data;

    const refFavGames = getDatabaseAdmin().ref(
      `games/users/${user.uid}/ratings_and_favorites`
    );

    refFavGames.child(`id_${gameId}`).update({
      isFavorite: isFav,
    });

    return NextResponse.json(
      { message: "Favorite status updated" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
