import { test, expect } from '@playwright/test';
import { BlogPage } from '../pages/BlogPage';

test.describe('Blog', () => {
  test('blog page displays post list', async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.goto();
    await expect(blog.blogPostList).toBeVisible();
    const posts = page.locator('[data-testid^="blog-post-link-"]');
    await expect(posts).not.toHaveCount(0);
  });

  test('blog page shows pagination controls', async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.goto();
    await expect(blog.paginationPageInfo).toBeVisible();
  });

  test('clicking a blog post navigates to the post', async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.goto();
    await blog.getFirstPostLink().click();
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.getByTestId('blog-post-page')).toBeVisible();
  });

  test('blog post page displays title content and date', async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.goto();
    await blog.getFirstPostLink().click();
    await expect(page.getByTestId('post-title')).toBeVisible();
    await expect(page.getByTestId('post-content')).toBeVisible();
    await expect(page.getByTestId('post-date')).toBeVisible();
  });

  test('next page button advances pagination when available', async ({ page }) => {
    const blog = new BlogPage(page);
    await blog.goto();
    const isEnabled = await blog.paginationNext.isEnabled();
    if (isEnabled) {
      await blog.paginationNext.click();
      const pageInfo = await blog.paginationPageInfo.textContent();
      expect(pageInfo).toContain('2');
    } else {
      const pageInfo = await blog.paginationPageInfo.textContent();
      expect(pageInfo).toContain('1');
    }
  });
});
