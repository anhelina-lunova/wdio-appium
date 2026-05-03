# wdio-appium

WebdriverIO + Appium. Homeworks: `test/specs/homeworks/` + `homework-N` scripts in `package.json`.

## Apps

Binaries are **not** in this repo. Download from [wdio-appium-mobile-course-apps](https://github.com/mykhailo-krasnovskyi/wdio-appium-mobile-course-apps).  
**Homework 1:** place **ApiDemos-debug.apk** in `apps/android/` (path matches `appium:app` in `wdio.conf.js`).

## Prerequisites

Node.js, Android SDK / `adb`, emulator or device.  
**Default:** Samsung Galaxy S10 profile, **Android 11** — `wdio.conf.js` (`appium:deviceName`, `appium:platformVersion`). **`start-vd-*` scripts** use AVD `Samsung_Galaxy_S10` in `package.json`. Change both if you use another device.

## Setup

```bash
npm install
npm run started-vds   # device must appear here before tests
```

## Emulator (headed / headless)

| Mode      | Command                     |
| --------- | --------------------------- |
| Headed    | `npm run start-vd-headed`   |
| Headless  | `npm run start-vd-headless` |
| List AVDs | `npm run vd-list`           |

## Typical run (tests + Allure + video)

1. Start emulator (headed or headless) or connect a device with **matching capabilities**.
2. Run tests: `npm run homework-1` or `npm run wdio` (all specs).
3. Report: `npm run allure-report` — opens HTML; each test has an **MP4** attachment.  
   Or: `npx allure serve allure-results`.

**Allure** writes to `allure-results/`. `allure-report` regenerates with `--clean` (overwrites previous generated output).

## Homeworks

More assignments will add the same pattern: spec under `test/specs/homeworks/` + `homework-N` in `package.json`.
