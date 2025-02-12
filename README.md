This Chrome extension replaces your Google Chrome "new tab" page with a list of links you get to customize.

## Install on Google Chrome

1. Open this ["New Tab Page" Chrome extension on the Chrome Web Store](https://chromewebstore.google.com/detail/new-tab-page/apodhjfcbagagmpogjoihddnejghjbaf).
1. Click "Add to Chrome".
1. Open a new tab. Your new tab page will be replaced by this Chrome extension.
1. Chrome might ask "Is this the new tab you were expecting?". Select "Keep changes".
1. On the new tab page, click "Customize this page".

## Install in "developer mode"

To work with the code for this Chrome extension, you need to install this extension in "developer mode":

1. [Download](https://github.com/NimJay/new-tab-page-chrome-extension/archive/refs/heads/main.zip) (and unzip) or clone this repository.
1. Install this Chrome extention:
   1. Visit `chrome://extensions` on Google Chrome.
   1. Turn on "Developer mode" using top-right toggle switch.
   1. Click "Load unpacked" and select the `src/` subfolder within the `new-tab-page-chrome-extension/` folder.
1. Open a new tab. Your new tab page will be replaced by this Chrome extension.
1. Chrome might ask "Is this the new tab you were expecting?". Select "Keep changes".
1. On the new tab page, click "Customize this page".

<img height="500" alt="A screenshot of the new tab page from this Chrome extension." src="https://github.com/NimJay/new-tab-page-chrome-extension/blob/1b27f0d3be2f2c2573fd8a1b369520a7dd5b0e64/new-tab-page-chrome-extension.png">

## Publish on Google Web Store

To publish a new version of this Chrome extension on the Chrome Web Store, follow these steps:

1. Update the `version` in the `manifest.json` file. Commit your change.
1. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/).
1. Zip the `src/` folder and upload it as a new package on the Chrome Web Store. Make sure to include the update to `version`. You will need to wait on a review.
1. Create a [new release on GitHub](https://github.com/NimJay/new-tab-page-chrome-extension/releases).

## Report bugs, feature requests, and questions

[Create a GitHub issue](https://github.com/NimJay/new-tab-page-chrome-extension/issues) if you:
* find a bug,
* have a feature request, or
* have a question
