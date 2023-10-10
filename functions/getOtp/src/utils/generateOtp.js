/**
 * @function
 * @name generateOTP
 * @returns {Number} A six digit random code
 */

export default function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
