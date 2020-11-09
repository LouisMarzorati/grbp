import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

export const getSubCollections = functions.https.onCall( async (data, context) => {
  // const uid  = context.auth && context.auth.uid;
  const docPath = data.docPath;

  //docPath: collectonId/documentId
  const collections = await admin.firestore().doc(docPath).listCollections();

  const r = await collections[0].listDocuments();
  return { c: r };
});
