import { defineConfig } from 'vitepress'

function env(vercelVal, cloudflareVal, defaultVal) {
  // @ts-ignore
  if (process.env.VERCEL_ENV == 1) {
    return vercelVal;
    // @ts-ignore
  } else if (process.env.CLOUDFLARE_ENV == 1) {
    return cloudflareVal;
  }
  return defaultVal;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "星河arnold",
  titleTemplate: "星河arnold的博客",
  description: "星河arnold的博客，个人网站，",
  base: env('/',  '/','/xinghe-arnold/'),
  sitemap: {
    hostname: env('', '', 'https://vant1032.github.io/xinghe-arnold/'),
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vant1032/xinghe-arnold' }
    ]
  }
})
