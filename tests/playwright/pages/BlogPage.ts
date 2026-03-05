import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BlogPage extends BasePage {
  readonly blogPage;
  readonly blogPostList;
  readonly paginationNext;
  readonly paginationPrevious;
  readonly paginationPageInfo;

  constructor(page: Page) {
    super(page);
    this.blogPage = page.getByTestId('blog-page');
    this.blogPostList = page.getByTestId('blog-post-list');
    this.paginationNext = page.getByTestId('pagination-next');
    this.paginationPrevious = page.getByTestId('pagination-previous');
    this.paginationPageInfo = page.getByTestId('pagination-page-info');
  }

  async goto() {
    await this.navigate('/blog');
    await this.blogPage.waitFor();
  }

  getFirstPostLink() {
    return this.page.locator('[data-testid^="blog-post-link-"]').first();
  }
}
