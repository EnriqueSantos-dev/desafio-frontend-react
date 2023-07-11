import { z } from "zod";

import { NextResponse } from "next/server";

import { getDatabaseAdmin } from "@/config/firebase/server";

import { withAuthRoute } from "@/utils/with-auth-hoc";

const schema = z.object({
  gameId: z.number().positive(),
});

export const POST = withAuthRoute(async ({ request, user }) => {
  try {
    const refFavGames = getDatabaseAdmin().ref("games-details/favorite_games");
    const body = await request.json();

    const parsedResult = schema.safeParse(body);

    if (!parsedResult.success) {
      return NextResponse.json({ message: "Invalid game id" }, { status: 400 });
    }

    const { gameId } = parsedResult.data;
    const existFavoriteGameKey = await refFavGames
      .orderByChild("game_user_id")
      .equalTo(`${gameId}_${user.uid}`)
      .once("value");

    if (existFavoriteGameKey.exists()) {
      existFavoriteGameKey.forEach((child) => {
        if (child.key) {
          refFavGames.child(child.key).remove();
        }
      });

      return NextResponse.json(
        { message: "Game removed from your favorites" },
        { status: 201 }
      );
    }

    refFavGames.push({
      game_id: parsedResult.data.gameId,
      user_id: user.uid,
      game_user_id: `${gameId}_${user.uid}`,
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
