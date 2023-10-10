import sendMessage from './utils/sendMessage.js';
export default async ({ req, res, log, error }) => {
  const { phone, message } = JSON.parse(req.body);
  // Check if the phone is provided
  if (!phone) {
    log({ ok: false, message: 'Phone not provided' });
    return res.json({ ok: false, message: 'Phone not provided' }, 400);
  }
  // Check if the message is provided
  if (!message) {
    log({ ok: false, message: 'Message not provided' });
    return res.json({ ok: false, message: 'Message not provided' }, 400);
  }

  try {
    // Send the message
    const response = await sendMessage(phone, message);
    if (response) {
      log({ ok: true, message: 'Message sent successfully' });
      return res.json({
        ok: true,
        message: 'Message sent successfully',
      });
    }
  } catch (err) {
    error(err);
    return res.json(
      {
        ok: false,
        message: 'Failure sending message',
      },
      400
    );
  }
};
