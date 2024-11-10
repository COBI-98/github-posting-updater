// services/BlogService.ts
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { BlogPost } from '../constants/blogPost';
import { config } from '../config/config';

export class FetchBlogPosts {
    static async fetchBlogPosts(): Promise<BlogPost[]> {
        try {
            const response = await axios.get(config.blogRssUrl);
            const rssData = response.data;
            const parser = new XMLParser({ ignoreAttributes: false });
            const parsed = parser.parse(rssData);
            const items = parsed.rss.channel.item;

            return items.map((item: any) => BlogPost.fromRssItem(item));
        } catch (error) {
            console.error('블로그 포스팅을 가져오는 중 오류 발생:', error);
            return [];
        }
    }
}
