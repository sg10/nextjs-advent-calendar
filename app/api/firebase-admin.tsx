import "server-only";

import { firestore } from "firebase-admin";
import * as admin from "firebase-admin";

export function requireFirebaseAdmin() {
  if (admin.apps.length === 0) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }

  return admin;
}

export function getFirestoreDB() {
  requireFirebaseAdmin();
  return firestore();
}
