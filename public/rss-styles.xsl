<?xml version="1.0" encoding="utf-8"?>
<!--
  Styles this site's RSS feed to match liambeckman.com's own look, so
  visitors without a feed reader land on something that reads as part
  of the site rather than a generic XML dump or an unbranded preview
  page. Based on the "pretty-feed" pattern (browsers apply an XSLT
  stylesheet declared via <?xml-stylesheet?> to transform RSS/Atom XML
  into HTML) - see https://github.com/genmon/aboutfeeds.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title><xsl:value-of select="/rss/channel/title" /></title>
        <style type="text/css">
          :root {
            --sans: "Hanken Grotesk", system-ui, -apple-system, sans-serif;
            --mono: "JetBrains Mono", ui-monospace, monospace;
            --bg: #0d0d0f;
            --card: #161619;
            --card-hover: #1b1b1f;
            --line: rgba(255, 255, 255, 0.08);
            --ink: #ececee;
            --mut: #9a9aa2;
            --dim: #6e6e76;
            --accent: #f5a623;
            --accent-text: #f5a623;
            --accent-ink: #1a1206;
            --chip-bg: rgba(255, 255, 255, 0.05);
          }
          @media (prefers-color-scheme: light) {
            :root {
              --bg: #fbfaf6;
              --card: #ffffff;
              --card-hover: #fffcf4;
              --line: rgba(20, 18, 12, 0.1);
              --ink: #1c1a16;
              --mut: #6a655b;
              --dim: #9a9488;
              --accent-text: #ac6b12;
              --chip-bg: rgba(20, 18, 12, 0.04);
            }
          }
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 44px 20px 64px;
            background: var(--bg);
            color: var(--ink);
            font-family: var(--sans);
            font-size: 16px;
            line-height: 1.55;
          }
          .wrap {
            max-width: 760px;
            margin: 0 auto;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: var(--mono);
            font-size: 12.5px;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--accent-text);
            background: var(--chip-bg);
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 5px 12px;
            margin: 0 0 18px;
          }
          h1 {
            font-family: var(--mono);
            font-size: 32px;
            font-weight: 700;
            margin: 0 0 10px;
            color: var(--ink);
          }
          .description {
            color: var(--mut);
            font-size: 15px;
            margin: 0 0 24px;
            max-width: 60ch;
          }
          .notice {
            background: var(--card);
            border: 1px solid var(--line);
            border-radius: 12px;
            padding: 16px 20px;
            margin: 0 0 32px;
            font-size: 14px;
            color: var(--mut);
            line-height: 1.6;
          }
          .notice strong {
            color: var(--ink);
          }
          .notice a {
            color: var(--accent-text);
          }
          .meta-row {
            display: flex;
            align-items: baseline;
            gap: 14px;
            font-family: var(--mono);
            font-size: 13px;
            color: var(--dim);
            margin: 0 0 22px;
            padding-bottom: 22px;
            border-bottom: 1px solid var(--line);
          }
          .meta-row a {
            color: var(--accent-text);
            text-decoration: none;
          }
          .meta-row a:hover {
            text-decoration: underline;
          }
          .meta-row strong {
            color: var(--ink);
          }
          .item {
            display: block;
            padding: 18px 20px;
            margin: 0 0 14px;
            background: var(--card);
            border: 1px solid var(--line);
            border-radius: 12px;
          }
          .item-title {
            margin: 0 0 6px;
            font-family: var(--mono);
            font-size: 17px;
            font-weight: 600;
          }
          .item-title a {
            color: var(--ink);
            text-decoration: none;
          }
          .item-title a:hover {
            color: var(--accent-text);
          }
          .item-date {
            font-family: var(--mono);
            font-size: 12px;
            color: var(--dim);
            margin: 0 0 10px;
          }
          .item-description {
            margin: 0 0 12px;
            color: var(--mut);
            font-size: 14.5px;
            line-height: 1.6;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .tag {
            font-family: var(--mono);
            font-size: 11.5px;
            color: var(--mut);
            background: var(--chip-bg);
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 3px 9px;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="badge">RSS Feed</div>
          <h1><xsl:value-of select="/rss/channel/title" /></h1>
          <p class="description">
            <xsl:value-of select="/rss/channel/description" />
          </p>
          <div class="notice">
            <strong>This is a web feed</strong>, also known as an RSS
            feed. Subscribe by copying the URL from your browser's
            address bar into your feed reader, or visit
            <a href="https://aboutfeeds.com">About Feeds</a>
            to get started.
          </div>
          <div class="meta-row">
            <span>
              <strong><xsl:value-of select="count(/rss/channel/item)" /></strong>
              entries
            </span>
            <a href="{/rss/channel/link}">Visit website &#8594;</a>
          </div>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <p class="item-title">
                <a href="{link}"><xsl:value-of select="title" /></a>
              </p>
              <p class="item-date">
                <xsl:value-of select="pubDate" />
              </p>
              <xsl:if test="description">
                <p class="item-description">
                  <xsl:value-of select="description" />
                </p>
              </xsl:if>
              <xsl:if test="category">
                <div class="tags">
                  <xsl:for-each select="category">
                    <span class="tag">#<xsl:value-of select="." /></span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
