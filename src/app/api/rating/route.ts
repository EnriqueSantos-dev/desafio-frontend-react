import { getDatabaseAdmin } from "@/config/firebase/server";
import { withAuthRoute } from "@/utils/with-auth-hoc";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  gameId: z.number(),
  rating: z.number().min(0).max(5),
});

export const PUT = withAuthRoute(async ({ request, user }) => {
  try {
    const body = await request.json();
    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const ratingsRef = getDatabaseAdmin().ref("games-details/ratings");

    const gameRating = await ratingsRef
      .orderByChild("game_user_id")
      .equalTo(`${parsedBody.data.gameId}_${user.uid}`)
      .once("value");

    if (gameRating.exists()) {
      gameRating.forEach((rating) => {
        if (rating.key) {
          const ratingRef = ratingsRef.child(rating.key);
          ratingRef.update({
            rating: parsedBody.data.rating,
          });
        }
      });

      return NextResponse.json(
        { message: "Rating updated successfully." },
        { status: 201 }
      );
    }

    ratingsRef.push({
      game_id: parsedBody.data.gameId,
      user_id: user.uid,
      game_user_id: `${parsedBody.data.gameId}_${user.uid}`,
      rating: parsedBody.data.rating,
    });

    return NextResponse.json(
      { message: "Rating created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Ops! Something went wrong." },
      { status: 500 }
    );
  }
});
