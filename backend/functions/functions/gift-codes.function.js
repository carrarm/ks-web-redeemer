import { onRequest } from "firebase-functions/https";
import * as cheerio from 'cheerio';
import { getGiftCodes } from "../helpers/ks-api.js";

export const loadGiftCodes = onRequest(async (req, res) => {
  let giftCodes = [];
  try {
    giftCodes = await parseGiftCodes();
  } catch (error) {
    console.error('Error parsing gift codes from kingshot.net:', error);
    // Use kingshot API as a fallback even though codes are only ok-ish
    giftCodes = await getGiftCodes();
  }
  res.json({ codes: giftCodes });
});

const KS_URL = 'https://kingshot.net/gift-codes';

export async function parseGiftCodes() {
  const response = await fetch(KS_URL);

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  return $('[aria-labelledby="gift-codes-active"]').find('code').map((_, el) => $(el).text().trim()).get();
}
