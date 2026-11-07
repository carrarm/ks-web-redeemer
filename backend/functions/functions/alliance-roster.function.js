import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import { getAllianceMembers } from "../helpers/ks-api.js";

export const getRoster = onRequest(async (req, res) => {
  const kingdomId = req.query.kid;
  const allianceTag = req.query.tag;
  logger.info(`Querying roster for ${allianceTag} (${kingdomId})`);
  const roster = await getAllianceMembers(kingdomId, allianceTag);
  res.json(roster);
});
