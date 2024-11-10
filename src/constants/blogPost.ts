import * as cheerio from 'cheerio';

export class BlogPost {
    constructor(
        public image: string,
        public title: string,
        public link: string,
        public description: string,
        public pubDate: string
    ) {}

    static fromRssItem(item: any): BlogPost {
        const $ = cheerio.load(item.description || "");
        let imageUrl = $('.thumbnail img').attr('src') || $('img').first().attr('src') || "https://via.placeholder.com/100";
        const textContent = $.text().replace(/\s+/g, ' ').trim();
        const summary = textContent.length > 100 ? textContent.slice(0, 100) + "..." : textContent;
        
        return new BlogPost(
            imageUrl,
            item.title,
            item.link,
            summary,
            item.pubDate
        );
    }
}