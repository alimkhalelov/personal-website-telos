import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { TwitterApi } from "twitter-api-v2";
import fs from "fs";
import path from "path";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

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

async function postToTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return { error: "Отсутствуют ключи TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID" };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "HTML"
      })
    });
    const data = await res.json();
    if (data.ok) {
      const chatUsername = data.result.chat.username;
      if (chatUsername) return { url: `https://t.me/${chatUsername}/${data.result.message_id}` };
      return { url: "Успешно отправлено в Telegram" };
    } else {
      console.error("Telegram error:", data);
      return { error: data.description || "Telegram API Error" };
    }
  } catch (err: any) {
    console.error("Telegram post failed", err);
    return { error: err.message };
  }
}

async function postToTwitter(tweets: string[]) {
  if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
    return { error: "Отсутствуют ключи Twitter API" };
  }
  
  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
  });

  try {
    if (tweets.length === 1) {
      const { data } = await client.v2.tweet(tweets[0]);
      return { url: `https://twitter.com/status/status/${data.id}` };
    } else {
      const data = await client.v2.tweetThread(tweets);
      if (data && data.length > 0) {
        return { url: `https://twitter.com/status/status/${data[0].data.id}` };
      }
      return { url: "Успешно опубликовано (Тред)" };
    }
  } catch (err: any) {
    console.error("Twitter post failed", err);
    // Return the actual API error message if available
    const errorMsg = err.data?.detail || err.message || "Неизвестная ошибка Twitter API";
    return { error: errorMsg };
  }
}

async function postToLinkedIn(title: string, postUrl: string, textToShare: string) {
  if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_PERSON_ID) {
    return { error: "Отсутствуют ключи LinkedIn" };
  }
  
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
      return { error: `Ошибка ${res.status}: ${errorText}` };
    } else {
      const data = await res.json();
      return { url: `https://www.linkedin.com/feed/update/${data.id}` };
    }
  } catch (err: any) {
    console.error("Error posting to LinkedIn:", err);
    return { error: err.message };
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
      
      revalidatePath("/admin");
      revalidatePath("/blog");
      
      const titleMatch = content.match(/title:\s*['"]?([^'"\n]+)['"]?/);
      const title = titleMatch ? titleMatch[1] : "Новый пост";
      const postUrl = `https://alimzhan.com/blog/${slug}`;
      const cleanContent = content.replace(/^---[\s\S]*?---/, '').trim();
      const contentToAnalyze = cleanContent.substring(0, 3000);

      const generateWithFallback = async (prompt: string) => {
        const models = [
          "gemini-3.1-pro-preview",
          "gemini-3.5-flash",
          "gemini-3.1-flash-lite",
          "gemini-3.0-flash"
        ];
        for (const modelName of models) {
          try {
            const { text } = await generateText({ model: google(modelName), prompt });
            return text;
          } catch (err: any) {
            console.warn(`Model ${modelName} failed:`, err.message);
          }
        }
        throw new Error("All AI models failed.");
      };

      let links: Record<string, any> = {};
      
      if (publishToLinkedIn) {
        try {
          const prompt = `Сгенерируй профессиональный пост для LinkedIn на основе следующего текста. Добавь ключевые инсайты (bullet points) и призыв к дискуссии в конце, чтобы собрать комментарии.\n\nОБЯЗАТЕЛЬНО: Генерируй текст строго на ТОМ ЖЕ ЯЗЫКЕ, на котором написана оригинальная статья (если статья на английском, пиши на английском). НЕ пиши никаких вводных фраз вроде "Вот черновик...", выводи ТОЛЬКО сам текст поста.\n\nТекст статьи:\n${contentToAnalyze}`;
          const generatedText = await generateWithFallback(prompt);
          const finalShareText = `${generatedText}\n\nЧитать оригинал: ${postUrl}`;
          links.linkedin = await postToLinkedIn(title, postUrl, finalShareText);
        } catch (e: any) { links.linkedin = { error: "Ошибка генерации ИИ: " + e.message }; }
      }

      if (publishToTelegram) {
        try {
          const prompt = `Сгенерируй авторский пост для Telegram-канала на основе следующего текста. Сделай его емким, абзацы короткими, выдели главное жирным и добавь структуру.\n\nОБЯЗАТЕЛЬНО: Генерируй текст строго на ТОМ ЖЕ ЯЗЫКЕ, на котором написана оригинальная статья. Для форматирования используй ТОЛЬКО базовые HTML теги (<b>, <i>, <a>, <s>, <u>). НЕ используй Markdown (** или *). НЕ пиши вводных фраз.\n\nТекст статьи:\n${contentToAnalyze}`;
          const generatedText = await generateWithFallback(prompt);
          const finalShareText = `🚀 <b>Новая статья: ${title}</b>\n\n${generatedText}\n\nЧитать: <a href="${postUrl}">${postUrl}</a>`;
          links.telegram = await postToTelegram(finalShareText);
        } catch (e: any) { links.telegram = { error: "Ошибка генерации ИИ: " + e.message }; }
      }

      if (publishToTwitter) {
        try {
          const prompt = `Сгенерируй виральный тред для X (Twitter) на основе следующего текста. Используй короткие предложения, мощный хук в первом твите, делай пробелы между строками и минимум эмодзи. Раздели твиты в треде тремя дефисами (---).\n\nОБЯЗАТЕЛЬНО: Генерируй текст строго на ТОМ ЖЕ ЯЗЫКЕ, на котором написана оригинальная статья. НЕ пиши вводных фраз, только сами твиты.\n\nТекст статьи:\n${contentToAnalyze}`;
          const generatedText = await generateWithFallback(prompt);
          let tweets = generatedText.split('---').map(t => t.trim()).filter(t => t.length > 0);
          if (tweets.length > 0) {
            tweets[tweets.length - 1] += `\n\n${postUrl}`;
          } else {
            tweets = [`Новый пост: ${postUrl}`];
          }
          links.twitter = await postToTwitter(tweets);
        } catch (e: any) { links.twitter = { error: "Ошибка генерации ИИ: " + e.message }; }
      }
      
      return NextResponse.json({ success: true, links });

    } else {
      const dir = path.join(process.cwd(), "src/content/posts");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${slug}.mdx`), content, "utf8");
      revalidatePath("/admin");
      revalidatePath("/blog");
      
      const titleMatch = content.match(/title:\s*['"]?([^'"\n]+)['"]?/);
      const title = titleMatch ? titleMatch[1] : "Новый пост";
      const postUrl = `https://alimzhan.com/blog/${slug}`;
      const cleanContent = content.replace(/^---[\s\S]*?---/, '').trim();
      const contentToAnalyze = cleanContent.substring(0, 3000);

      const generateWithFallback = async (prompt: string) => {
        const models = [
          "gemini-3.1-pro-preview",
          "gemini-3.5-flash",
          "gemini-3.1-flash-lite",
          "gemini-3.0-flash"
        ];
        for (const modelName of models) {
          try {
            const { text } = await generateText({ model: google(modelName), prompt });
            return text;
          } catch (err: any) {
            console.warn(`Model ${modelName} failed:`, err.message);
          }
        }
        throw new Error("All AI models failed.");
      };

      let links: Record<string, any> = {};
      
      if (publishToLinkedIn) {
        try {
          const prompt = `Сгенерируй профессиональный пост для LinkedIn на основе следующего текста. Добавь ключевые инсайты (bullet points) и призыв к дискуссии в конце, чтобы собрать комментарии.\n\nОБЯЗАТЕЛЬНО: Генерируй текст строго на ТОМ ЖЕ ЯЗЫКЕ, на котором написана оригинальная статья (если статья на английском, пиши на английском). НЕ пиши никаких вводных фраз вроде "Вот черновик...", выводи ТОЛЬКО сам текст поста.\n\nТекст статьи:\n${contentToAnalyze}`;
          const generatedText = await generateWithFallback(prompt);
          const finalShareText = `${generatedText}\n\nЧитать оригинал: ${postUrl}`;
          links.linkedin = await postToLinkedIn(title, postUrl, finalShareText);
        } catch (e: any) { links.linkedin = { error: "Ошибка генерации ИИ: " + e.message }; }
      }

      if (publishToTelegram) {
        try {
          const prompt = `Сгенерируй авторский пост для Telegram-канала на основе следующего текста. Сделай его емким, абзацы короткими, выдели главное жирным и добавь структуру.\n\nОБЯЗАТЕЛЬНО: Генерируй текст строго на ТОМ ЖЕ ЯЗЫКЕ, на котором написана оригинальная статья. Для форматирования используй ТОЛЬКО базовые HTML теги (<b>, <i>, <a>, <s>, <u>). НЕ используй Markdown (** или *). НЕ пиши вводных фраз.\n\nТекст статьи:\n${contentToAnalyze}`;
          const generatedText = await generateWithFallback(prompt);
          const finalShareText = `🚀 <b>Новая статья: ${title}</b>\n\n${generatedText}\n\nЧитать: <a href="${postUrl}">${postUrl}</a>`;
          links.telegram = await postToTelegram(finalShareText);
        } catch (e: any) { links.telegram = { error: "Ошибка генерации ИИ: " + e.message }; }
      }

      if (publishToTwitter) {
        try {
          const prompt = `Сгенерируй виральный тред для X (Twitter) на основе следующего текста. Используй короткие предложения, мощный хук в первом твите, делай пробелы между строками и минимум эмодзи. Раздели твиты в треде тремя дефисами (---).\n\nОБЯЗАТЕЛЬНО: Генерируй текст строго на ТОМ ЖЕ ЯЗЫКЕ, на котором написана оригинальная статья. НЕ пиши вводных фраз, только сами твиты.\n\nТекст статьи:\n${contentToAnalyze}`;
          const generatedText = await generateWithFallback(prompt);
          let tweets = generatedText.split('---').map(t => t.trim()).filter(t => t.length > 0);
          if (tweets.length > 0) {
            tweets[tweets.length - 1] += `\n\n${postUrl}`;
          } else {
            tweets = [`Новый пост: ${postUrl}`];
          }
          links.twitter = await postToTwitter(tweets);
        } catch (e: any) { links.twitter = { error: "Ошибка генерации ИИ: " + e.message }; }
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
