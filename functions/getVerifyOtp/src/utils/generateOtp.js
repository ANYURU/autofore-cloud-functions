/**
 * @function
 * @name generateOTP
 * @returns {string} A six digit random code
 */

export default function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
