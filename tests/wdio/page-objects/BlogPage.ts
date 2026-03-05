import BasePage from './BasePage.js';

class BlogPage extends BasePage {
  get blogPage() { return $('[data-testid="blog-page"]'); }
  get blogPostList() { return $('[data-testid="blog-post-list"]'); }
  get paginationNext() { return $('[data-testid="pagination-next"]'); }
  get paginationPrevious() { return $('[data-testid="pagination-previous"]'); }
  get paginationPageInfo() { return $('[data-testid="pagination-page-info"]'); }

  async getFirstPostLink() {
    return $('[data-testid^="blog-post-link-"]');
  }

  open() {
    return super.open('/blog');
  }
}

export default new BlogPage();
