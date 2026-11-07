import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import { getAllianceDetail } from "../helpers/ks-api.js";

export const getAllianceInfo = onRequest(async (req, res) => {
  const kingdomId = req.query.kid;
  const allianceTag = req.query.tag;
  logger.info(`Querying info for ${allianceTag} (${kingdomId})`);
  const detail = await getAllianceDetail(kingdomId, allianceTag);
  res.json(detail);
});
