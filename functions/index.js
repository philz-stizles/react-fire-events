const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });

// NOTE: We always have to return from a firebase function
exports.addFollowing = functions.firestore
  .document('followership/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapshot, context) => {
    try {
      const userDoc = await db
        .collection('users')
        .doc(context.params.userUid)
        .get();
      const userData = userDoc.data();
      const batch = db.batch();

      batch.set(
        db
          .collection('followership')
          .doc(context.params.profileId)
          .collection('userFollowers')
          .doc(context.params.userUid),
        {
          uid: userDoc.id,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        },
      );

      batch.update(db.collection('users').doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });

      return await batch.commit();
    } catch (error) {
      return console.error();
    }
  });

exports.removeFollowing = functions.firestore
  .document('followership/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    batch.delete(
      db
        .collection('followership')
        .doc(context.params.profileId)
        .collection('userFollowers')
        .doc(context.params.userUid),
    );

    batch.update(db.collection('users').doc(context.params.profileId), {
      followerCount: admin.firestore.FieldValue.increment(-1),
    });

    try {
      return await batch.commit();
    } catch (error) {
      return console.error();
    }
  });

// exports.removeFollowing = functions.firestore
//   .document('events/{eventId}')
//   .onUpdate(async (snapshot, context) => {
//     const before = snapshot.before.data();
//     const after = snapshot.after.data();

//     const batch = db.batch();
//     batch.delete(
//       db
//         .collection('followership')
//         .doc(context.params.profileId)
//         .collection('userFollowers')
//         .doc(context.params.userUid),
//     );

//     batch.update(db.collection('users').doc(context.params.profileId), {
//       followerCount: admin.firestore.FieldValue.increment(-1),
//     });

//     try {
//       return await batch.commit();
//     } catch (error) {
//       return console.error();
//     }
//   });
