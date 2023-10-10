/**
 * 
 * @param {string} otp A six digit string
 * @returns A message with the six digit string giving instructions to the phone number owner
 */
export default function message(otp) {
  return `Use ${otp} to recover your password.\n Autofore.\n`;
}
