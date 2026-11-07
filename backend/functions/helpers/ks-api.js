import { logger } from "firebase-functions";

const mightpulseApiKey = process.env.MIGHTPULSE_API_KEY;
const mightpulseBaseApi = 'https://api.mightpulse.com/v1';

const mightpulseHeaders = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${mightpulseApiKey}`,
    'Content-Type': 'application/json'
  }
}

const INVALID_ERROR_CODES = ['GIFT_CODE_EXPIRED', 'GIFT_CODE_MAX_USE_REACHED'];

/**
 * Get the currently available gift codes.
 * Gift codes are retrieved from kingshot.net.
 *
 * @returns {Promise<string[]>} Valid gift codes
 */
export async function getGiftCodes() {
  /** @type {GiftCodeResponse} */
  const httpResponse = await fetch('https://kingshot.net/api/gift-codes').then((resp) => resp.json());

  if (httpResponse.status === 'success') {
    return httpResponse.data.giftCodes.map(({ code }) => code);
  } else {
    logger.error('Unable to retrieve gift codes: ', httpResponse.message);
    return [];
  }
}

/**
 * Get the alliance roster for a given alliance tag.
 *
 * @param {number|string} kingdomId - Kingdom ID
 * @param {string} allianceTag - 3 letters alliance tag
 * @returns {Promise<Player[]>} Alliance members
 */
export async function getAllianceMembers(kingdomId, allianceTag) {
  const endpoint = `${mightpulseBaseApi}/alliances/${kingdomId}/${allianceTag}?include=roster`;

  /** @type {AllianceRosterResponse} */
  const apiResponse = await fetch(endpoint, mightpulseHeaders).then((resp) => resp.json());

  if (apiResponse.error) {
    logger.error('Unable to retrieve alliance roster: ', apiResponse.error);
    return [];
  }

  return apiResponse.members
    .map((user) => ({ player: user.nick_name, id: user.governor_id, allianceId: apiResponse.aid, allianceTag }));
}

/**
 * Get the alliance detail for a given alliance tag.
 *
 * @param {number|string} kingdomId - Kingdom ID
 * @param {string} allianceTag - 3 letters alliance tag
 * @returns {Promise<AllianceDetail|ErrorResponse>} Alliance detail
 */
export async function getAllianceDetail(kingdomId, allianceTag) {
  const endpoint = `${mightpulseBaseApi}/alliances/${kingdomId}/${allianceTag}?include=info`;

  /** @type {AllianceInfoResponse} */
  const apiResponse = await fetch(endpoint, mightpulseHeaders).then((resp) => resp.json());

  if (apiResponse.error) {
    logger.error('Unable to retrieve alliance detail: ', apiResponse.error);
    return { error: apiResponse.error };
  }

  return apiResponse.alliance;
}

/**
 * Get the governor detail for a given governor ID.
 *
 * @param {number|string} governorId - Governor ID
 * @returns {Promise<GovernorDetail|ErrorResponse>} Alliance detail
 */
export async function getGovernorDetail(governorId) {
  const endpoint = `${mightpulseBaseApi}/players/${governorId}?include=base`;

  logger.debug('Fetching governor at URL: ', endpoint);

  /** @type {GovernorInfoResponse} */
  const apiResponse = await fetch(endpoint, mightpulseHeaders).then((resp) => resp.json());

  if (apiResponse.error) {
    logger.error('Unable to retrieve governor detail: ', apiResponse.error);
    return { error: apiResponse.error };
  }

  return apiResponse;
}

/**
 * Redeem a gift code for a given player.
 *
 * @param {string} code - Gift code
 * @param {number|string} governorId - Governor ID
 * @returns {Promise<RedeemResult>} Redemption result
 */
export async function redeemGiftCode(code, governorId) {
  const payload = { giftCode: code, playerId: `${governorId}` };

  /** @type {RedeemResult} */
  const result = { success: false, message: '', invalid: false, errorCode: '' };

  try {
    /** @type {RedeemResponse} */
    const redeemResponse = await fetch('https://kingshot.net/api/gift-codes/redeem', {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then((resp) => resp.json());

    result.success = redeemResponse.status === 'success';
    result.invalid = INVALID_ERROR_CODES.includes(redeemResponse.meta?.errorKey);

    if (!result.success) {
      result.errorCode = redeemResponse.meta?.errorKey ?? 'unknown';
      result.message = redeemResponse.message;
    }
  } catch (e) {
    logger.error('Unexpected error while redeeming code', e);
  }

  return result;
}
