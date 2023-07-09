import { z } from "zod";

import { NextResponse } from "next/server";

import { getDatabaseAdmin } from "@/config/firebase/server";

import { withAuthRoute } from "@/utils/with-auth-hoc";

const schema = z.object({
  gameId: z.number().positive(),
});

export const POST = withAuthRoute(async ({ request, user }) => {
  const body = await request.json();

  const parsedResult = schema.safeParse(body);

  if (!parsedResult.success) {
    return NextResponse.json({ message: "Invalid game id" }, { status: 400 });
  }

  try {
    let existFavoriteGameKey: string | null = null;
    const refFavGames = getDatabaseAdmin().ref("games-details/favorite_games");
    const favGames = await refFavGames.get();

    favGames.forEach((favGame) => {
      if (favGame.val().game_id === parsedResult.data.gameId) {
        existFavoriteGameKey = favGame.key;
      }
    });

    if (existFavoriteGameKey) {
      await refFavGames.child(existFavoriteGameKey).remove();

      return NextResponse.json(
        { message: "Game removed from your favorites" },
        { status: 201 }
      );
    }

    refFavGames.push({
      game_id: parsedResult.data.gameId,
      user_id: user.uid,
    });

    return NextResponse.json(
      { message: "Game added to favorites" },
      { status: 201 }
    );
  } catch (error) {
    console.log("FAVORITE_POST_GAME ERROR", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
