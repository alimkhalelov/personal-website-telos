import { TwitterApi } from 'twitter-api-v2';

export interface SocialPostContent {
  title: string;
  url: string;
  telegramContent?: string;
  twitterContent?: string;
  linkedinContent?: string;
}

export async function publishToSocials(content: SocialPostContent) {
  const results = {
    telegram: { success: false, error: null as string | null },
    twitter: { success: false, error: null as string | null },
    linkedin: { success: false, error: null as string | null },
  };

  // 1. Telegram
  if (content.telegramContent && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      const text = `<b>${content.title}</b>\n\n${content.telegramContent}\n\n<a href="${content.url}">Читать полностью</a>`;
      const tgRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: false,
        }),
      });

      if (!tgRes.ok) throw new Error(await tgRes.text());
      results.telegram.success = true;
      console.log('✅ Telegram: Posted successfully');
    } catch (e: any) {
      console.error('❌ Telegram Error:', e.message);
      results.telegram.error = e.message;
    }
  }

  // 2. Twitter (X)
  if (
    content.twitterContent &&
    process.env.TWITTER_API_KEY &&
    process.env.TWITTER_API_SECRET &&
    process.env.TWITTER_ACCESS_TOKEN &&
    process.env.TWITTER_ACCESS_SECRET
  ) {
    try {
      const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET,
      });

      const tweetText = `${content.twitterContent}\n\n${content.url}`;
      await client.v2.tweet(tweetText);
      results.twitter.success = true;
      console.log('✅ Twitter: Posted successfully');
    } catch (e: any) {
      console.error('❌ Twitter Error:', e.message);
      results.twitter.error = e.message;
    }
  }

  // 3. LinkedIn
  if (content.linkedinContent && process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_PERSON_ID) {
    try {
      const text = `${content.linkedinContent}\n\n${content.url}`;
      const liRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify({
          author: `urn:li:person:${process.env.LINKEDIN_PERSON_ID}`,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: { text },
              shareMediaCategory: 'ARTICLE',
              media: [
                {
                  status: 'READY',
                  description: { text: content.title },
                  originalUrl: content.url,
                  title: { text: content.title },
                },
              ],
            },
          },
          visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
        }),
      });

      if (!liRes.ok) throw new Error(await liRes.text());
      results.linkedin.success = true;
      console.log('✅ LinkedIn: Posted successfully');
    } catch (e: any) {
      console.error('❌ LinkedIn Error:', e.message);
      results.linkedin.error = e.message;
    }
  }

  return results;
}
