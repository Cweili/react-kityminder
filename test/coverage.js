import pti from 'puppeteer-to-istanbul'

beforeAll(async () => {
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ])
  await page.goto('http://localhost:5000/example/')
})

afterAll(async () => {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ])
  pti.write(
    [
      ...jsCoverage.filter(({ url }) => /localhost/.test(url)),
      ...cssCoverage.filter(({ url }) => /localhost/.test(url))
    ],
    {
      storagePath: './.nyc_output'
    }
  )
})
