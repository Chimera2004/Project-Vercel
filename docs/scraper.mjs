import puppeteer from 'puppeteer';

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: 'new' });
    
    const sites = [
        { url: 'https://www.halodoc.com', file: 'halodoc.png' },
        { url: 'https://www.alodokter.com', file: 'alodokter.png' },
        { url: 'https://www.klikdokter.com', file: 'klikdokter.png' }
    ];

    for (const site of sites) {
        console.log(`Visiting ${site.url}...`);
        try {
            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 800 });
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
            await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.screenshot({ path: site.file, fullPage: false });
            console.log(`Saved screenshot to ${site.file}`);
            await page.close();
        } catch (e) {
            console.error(`Failed to capture ${site.url}:`, e.message);
        }
    }

    await browser.close();
    console.log("Done.");
})();
