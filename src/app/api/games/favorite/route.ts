import { z } from "zod";

import { NextResponse } from "next/server";

import { getDatabaseAdmin, getFirestoreAdmin } from "@/config/firebase/server";

import { withAuthRoute } from "@/utils/with-auth-hoc";
import { FIREBASE_REFS } from "@/utils/get-firebase-refs";

const schema = z.object({
  gameId: z.number().positive(),
  isFav: z.boolean(),
});

export const POST = withAuthRoute(async ({ request, user }) => {
  try {
    const body = await request.json();

    const parsedResult = schema.safeParse(body);

    if (!parsedResult.success) {
      return NextResponse.json(
        { message: parsedResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { gameId, isFav } = parsedResult.data;

    const refFavGames = getDatabaseAdmin().ref(
      FIREBASE_REFS.userRatingsAndFavorites(user.uid)
    );

    refFavGames.child(`id_${gameId}`).update({
      isFavorite: isFav,
    });

    const docRef = getFirestoreAdmin()
      .collection(FIREBASE_REFS.communityCollection)
      .doc(FIREBASE_REFS.communityDoc(gameId, user.uid));

    const docExist = await docRef.get();

    if (!docExist.exists) {
      await docRef.set({
        fav: isFav ? 1 : 0,
      });

      return NextResponse.json(
        { message: "Favorite status updated" },
        { status: 201 }
      );
    }

    await docRef.update({
      fav: isFav ? 1 : 0,
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
