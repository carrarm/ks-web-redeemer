import { initializeApp } from "firebase-admin/app";
import { loadGiftCodes } from "./functions/gift-codes.function.js";
import { getRoster } from "./functions/alliance-roster.function.js";
import { getAllianceInfo } from "./functions/alliance-info.function.js";
import { getGovernor } from "./functions/governor-info.function.js";
import { redeemForGovernor } from "./functions/redeem.function.js";

initializeApp();

export const giftCodes = loadGiftCodes;
export const allianceRoster = getRoster;
export const allianceInfo = getAllianceInfo;
export const governorInfo = getGovernor;
export const redeemCode = redeemForGovernor;
