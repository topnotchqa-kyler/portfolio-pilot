import { Given, When, Then } from '@wdio/cucumber-framework';
import BlogPage from '../page-objects/BlogPage.js';

Given('I am on the blog page', async () => {
  await BlogPage.open();
  await BlogPage.blogPage.waitForDisplayed({ timeout: 10000 });
});

Given('there is a next page available', async () => {
  await BlogPage.paginationNext.waitForDisplayed({ timeout: 10000 });
});

When('I click on the first blog post', async () => {
  const firstPost = await BlogPage.getFirstPostLink();
  await firstPost.waitForClickable({ timeout: 10000 });
  await firstPost.click();
});

When('I click the pagination Next button', async () => {
  await BlogPage.paginationNext.waitForClickable({ timeout: 10000 });
  await BlogPage.paginationNext.click();
  await browser.pause(500);
});

Then('the blog post list should be visible', async () => {
  await BlogPage.blogPostList.waitForDisplayed({ timeout: 10000 });
});

Then('at least one blog post should be displayed', async () => {
  const posts = await $$('[data-testid^="blog-post-link-"]');
  expect(posts.length).toBeGreaterThan(0);
});

Then('the pagination page info should be visible', async () => {
  await BlogPage.paginationPageInfo.waitForDisplayed({ timeout: 10000 });
});

Then('I should be on a blog post page', async () => {
  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();
      return url.includes('/blog/') && !url.endsWith('/blog/');
    },
    { timeout: 10000 }
  );
  await $('[data-testid="blog-post-page"]').waitForDisplayed({ timeout: 10000 });
});

Then('the page info should show page 2', async () => {
  await BlogPage.paginationPageInfo.waitForDisplayed({ timeout: 10000 });
  const text = await BlogPage.paginationPageInfo.getText();
  expect(text).toContain('2');
});
