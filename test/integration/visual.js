const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {startServer} = require('polyserve');
const path = require('path');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const currentDir = `${process.cwd()}/test/integration/screenshots-current`;
const baselineDir = `${process.cwd()}/test/integration/screenshots-baseline`;

describe('👀 page screenshots are correct', function() {
  let polyserve, browser, page;

  before(async function() {
    polyserve = await startServer({port:4444, root:path.join(__dirname, '../..'), moduleResolution:'node'});

    // Create the test directory if needed.
    if (!fs.existsSync(currentDir)){
      fs.mkdirSync(currentDir);
    }
    // And it's subdirectories.
    if (!fs.existsSync(`${currentDir}/wide`)){
      fs.mkdirSync(`${currentDir}/wide`);
    }
    if (!fs.existsSync(`${currentDir}/narrow`)){
      fs.mkdirSync(`${currentDir}/narrow`);
    }
  });

  after((done) => polyserve.close(done));

  beforeEach(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterEach(() => browser.close());

  describe('wide screen', function() {
    beforeEach(async function() {
      return page.setViewport({width: 800, height: 600});
    });

    it('/index.html', async function() {
      return takeAndCompareScreenshot(page, '', 'wide');
    });
    it('/view1', async function() {
      return takeAndCompareScreenshot(page, 'view1', 'wide');
    });
    it('/view2', async function() {
      return takeAndCompareScreenshot(page, 'view2', 'wide');
    });
    it('/view3', async function() {
      return takeAndCompareScreenshot(page, 'view3', 'wide');
    });
    it('/404', async function() {
      return takeAndCompareScreenshot(page, 'batmanNotAView', 'wide');
    });
  });

  describe('narrow screen', function() {
    beforeEach(async function() {
      return page.setViewport({width: 375, height: 667});
    });

    it('/index.html', async function() {
      return takeAndCompareScreenshot(page, '', 'narrow');
    });
    it('/view1', async function() {
      return takeAndCompareScreenshot(page, 'view1', 'narrow');
    });
    it('/view2', async function() {
      return takeAndCompareScreenshot(page, 'view2', 'narrow');
    });
    it('/view3', async function() {
      return takeAndCompareScreenshot(page, 'view3', 'narrow');
    });
    it('/404', async function() {
      return takeAndCompareScreenshot(page, 'batmanNotAView', 'narrow');
    });
  });
});

async function takeAndCompareScreenshot(page, route, filePrefix) {
  // If you didn't specify a file, use the name of the route.
  let fileName = filePrefix + '/' + (route ? route : 'index');

  await page.goto(`http://127.0.0.1:4444/${route}`);
  await page.screenshot({path: `${currentDir}/${fileName}.png`});
  return compareScreenshots(fileName);
}

function compareScreenshots(view) {
  return new Promise((resolve, reject) => {
    const img1 = fs.createReadStream(`${currentDir}/${view}.png`).pipe(new PNG()).on('parsed', doneReading);
    const img2 = fs.createReadStream(`${baselineDir}/${view}.png`).pipe(new PNG()).on('parsed', doneReading);

    let filesRead = 0;
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) return;

      // The files should be the same size.
      expect(img1.width, 'image widths are the same').equal(img2.width);
      expect(img1.height, 'image heights are the same').equal(img2.height);

      // Do the visual diff.
      const diff = new PNG({width: img1.width, height: img1.height});

      // Skip the bottom/rightmost row of pixels, since it seems to be
      // noise on some machines :/
      const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data,
          img1.width-1, img1.height-1, {threshold: 0.2});
      const percentDiff = numDiffPixels/(img2.height*img1.height)*100;

      const stats = fs.statSync(`${currentDir}/${view}.png`);
      const fileSizeInBytes = stats.size;
      console.log(`📸 ${view}.png => ${fileSizeInBytes} bytes, ${percentDiff}% different`);

      //diff.pack().pipe(fs.createWriteStream(`${currentDir}/${view}-diff.png`));
      expect(numDiffPixels, 'number of different pixels').equal(0);
      resolve();
    }
  });
}
