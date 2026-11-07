import { getFirestore } from "firebase-admin/firestore";
import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import { redeemGiftCode } from "../helpers/ks-api.js";

const managedAlliances = process.env.MANAGED_ALLIANCES;

// exports.addmessage = onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await getFirestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

export const redeemForGovernor = onRequest(async (req, res) => {
  const governorId = req.query.gid;
  const giftCodes = req.query.codes;
  const allianceId = req.query.aid;
  logger.info(`Redeeming codes ${giftCodes.join('/')} for governor ${governorId} (alliance ${allianceId})`);

  const redemptionResult = await redeemGiftCode(giftCode, governorId);

  // Only the developer's favorites are stored in firestore, peasants remain unknown
  if (managedAlliances.includes(allianceId)) {
    logger.info(`Storing redemption result for governor ${governorId}`);
    await storeInFirestore(redemptionResult);
  }

  res.json(redemptionResult);
});

async function storeInFirestore(governorId) {
  const redeemedCodes = [];

  const playerDoc = await getFirestore().collection('users').doc(`${governorId}}`).get();

  /** @type {FirebaseUserDocument} */
  const lastAttempt = playerDoc.exists ? playerDoc.data() : undefined;

  if (lastAttempt) {
    redeemedCodes.push(...lastAttempt.redeemed);
  }

}