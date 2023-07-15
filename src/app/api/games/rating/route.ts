import { NextResponse } from "next/server";

import { z } from "zod";

import { getDatabaseAdmin, getFirestoreAdmin } from "@/config/firebase/server";

import { FIREBASE_REFS } from "@/utils/get-firebase-refs";
import { withAuthRoute } from "@/utils/with-auth-hoc";

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

    const { gameId, rating } = parsedBody.data;

    const ratingsRef = getDatabaseAdmin().ref(
      FIREBASE_REFS.userRatingsAndFavorites(user.uid)
    );

    ratingsRef.child(`id_${gameId}`).update({
      rating: rating,
    });

    const docRef = getFirestoreAdmin()
      .collection(FIREBASE_REFS.communityCollection)
      .doc(FIREBASE_REFS.communityDoc(gameId, user.uid));

    const docExist = await docRef.get();

    if (!docExist.exists) {
      await docRef.set({
        rating: rating,
      });

      return NextResponse.json(
        { message: "Rating updated successfully." },
        { status: 201 }
      );
    }

    await docRef.update({
      rating: rating,
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
