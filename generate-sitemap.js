// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')

const sitemap = new SitemapStream({ hostname: 'https://www.cobblesports.com' })

sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 })
sitemap.write({
   url: 'https://www.cobblesports.com/#/products',
   changefreq: 'weekly',
   priority: 0.9,
})
sitemap.write({
   url: 'https://www.cobblesports.com/#/compare',
   changefreq: 'weekly',
   priority: 0.9,
})

// 더 많은 URL을 여기에 추가

sitemap.end()

streamToPromise(sitemap).then((data) => {
   createWriteStream('./public/sitemap.xml').write(data.toString())
})
