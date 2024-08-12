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
  cleanUrls: true,
  sitemap: {
    hostname: env('', 'https://xinghe-arnold.pages.dev/', 'https://vant1032.github.io/xinghe-arnold/'),
    transformItems: (items) => {
      for (const item of items) {
        // 后缀有.html页面时，google索引时会报错redirect error，curl -vvvv查看会发现308跳转并且没有内容，所以出错
        item.url = item.url.replace('.html', '')
      }
      return items
    }
  },
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-6NG5XLJBJW' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-6NG5XLJBJW');`
    ],
      [
          'meta',
          {
            name: 'baidu-site-verification', content: 'codeva-o8J8yXZO2f'
          }
      ]
  ],
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      }
    },
    outline: {
      level: [1, 6],
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
          { text: '国内云服务购买汇总', link: '/2024/国内云服务购买汇总' },
          { text: '海外云服务购买汇总', link: '/2024/海外云服务购买汇总' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vant1032/xinghe-arnold' }
    ]
  }
})
