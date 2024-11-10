import * as dotenv from 'dotenv';

dotenv.config();

export const BLOG_RSS_URL = process.env.BLOG_RSS_URL;

if (!BLOG_RSS_URL) {
  console.error('BLOG_RSS_URL 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}