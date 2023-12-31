import africastalking from 'africastalking';

// Destructuring africa's talking API environment variables.
const {
  APPWRITE_FUNCTION_AFRICASTALKING_USERNAME,
  APPWRITE_FUNCTION_AFRICASTALKING_API_KEY,
} = process.env;
/**
 * @typedef {Object} Africastalking
 * @property {number} status 200 If the message is successfuly sent to the user and the entry is successfully added to the otps table in supabase. And 400 if the message is not not successfully sent to the user.
 * @property {string} error If the message is not successfully sent tot the user.
 * @property {string} msg If the message is successgully sent to the user.
 */

/**
 * @function
 * @name sendMessage
 * @param { string } phone the number of the person intending to a message to.
 * @param { number } msg A message containing the information for the member.
 * @param { string } country_code An optional parameter of the country code of the person signing up that +256 by default
 * @returns { Promise<Africastalking> } A promise that returns a json object.
 */

export default function sendMessage(phone, msg, country_code = '+256') {
  const phone_number = country_code + phone.slice(1);
  const client = africastalking({
    username: APPWRITE_FUNCTION_AFRICASTALKING_USERNAME,
    apiKey: APPWRITE_FUNCTION_AFRICASTALKING_API_KEY,
  });

  return client.SMS.send({
    to: phone_number,
    message: msg,
  });
}
