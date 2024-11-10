import * as fs from 'fs';
import * as path from 'path';
import { FetchBlogPosts } from '../services/fetchBlogPosts';
import { BlogPost } from '../constants/blogPost';

export class UpdateReadme {
    static async updateReadme(): Promise<void> {
        try {
            const posts = await FetchBlogPosts.fetchBlogPosts();
            if (posts.length === 0) {
                console.log('업데이트할 블로그 포스팅이 없습니다.');
                return;
            }
            const content = this.generateReadmeContent(posts);
            const readmePath = path.join(__dirname, '..', '..', 'README.md');
            fs.writeFileSync(readmePath, content, 'utf-8');
            console.log('README.md가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('README 업데이트 중 오류 발생:', error);
        }
    }

    private static generateReadmeContent(posts: BlogPost[]): string {
      return `<h1>📖 최신 블로그 포스팅</h1>
      <table>
        ${posts.slice(0, 6).map((post, index) => {
          const truncatedContent = post.description && post.description.length > 25
            ? post.description.slice(0, 25) + "..."
            : "내용 없음";
          const imageUrl = post.image || "https://via.placeholder.com/100"; // 기본 이미지 URL
  
          return `${index % 3 === 0 ? '<tr>' : ''}<td align="center" style="border: 1px solid #ddd; padding: 8px;">
                <img src="${imageUrl}" alt="포스팅 이미지" width="200" height="100"><br>
                <strong><a href="${post.link}">${post.title}</a></strong><br>
                <p style="margin: 0; padding: 0;">${truncatedContent}</p>
                <small style="margin-top: 4px;">${new Date(post.pubDate).toLocaleDateString()}</small>
              </td>${index % 3 === 2 ? '</tr>' : ''}`;
        }).join('')} </table>`;
  }
}