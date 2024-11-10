import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { BLOG_RSS_URL } from '../config/config';
import { BlogPost } from '../constants/blogPost';

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await axios.get(BLOG_RSS_URL!);  // BLOG_RSS_URL이 확실히 정의되었음을 보장
    const rssData = response.data;

    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
    };

    const parser = new XMLParser(options);
    const parsed = parser.parse(rssData);
    const items = parsed.rss.channel.item;

    const posts: BlogPost[] = items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));

    return posts;
  } catch (error) {
    console.error('블로그 포스팅을 가져오는 중 오류 발생:', error);
    return [];
  }
};
