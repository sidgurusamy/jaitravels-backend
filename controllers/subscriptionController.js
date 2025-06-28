const { sendSubscriptionEmail } = require("../utils/emailUtils");

exports.subscribeEmail = async (req, res) => {
  const { email } = req.body;

  const emailRegex = /^[A-Za-z0-9!%._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
const htmlContent = `
<div style="margin:0; padding:0; background-color:#f2f2f2; font-family: 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="background-color:#ffffff; padding:30px;">
              <img src="<img alt="Jai Travels Logo" class="h-12 object-cover" src="https://res.cloudinary.com/dlcdfwygd/image/upload/v1750912787/logowbg_r50syl.png"> alt="Jai Travels Logo" style="max-width:120px; height:auto;">
              <h1 style="margin:20px 0 5px; color:#f87731; font-size:28px;">Welcome Aboard!</h1>
              <p style="margin:0; color:#0f172a; font-size:16px;">Thanks for subscribing to Jai Travels</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h2 style="margin:0 0 15px; color:#222222;">Adventure Awaits ✈️</h2>
              <p style="margin:0; color:#555555; font-size:16px; line-height:1.6;">
                You’re now part of an exclusive group of explorers. We’ll send you personalized travel ideas, limited-time offers, and inspiring stories to fuel your next journey.
              </p>
              <a href="https://jaitravels.ca" target="_blank"
                 style="margin-top:25px; display:inline-block; background-color:#f87731; color:#ffffff; padding:14px 30px; border-radius:30px; font-size:16px; font-weight:600; text-decoration:none;">
                Visit Jai Travels
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td>
              <hr style="border:none; border-top:1px solid #eeeeee; margin:0 40px;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px; font-size:13px; color:#888888; text-align:center;">
              <p style="margin:0;">If you didn’t subscribe, <a href="https://jaitravels.ca/unsubscribe" style="color:#f87731; text-decoration:none;">unsubscribe here</a>.</p>
              <p style="margin-top:5px;">© ${new Date().getFullYear()} Jai Travels. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
`;

    await sendSubscriptionEmail("Thanks for subscribing to Jai Travels!", htmlContent, email);

    res.status(200).json({ message: "Subscription email sent successfully!" });
  } catch (error) {
    console.error("Subscription Email Error:", error);
    res.status(500).json({ message: "Something went wrong. Try again later." });
  }
};
