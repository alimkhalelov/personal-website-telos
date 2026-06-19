import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { TwitterApi } from "twitter-api-v2";
import fs from "fs";
import path from "path";

const IS_PROD = process.env.NODE_ENV === "production";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "alimzhankhalelov";
const GITHUB_REPO = process.env.GITHUB_REPO || "personal-website-telos";

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_PERSON_ID = process.env.LINKEDIN_PERSON_ID;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;

async function postToTelegram(slug: string, content: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Missing Telegram credentials.");
    return null;
  }
  const titleMatch = content.match(/title:\s*['"]?([^'"\n]+)['"]?/);
  const title = titleMatch ? titleMatch[1] : "Новый пост";
  const postUrl = `https://alimzhan.com/blog/${slug}`;
  const text = `🚀 **Новая статья!**\n\n**${title}**\n\nЧитать: ${postUrl}`;
  
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "Markdown"
      })
    });
    const data = await res.json();
    if (data.ok) {
      const chatUsername = data.result.chat.username;
      if (chatUsername) return `https://t.me/${chatUsername}/${data.result.message_id}`;
      return "Успешно отправлено в Telegram";
    } else {
      console.error("Telegram error:", data);
    }
  } catch (err) {
    console.error("Telegram post failed", err);
  }
  return null;
}

async function postToTwitter(slug: string, content: string) {
  if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
    console.error("Missing Twitter credentials.");
    return null;
  }
  
  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
  });

  const titleMatch = content.match(/title:\s*['"]?([^'"\n]+)['"]?/);
  const title = titleMatch ? titleMatch[1] : "New Post";
  const postUrl = `https://alimzhan.com/blog/${slug}`;
  const text = `I just published a new article: "${title}"\n\nRead it here: ${postUrl}`;

  try {
    const { data } = await client.v2.tweet(text);
    return `https://twitter.com/status/status/${data.id}`;
  } catch (err) {
    console.error("Twitter post failed", err);
  }
  return null;
}

async function postToLinkedIn(slug: string, content: string) {
  if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_PERSON_ID) {
    console.error("Missing LinkedIn credentials in env.");
    return;
  }
  
  const titleMatch = content.match(/title:\s*['"]?([^'"\n]+)['"]?/);
  const title = titleMatch ? titleMatch[1] : "New Post";
  const postUrl = `https://alimzhan.com/blog/${slug}`;

  const textToShare = `I just published a new article: "${title}"\n\nRead it here: ${postUrl}`;
  
  const authorUrn = `urn:li:person:${LINKEDIN_PERSON_ID}`;
  const postData = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: textToShare
        },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            originalUrl: postUrl,
            title: { text: title }
          }
        ]
      }
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  };

  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
      },
      body: JSON.stringify(postData)
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("LinkedIn post failed:", res.status, errorText);
      return null;
    } else {
      console.log("Successfully posted to LinkedIn for slug:", slug);
      const data = await res.json();
      return `https://www.linkedin.com/feed/update/${data.id}`;
    }
  } catch (err) {
    console.error("Error posting to LinkedIn:", err);
    return null;
  }
}


async function getGithubFileSha(filePath: string) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data.sha;
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    if (IS_PROD) {
      if (!GITHUB_TOKEN) return NextResponse.json({ error: "GITHUB_TOKEN not set in Vercel" }, { status: 500 });

      const filePath = `src/content/posts/${slug}.mdx`;
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
      
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!res.ok) {
        return NextResponse.json({ error: "File not found on GitHub" }, { status: 404 });
      }

      const data = await res.json();
      const content = Buffer.from(data.content, 'base64').toString('utf8');
      return NextResponse.json({ content });
    } else {
      const fullPathMDX = path.join(process.cwd(), `src/content/posts/${slug}.mdx`);
      const fullPathMD = path.join(process.cwd(), `src/content/posts/${slug}.md`);

      if (fs.existsSync(fullPathMDX)) {
        const content = fs.readFileSync(fullPathMDX, "utf8");
        return NextResponse.json({ content });
      } else if (fs.existsSync(fullPathMD)) {
        const content = fs.readFileSync(fullPathMD, "utf8");
        return NextResponse.json({ content });
      } else {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, content, publishToLinkedIn, publishToTelegram, publishToTwitter } = await req.json();
    if (!slug || !content) return NextResponse.json({ error: "Missing slug or content" }, { status: 400 });

    if (IS_PROD) {
      if (!GITHUB_TOKEN) return NextResponse.json({ error: "GITHUB_TOKEN not set in Vercel" }, { status: 500 });
      
      const filePath = `src/content/posts/${slug}.mdx`;
      const sha = await getGithubFileSha(filePath);
      
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
      
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: publish post ${slug}`,
          content: Buffer.from(content).toString("base64"),
          ...(sha && { sha }),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return NextResponse.json({ error: "GitHub API error: " + errorText }, { status: res.status });
      }

      revalidatePath("/admin");
      revalidatePath("/blog");
      
      let links: Record<string, string> = {};
      if (publishToLinkedIn) {
        const li = await postToLinkedIn(slug, content);
        if (li) links.linkedin = li;
      }
      if (publishToTelegram) {
        const tg = await postToTelegram(slug, content);
        if (tg) links.telegram = tg;
      }
      if (publishToTwitter) {
        const tw = await postToTwitter(slug, content);
        if (tw) links.twitter = tw;
      }
      
      return NextResponse.json({ success: true, links });

    } else {
      const dir = path.join(process.cwd(), "src/content/posts");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${slug}.mdx`), content, "utf8");
      revalidatePath("/admin");
      revalidatePath("/blog");
      
      let links: Record<string, string> = {};
      if (publishToLinkedIn) {
        const li = await postToLinkedIn(slug, content);
        if (li) links.linkedin = li;
      }
      if (publishToTelegram) {
        const tg = await postToTelegram(slug, content);
        if (tg) links.telegram = tg;
      }
      if (publishToTwitter) {
        const tw = await postToTwitter(slug, content);
        if (tw) links.twitter = tw;
      }
      
      return NextResponse.json({ success: true, links });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    if (IS_PROD) {
      if (!GITHUB_TOKEN) return NextResponse.json({ error: "GITHUB_TOKEN not set in Vercel" }, { status: 500 });

      const filePath = `src/content/posts/${slug}.mdx`;
      const sha = await getGithubFileSha(filePath);
      
      if (!sha) return NextResponse.json({ error: "File not found on GitHub" }, { status: 404 });

      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
      
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: delete post ${slug}`,
          sha,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return NextResponse.json({ error: "GitHub API error: " + errorText }, { status: res.status });
      }

      revalidatePath("/admin");
      revalidatePath("/blog");
      return NextResponse.json({ success: true });

    } else {
      const dir = path.join(process.cwd(), "src/content/posts");
      const fullPathMDX = path.join(dir, `${slug}.mdx`);
      const fullPathMD = path.join(dir, `${slug}.md`);

      if (fs.existsSync(fullPathMDX)) fs.unlinkSync(fullPathMDX);
      if (fs.existsSync(fullPathMD)) fs.unlinkSync(fullPathMD);

      revalidatePath("/admin");
      revalidatePath("/blog");
      return NextResponse.json({ success: true });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
