import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  blogRssUrl: process.env.BLOG_RSS_URL || "",
  defaultImageUrl: "https://via.placeholder.com/100",
};