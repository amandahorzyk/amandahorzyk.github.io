# Jekyll + Decap CMS setup for amandahorzyk.github.io

This starter keeps the existing Folio site and moves only the blog to Jekyll-generated Markdown posts.

## Important safety recommendation

Create a Git branch before changing the live site:

```cmd
git checkout -b jekyll-cms
```

You can test the branch before merging it into `main`.

## Stage 1 — Enable Jekyll and Markdown posts

1. Copy all folders and files from this starter into the root of the repository.
2. **Delete the `.nojekyll` file from the repository root.** Its purpose is to bypass Jekyll, so the Markdown posts cannot be generated while it exists.
3. Keep the existing `assets/css/blog-post.css`; the starter does not replace it.
4. The starter includes `assets/css/jekyll-blog.css`, which makes ordinary Markdown blockquotes and lists match the article design.
5. The starter replaces `assets/js/blog-post.js` with a version that creates the left-hand contents panel automatically from Markdown `##` and `###` headings.
6. In the root `index.html`, insert YAML front matter before `<!DOCTYPE html>`:

```yaml
---
---
```

7. Replace the existing Blog section in `index.html` with the contents of:

```text
snippets/homepage-blog-section.html
```

8. The converted first article is:

```text
_posts/2026-07-30-human-dignity-in-the-age-of-artificial-intelligence.md
```

9. Commit the Jekyll stage:

```cmd
git add -A
git commit -m "Convert blog to Jekyll Markdown"
git push -u origin jekyll-cms
```

After verifying the branch, merge it into `main`, or push the same changes to `main`.

## Expected addresses

- All articles: `https://amandahorzyk.github.io/blog/`
- First article: `https://amandahorzyk.github.io/blog/human-dignity-in-the-age-of-artificial-intelligence/`
- CMS: `https://amandahorzyk.github.io/admin/`

## Stage 2 — Enable Decap CMS authentication

Decap CMS cannot safely store a GitHub client secret in the browser. The current configuration uses the GitHub backend, which therefore needs a small OAuth proxy.

1. Deploy a GitHub-compatible Decap OAuth proxy. Decap's official backend documentation points to Cloudflare Worker and other external OAuth-client templates.
2. Create a GitHub OAuth App following the chosen proxy's instructions.
3. The OAuth proxy must provide `/auth` and `/callback`.
4. Open `admin/config.yml`.
5. Replace:

```yaml
base_url: https://REPLACE-WITH-YOUR-OAUTH-PROXY.workers.dev
```

with the real HTTPS base address of your OAuth proxy.
6. Commit and push the configuration.
7. Visit:

```text
https://amandahorzyk.github.io/admin/
```

8. Select **Login with GitHub**.
9. Choose **New Blog post**, write in the Markdown editor, upload the hero image and select **Publish**.

The current configuration uses:

```yaml
publish_mode: simple
```

That commits directly to `main`, so GitHub Pages rebuilds and publishes the article. For a draft/review workflow, change it to:

```yaml
publish_mode: editorial_workflow
```

## Writing in Decap

The CMS form provides:

- title
- publication date
- homepage summary
- opening paragraph
- hero image and image description
- tags
- Markdown article editor

Use **Heading 2** for main article sections and **Heading 3** for subsections. The left-hand contents panel is generated automatically.

Use the quotation button for a pull quote. The Jekyll compatibility stylesheet gives ordinary Markdown quotations the vintage paper design.

## Creating posts manually without Decap

Create a Markdown file in `_posts` named:

```text
YYYY-MM-DD-title-in-lowercase.md
```

Use the converted first post as the template.

## Local Jekyll preview (optional)

Ruby and Bundler are required:

```cmd
bundle install
bundle exec jekyll serve
```

Then open:

```text
http://127.0.0.1:4000
```
