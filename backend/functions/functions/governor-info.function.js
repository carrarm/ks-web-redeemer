import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import { getGovernorDetail } from "../helpers/ks-api.js";

export const getGovernor = onRequest(async (req, res) => {
  const governorId = req.query.gid;
  logger.info(`Querying detail for governor ${governorId}`);
  const governorDetail = await getGovernorDetail(governorId);
  res.json(governorDetail.error ? governorDetail : {
    id: governorId,
    name: governorDetail.nick_name,
    kingdomId: governorDetail.kid,
    allianceId: governorDetail.alliance.aid,
    allianceTag: governorDetail.alliance.tag
  });
});
