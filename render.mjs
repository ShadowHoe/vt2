import puppeteer from 'puppeteer';import fs from 'fs';import path from 'path';
const FPS=30,DUR=54.7,W=720,H=1280;fs.mkdirSync('frames',{recursive:true});
const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:W,height:H});
await p.goto('file://'+path.resolve('index.html')+'?render');await p.waitForFunction('window.ready');
fs.writeFileSync('sfx.wav',Buffer.from(await p.evaluate(()=>window.renderSfx()),'base64'));
for(let f=0;f<Math.ceil(DUR*FPS);f++){await p.evaluate(t=>window.setT(t),f/FPS);await p.screenshot({path:`frames/${String(f).padStart(5,'0')}.png`});}
await b.close();
