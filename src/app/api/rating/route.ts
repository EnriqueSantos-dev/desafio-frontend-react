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

    const ratingsRef = getDatabaseAdmin().ref(
      `games/users/${user.uid}/ratings_and_favorites`
    );

    ratingsRef.child(`id_${parsedBody.data.gameId}`).update({
      rating: parsedBody.data.rating,
    });

    return NextResponse.json(
      { message: "Rating updated successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ops! Something went wrong." },
      { status: 500 }
    );
  }
});
