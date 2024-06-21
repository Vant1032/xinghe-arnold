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
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      }
    },
    outline: {
      level: "deep",
    },
    lastUpdated: {
      text: 'Updated at',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: [
      {
        text: '博文',
        items: [
          { text: '如何使用ffmpeg转换图片格式', link: '/2023/如何使用ffmpeg转换图片格式' },
          { text: 'Bat语法快速入门', link: '/2020/Bat语法快速入门' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vant1032/xinghe-arnold' }
    ]
  }
})
