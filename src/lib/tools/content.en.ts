import type { ToolContent } from "./index";

export const contentEn: Record<string, ToolContent> = {
  "resize-image": {
    h1: "Resize Image Online",
    navLabel: "Resize",
    metaTitle: "Resize Image Online – Free Image Resizer (JPG, PNG, WebP)",
    metaDescription:
      "Resize images online for free. Change image dimensions by pixels or percentage while keeping aspect ratio. Supports JPG, PNG and WebP. Fast and private.",
    keywords: ["resize image", "image resizer", "resize photo online", "change image size", "resize jpg", "resize png"],
    intro:
      "Change the dimensions of any JPG, PNG or WebP image in seconds. Resize by exact pixels or by percentage, keep the aspect ratio locked, and preview the result before you download.",
    content: [
      {
        heading: "How to resize an image",
        body: [
          "Resizing an image means changing its width and height in pixels. With ImgWus you can do this directly in your browser — drop a file into the upload box, type the new width or height, and download the result. There is no software to install and no account to create.",
          "- Upload a JPG, PNG or WebP file (up to 20 MB).",
          "- Enter the target width and height in pixels, or switch to percentage mode to scale by a ratio.",
          "- Keep the lock icon enabled to preserve the original aspect ratio so your photo never looks stretched.",
          "- Preview the new dimensions and estimated file size, then click download.",
        ],
      },
      {
        heading: "Resize by pixels or by percentage",
        body: [
          "Pixel mode is ideal when you have an exact size requirement — for example a 1080×1080 square for Instagram, a 1920×1080 banner, or a 600px wide blog image. Percentage mode is perfect when you simply want a photo to be 50% smaller without doing the math yourself.",
          "Because the resizing is performed with a high-quality resampling engine on the server (powered by Sharp), edges stay crisp and text remains readable even after large reductions. Enlarging is also supported, although increasing dimensions beyond the original resolution can introduce softness — that is true of every resizer.",
        ],
      },
      {
        heading: "Why resize images?",
        body: [
          "Large images are the number one cause of slow web pages. A photo straight from a phone camera can be 4000 pixels wide and several megabytes — far larger than any website actually displays. Resizing to the real display size dramatically reduces load time, improves Core Web Vitals, and saves bandwidth for your visitors.",
          "Resizing is also required for many practical tasks: profile pictures with a maximum dimension, marketplace listings, email attachments with size caps, and printing at a specific resolution. ImgWus handles all of these without watermarks or limits.",
        ],
      },
      {
        heading: "Private and secure by design",
        body: [
          "Your images are processed in an isolated request and are never stored. Files are held in memory only for the moment it takes to resize them and are discarded immediately afterwards — nothing is written to disk or shared. We validate the real file signature on upload, enforce a strict size limit, and rate-limit abuse.",
        ],
      },
    ],
    faqs: [
      { q: "Is the image resizer free?", a: "Yes. ImgWus is completely free with no watermarks, no signup, and no usage limits for normal use." },
      { q: "Will resizing reduce the quality of my image?", a: "Making an image smaller keeps it sharp. Enlarging beyond the original resolution can add softness, which is unavoidable with any tool." },
      { q: "How do I keep the aspect ratio?", a: "Leave the lock icon enabled. When you change the width, the height updates automatically (and vice versa) so the photo never looks stretched." },
      { q: "What file formats are supported?", a: "You can resize JPG/JPEG, PNG and WebP images, and export to any of those formats." },
      { q: "Are my uploaded images stored?", a: "No. Files are processed in memory and deleted immediately after the response is sent. Nothing is saved." },
    ],
  },
  "compress-image": {
    h1: "Compress Image Online",
    navLabel: "Compress",
    metaTitle: "Compress Image Online – Reduce JPG, PNG & WebP File Size",
    metaDescription:
      "Compress JPG, PNG and WebP images online to reduce file size while keeping good quality. Use a quality slider or set a target size. Free, fast and private.",
    keywords: ["compress image", "reduce image size", "image compressor", "compress jpg", "compress png", "reduce photo size"],
    intro:
      "Shrink the file size of your images without an obvious drop in quality. Use the quality slider for fine control, or set a target size and let ImgWus find the best quality that fits.",
    content: [
      {
        heading: "How to compress an image",
        body: [
          "Compression reduces the number of bytes an image takes up while keeping it visually close to the original. Upload your photo, choose how aggressive the compression should be, and download a much smaller file.",
          "- Drag a JPG, PNG or WebP into the upload area.",
          "- Drag the quality slider — higher means better quality and a larger file; lower means a smaller file.",
          "- Or switch to target-size mode and type a size such as 200 KB; the app searches for the highest quality that fits.",
          "- Compare the before and after size, then download.",
        ],
      },
      {
        heading: "Quality slider vs target size",
        body: [
          "The quality slider gives you direct, predictable control and is great when you know roughly what trade-off you want. Most photos look excellent at 70–80% quality while being a fraction of their original size.",
          "Target-size mode is the smarter choice when a platform imposes a hard limit — an upload form that rejects files over 1 MB, for instance. ImgWus runs a binary search across quality levels to land just under your target, so you get the best possible image at that size automatically.",
        ],
      },
      {
        heading: "Smart, format-aware compression",
        body: [
          "JPEG and WebP are compressed with perceptual encoders that remove detail the human eye barely notices. PNG images are optimized with maximum lossless compression and optional palette quantization, which is ideal for logos, icons and screenshots with flat colors.",
          "For photographs, converting to WebP during compression typically saves another 25–35% over JPEG at the same visual quality — a single setting away in the format selector.",
        ],
      },
      {
        heading: "Faster sites, smaller bills",
        body: [
          "Compressed images load faster, rank better, and cost less to serve. If you run a store, a blog, or a portfolio, compressing every image before publishing is one of the highest-impact performance wins available — and it takes seconds here.",
        ],
      },
    ],
    faqs: [
      { q: "How much smaller will my image get?", a: "It depends on the content, but photos commonly shrink by 60–80% with little visible difference, especially when exported as WebP." },
      { q: "What is target-size mode?", a: "Instead of picking a quality value, you enter a desired file size (e.g. 100 KB) and the tool finds the highest quality that stays under it." },
      { q: "Does compression lose quality?", a: "Lossy compression discards some detail, but at sensible levels the difference is hard to see. PNG compression here is lossless unless palette mode is used." },
      { q: "Can I compress PNG files?", a: "Yes. PNGs are optimized losslessly, and palette quantization is applied at lower quality settings for big savings on flat-color graphics." },
      { q: "Is there a file size limit?", a: "Each upload can be up to 20 MB. For many files at once, use the bulk tool." },
    ],
  },
  "resize-image-to-100kb": {
    h1: "Resize Image to 100KB",
    navLabel: "Resize to 100KB",
    metaTitle: "Resize Image to 100KB Online – Compress Photo Under 100 KB",
    metaDescription:
      "Reduce any photo to under 100 KB online for free. Perfect for exam forms, job applications and uploads with a 100 KB limit. Keeps the best possible quality.",
    keywords: ["resize image to 100kb", "compress image to 100kb", "photo under 100kb", "reduce image to 100kb", "100kb image"],
    intro:
      "Need a photo under 100 KB for an online form, exam registration or job application? Upload your image and ImgWus automatically finds the highest quality that stays below 100 KB.",
    content: [
      {
        heading: "Get your image under 100 KB instantly",
        body: [
          "Many government portals, university exam forms and job application sites refuse photos larger than 100 KB. Doing this by hand is frustrating — you guess a quality value, export, check the size, and repeat. ImgWus removes the guesswork.",
          "- Upload your JPG, PNG or WebP photo.",
          "- The target is pre-set to 100 KB.",
          "- The app binary-searches quality to land just under the limit while keeping the image as sharp as possible.",
          "- Download a file that is guaranteed to be under 100 KB.",
        ],
      },
      {
        heading: "Why a 100 KB limit is so common",
        body: [
          "A 100 KB cap keeps server storage manageable when millions of applicants upload documents. The limit usually applies to passport-style photos and signatures, where a small file is perfectly adequate. The trick is hitting that size without making the photo unreadable — which is exactly what target-size compression is built for.",
          "If your photo is still slightly soft at 100 KB, try resizing the dimensions down first (for example to 600×800) and then compressing; smaller dimensions reach the target at a much higher quality.",
        ],
      },
      {
        heading: "Works for any size target",
        body: [
          "Although this page is tuned to 100 KB, you can change the target to 50 KB, 200 KB, 1 MB or any value your form requires. The same intelligent search applies, so you always get the best image that fits.",
        ],
      },
    ],
    faqs: [
      { q: "Will the photo always be under 100 KB?", a: "Yes. The tool searches downward until the output is below your target, so the downloaded file is guaranteed to fit." },
      { q: "My photo looks soft at 100 KB. What can I do?", a: "Reduce the pixel dimensions first (e.g. to 600×800), then compress. Fewer pixels means the 100 KB budget stretches further." },
      { q: "Can I target a different size?", a: "Absolutely. Change the target field to 50 KB, 200 KB or anything else and the tool adapts automatically." },
      { q: "Is this suitable for exam and job forms?", a: "Yes, it is designed exactly for passport-photo and document uploads that enforce a strict size cap." },
    ],
  },
  "passport-photo-resizer": {
    h1: "Passport Photo Resizer",
    navLabel: "Passport Photo",
    metaTitle: "Passport Photo Resizer Online – Resize Photo to Passport Size",
    metaDescription:
      "Resize your photo to passport size (35×45 mm / 413×531 px) online for free. Get a print-ready passport, visa or ID photo in seconds. No signup, no watermark.",
    keywords: ["passport photo resizer", "passport size photo", "passport photo online", "visa photo resizer", "id photo size", "35x45 photo"],
    intro:
      "Turn any portrait into a standard passport-size photo (35×45 mm at 300 DPI = 413×531 pixels). Resize, then download a print-ready image suitable for passport, visa and ID applications.",
    content: [
      {
        heading: "Standard passport photo dimensions",
        body: [
          "The most widely accepted passport photo size is 35×45 mm. At the 300 DPI required for printing, that equals 413×531 pixels — the dimensions this tool is pre-configured to produce.",
          "- Upload a clear, front-facing portrait with a plain background.",
          "- The size is pre-set to 413×531 px (35×45 mm).",
          "- Preview the framing, adjust if needed, and download.",
          "- Print at 300 DPI, or upload directly to an online application that asks for these dimensions.",
        ],
      },
      {
        heading: "Tips for an accepted photo",
        body: [
          "- Use even, natural lighting and a plain white or light-grey background.",
          "- Face the camera directly with a neutral expression and open eyes.",
          "- Make sure your head and the top of your shoulders are visible and centered.",
          "- Avoid shadows, glare on glasses, and head coverings unless worn for religious reasons.",
          "Different countries occasionally require slightly different sizes (for example 2×2 inches / 600×600 px for US visas). You can change the width and height fields to match any specification.",
        ],
      },
      {
        heading: "Print-ready output",
        body: [
          "After resizing, the photo is exported at high quality so it stays crisp when printed at standard passport dimensions. Combine it with the compress tool if an online portal also enforces a file-size limit such as 100 KB.",
        ],
      },
    ],
    faqs: [
      { q: "What is the standard passport photo size in pixels?", a: "35×45 mm at 300 DPI is 413×531 pixels, which is the default in this tool. US visa photos are usually 2×2 inches (600×600 px)." },
      { q: "Can I use this for visa or ID photos?", a: "Yes. Adjust the width and height to your country's requirement and download a correctly sized image." },
      { q: "How do I also get it under 100 KB?", a: "Use the resize-to-100KB tool after resizing, or compress the downloaded file to meet a portal's size limit." },
      { q: "Does it remove the background?", a: "No, this tool resizes and frames your photo. Use a plain background when taking the picture for best results." },
    ],
  },
  "pas-foto-cpns": {
    h1: "CPNS ID Photo (3×4, Red/Blue Background)",
    navLabel: "CPNS Photo",
    metaTitle: "CPNS ID Photo Online – 3×4 Size, Red/Blue Background + Suit",
    metaDescription:
      "Create a CPNS / ID photo online for free: resize to 3×4, automatically remove and replace the background with red or blue, and add a suit or shirt. Processed on your device — no upload.",
    keywords: ["cpns photo", "id photo 3x4", "change photo background", "red background id photo", "passport photo suit"],
    intro:
      "Prepare an ID photo for civil-service (CPNS) registration in one tool: resize to 3×4, auto-replace the background with red or blue, and add a suit or shirt. Everything runs on your device — your photo is never uploaded.",
    content: [
      {
        heading: "How to make the photo",
        body: [
          "Government job (CPNS) registration requires an ID photo with a specific background colour (usually red) and size. This tool combines all the steps.",
          "- Upload your photo (front-facing, even lighting works best).",
          "- The background is removed automatically — then pick a new colour: red or blue.",
          "- Choose 3×4 (or 4×6), and adjust zoom and face position.",
          "- Optional: add a suit or shirt and align its size and position.",
          "- Download, and enable the ≤ 200 KB option if the form limits file size.",
        ],
      },
      {
        heading: "Red or blue background",
        body: [
          "The required background colour is often dictated by the agency. This tool removes the original background with an AI model that runs in your browser, then replaces it with a clean solid red or blue — no photo studio needed.",
          "Because processing happens on-device, your photo stays private and is never sent to a server.",
        ],
      },
      {
        heading: "Add a suit or shirt",
        body: [
          "Not dressed formally? Add a suit or shirt overlay and drag its size and position to fit your shoulders. This is a template (not generative AI), so it is instant and free.",
        ],
      },
      {
        heading: "Print-ready, upload-ready",
        body: [
          "3×4 cm equals 354×472 px at 300 DPI — sharp enough to print or upload. If the portal caps file size (e.g. 200 KB), enable the compress option so the result fits automatically.",
        ],
      },
    ],
    faqs: [
      { q: "Is the background removed automatically?", a: "Yes, by an AI model running in your browser, then replaced with red or blue. The photo is not uploaded." },
      { q: "What is 3×4 in pixels?", a: "3×4 cm at 300 DPI is 354×472 pixels. A 4×6 preset (472×709 px) is also available." },
      { q: "Does the suit use AI?", a: "The suit/shirt is an adjustable template overlay — not generative AI — so it is free, fast and on-device." },
      { q: "How do I keep it under 200 KB?", a: "Enable the compress option on download; the result is kept under 200 KB automatically." },
    ],
  },
  "jpg-to-png": {
    h1: "Convert JPG to PNG",
    navLabel: "JPG to PNG",
    metaTitle: "JPG to PNG Converter Online – Convert JPEG to PNG Free",
    metaDescription:
      "Convert JPG/JPEG images to PNG online for free. Get lossless PNG output with support for transparency-ready editing. Fast, secure and no watermark.",
    keywords: ["jpg to png", "jpeg to png", "convert jpg to png", "jpg to png converter", "image to png"],
    intro:
      "Convert JPG and JPEG images to high-quality PNG. PNG is lossless and edit-friendly, making it ideal when you need a clean source file for further design work.",
    content: [
      {
        heading: "How to convert JPG to PNG",
        body: [
          "Upload your JPG file and ImgWus re-encodes it as a PNG using lossless compression, then hands you the download. The whole process happens server-side in a single request with nothing stored afterwards.",
          "- Drop a JPG or JPEG image into the upload box.",
          "- The output format is locked to PNG.",
          "- Download your converted PNG immediately.",
        ],
      },
      {
        heading: "Why convert to PNG?",
        body: [
          "PNG is a lossless format, so it never adds the blocky compression artifacts that repeated JPEG saving causes. It is the right choice when you plan to keep editing an image, when you need crisp text and sharp edges, or when a tool or platform specifically requires PNG.",
          "Keep in mind that a JPG converted to PNG will usually be larger on disk, because PNG does not throw away detail the way JPEG does. The original JPG cannot magically gain transparency either — but once it is a PNG you can add a transparent background in an editor.",
        ],
      },
      {
        heading: "Lossless and accurate",
        body: [
          "The conversion preserves the exact pixels of your JPG and rotates it correctly based on EXIF orientation, so what you see is what you get. Colors are kept faithful and no quality is lost in the PNG encoding step.",
        ],
      },
    ],
    faqs: [
      { q: "Is JPG to PNG conversion lossless?", a: "The PNG encoding itself is lossless. Any compression artifacts already baked into the source JPG remain, but nothing new is lost." },
      { q: "Will the PNG be bigger than the JPG?", a: "Usually yes, because PNG keeps all detail while JPG discards some. That is the trade-off for lossless, edit-friendly output." },
      { q: "Does the PNG have a transparent background?", a: "No. Converting does not add transparency, but a PNG lets you erase the background in an image editor afterwards." },
      { q: "Is there a limit on file size?", a: "Single files can be up to 20 MB. Use the bulk tool to convert many images at once." },
    ],
  },
  "png-to-jpg": {
    h1: "Convert PNG to JPG",
    navLabel: "PNG to JPG",
    metaTitle: "PNG to JPG Converter Online – Convert PNG to JPEG Free",
    metaDescription:
      "Convert PNG images to JPG/JPEG online for free. Reduce file size dramatically with adjustable quality. White background applied to transparency. No watermark.",
    keywords: ["png to jpg", "png to jpeg", "convert png to jpg", "png to jpg converter"],
    intro:
      "Convert PNG images to compact JPG files. JPG is perfect for photos and sharing because it produces much smaller files than PNG at excellent visual quality.",
    content: [
      {
        heading: "How to convert PNG to JPG",
        body: [
          "Upload a PNG and download a JPG in seconds. Any transparent areas are flattened onto a white background, since JPG does not support transparency.",
          "- Upload your PNG file.",
          "- Output is set to JPG; choose a quality level if you want.",
          "- Download the smaller JPG file.",
        ],
      },
      {
        heading: "Why convert PNG to JPG?",
        body: [
          "PNG files — especially screenshots and exported graphics — can be surprisingly large. For photographs and anything you want to email, upload or post, JPG is dramatically smaller while looking virtually identical. Converting a heavy PNG to JPG often cuts the file size by 80% or more.",
          "Because JPG is universally supported, it is also the safest format for compatibility across old devices, forms and printers.",
        ],
      },
      {
        heading: "Quality you control",
        body: [
          "You decide the quality level of the JPG. Around 80% is the sweet spot for most images, balancing tiny file size against quality you can barely tell apart from the original.",
        ],
      },
    ],
    faqs: [
      { q: "What happens to transparent areas?", a: "JPG has no transparency, so transparent pixels are placed on a white background during conversion." },
      { q: "How much smaller will the JPG be?", a: "Often 70–90% smaller than the PNG, particularly for photographic content." },
      { q: "Can I set the JPG quality?", a: "Yes. Use the quality control to trade off between file size and visual fidelity." },
      { q: "Is it free and watermark-free?", a: "Completely free with no watermark and no signup." },
    ],
  },
  "png-to-webp": {
    h1: "Convert PNG to WebP",
    navLabel: "PNG to WebP",
    metaTitle: "PNG to WebP Converter Online – Convert PNG to WebP Free",
    metaDescription:
      "Convert PNG to WebP online for free. WebP delivers far smaller files than PNG with the same quality — perfect for fast, modern websites. Secure and watermark-free.",
    keywords: ["png to webp", "convert png to webp", "png to webp converter", "webp converter"],
    intro:
      "Convert PNG images to modern WebP. WebP gives you the same visual quality at a much smaller size, which is ideal for speeding up websites and improving Core Web Vitals.",
    content: [
      {
        heading: "How to convert PNG to WebP",
        body: [
          "Upload a PNG and get a WebP download in seconds. WebP supports both lossy and lossless modes and keeps transparency, so it is a true drop-in replacement for PNG on the web.",
          "- Upload your PNG image.",
          "- The output is set to WebP; pick a quality level if desired.",
          "- Download a much lighter WebP file.",
        ],
      },
      {
        heading: "Why WebP?",
        body: [
          "WebP was designed by Google specifically for the web. Compared with PNG it routinely produces files 25–80% smaller at equivalent quality, while still supporting transparency. Smaller images mean faster pages, better search rankings, and lower bandwidth costs.",
          "Every modern browser supports WebP, so there is rarely a reason not to use it for site graphics, hero images and product photos.",
        ],
      },
      {
        heading: "Transparency preserved",
        body: [
          "Unlike converting to JPG, moving from PNG to WebP keeps your alpha transparency intact. Logos and icons stay clean against any background while becoming a fraction of their original size.",
        ],
      },
    ],
    faqs: [
      { q: "Does WebP keep transparency?", a: "Yes. WebP supports an alpha channel, so transparent PNGs convert without a background being added." },
      { q: "How much smaller is WebP than PNG?", a: "Typically 25–80% smaller at the same visual quality, depending on the image." },
      { q: "Do all browsers support WebP?", a: "Yes, every current major browser supports WebP, making it safe for production websites." },
      { q: "Is the conversion free?", a: "Yes, free with no watermark and no account required." },
    ],
  },
  "jpg-to-webp": {
    h1: "Convert JPG to WebP",
    navLabel: "JPG to WebP",
    metaTitle: "JPG to WebP Converter Online – Convert JPEG to WebP Free",
    metaDescription:
      "Convert JPG/JPEG to WebP online for free. Make photos up to 35% smaller than JPG at the same quality for faster websites. No signup, no watermark.",
    keywords: ["jpg to webp", "jpeg to webp", "convert jpg to webp", "jpg to webp converter"],
    intro:
      "Convert JPG photos to WebP to shave another 25–35% off the file size at the same quality. The fastest way to make image-heavy pages load quicker.",
    content: [
      {
        heading: "How to convert JPG to WebP",
        body: [
          "Upload a JPG and download a WebP that looks the same but weighs less. Ideal for blogs, shops and portfolios where every kilobyte counts.",
          "- Upload your JPG or JPEG file.",
          "- Output is set to WebP; adjust quality if you like.",
          "- Download the smaller WebP image.",
        ],
      },
      {
        heading: "Better compression than JPEG",
        body: [
          "WebP's modern compression typically beats JPEG by 25–35% at the same perceived quality. For a page full of product photos, that adds up to a noticeably faster experience and a better PageSpeed score.",
          "Since WebP is universally supported in browsers today, converting your JPGs is one of the simplest performance upgrades you can make.",
        ],
      },
    ],
    faqs: [
      { q: "Is WebP better than JPG?", a: "For the web, usually yes — WebP achieves the same quality at a smaller size and is supported everywhere." },
      { q: "Will I lose quality converting JPG to WebP?", a: "At sensible quality settings the difference is imperceptible, and the file is smaller." },
      { q: "Can I batch convert?", a: "Yes, use the bulk tool to convert many JPGs to WebP and download them as a ZIP." },
    ],
  },
  "webp-to-jpg": {
    h1: "Convert WebP to JPG",
    navLabel: "WebP to JPG",
    metaTitle: "WebP to JPG Converter Online – Convert WebP to JPEG Free",
    metaDescription:
      "Convert WebP images to JPG/JPEG online for free. Get a universally compatible photo you can open and share anywhere. Fast, secure and watermark-free.",
    keywords: ["webp to jpg", "webp to jpeg", "convert webp to jpg", "webp to jpg converter"],
    intro:
      "Downloaded a WebP and need a regular JPG? Convert WebP to JPG instantly for maximum compatibility with apps, editors and devices that don't accept WebP.",
    content: [
      {
        heading: "How to convert WebP to JPG",
        body: [
          "Upload your WebP file and download a JPG ready to use anywhere. Transparent areas are flattened onto white, since JPG has no alpha channel.",
          "- Upload the WebP image.",
          "- Output is set to JPG; choose a quality if needed.",
          "- Download the compatible JPG.",
        ],
      },
      {
        heading: "Why convert WebP to JPG?",
        body: [
          "While WebP is great for the web, some older programs, printers and upload forms still expect JPG. Converting gives you a file that opens everywhere without fuss, at a quality level you control.",
        ],
      },
    ],
    faqs: [
      { q: "Why won't my WebP open in some apps?", a: "Older software may not support WebP yet. Converting to JPG solves compatibility issues instantly." },
      { q: "What happens to transparency?", a: "JPG does not support transparency, so transparent regions are filled with white." },
      { q: "Is it free?", a: "Yes, free with no watermark or signup." },
    ],
  },
  "webp-to-png": {
    h1: "Convert WebP to PNG",
    navLabel: "WebP to PNG",
    metaTitle: "WebP to PNG Converter Online – Convert WebP to PNG Free",
    metaDescription:
      "Convert WebP to PNG online for free with lossless quality and preserved transparency. Perfect for editing and maximum compatibility. No watermark.",
    keywords: ["webp to png", "convert webp to png", "webp to png converter"],
    intro:
      "Convert WebP images to lossless PNG while keeping transparency. Ideal when you need an edit-friendly, widely compatible file.",
    content: [
      {
        heading: "How to convert WebP to PNG",
        body: [
          "Upload a WebP and download a PNG that preserves every pixel and any transparency. Great for design work and tools that require PNG input.",
          "- Upload your WebP image.",
          "- Output is set to PNG.",
          "- Download the lossless PNG.",
        ],
      },
      {
        heading: "Lossless and transparent",
        body: [
          "PNG keeps an exact, lossless copy of your image and supports an alpha channel, so transparent WebP graphics stay transparent. This makes PNG the safe choice for logos and icons you intend to keep editing.",
        ],
      },
    ],
    faqs: [
      { q: "Does the PNG keep transparency?", a: "Yes. Transparency from the WebP is preserved in the PNG output." },
      { q: "Is the conversion lossless?", a: "The PNG encoding is lossless, capturing the WebP's decoded pixels exactly." },
      { q: "Will the PNG be larger?", a: "Often yes, because PNG is lossless. That is the trade-off for maximum quality and compatibility." },
    ],
  },
  "convert-image": {
    h1: "Convert Image Online",
    navLabel: "Convert",
    metaTitle: "Convert Image Online – Free JPG, PNG & WebP Converter",
    metaDescription:
      "Free online image converter. Convert between JPG, PNG and WebP in any direction with quality control. Fast, private and watermark-free.",
    keywords: ["convert image", "image converter", "image format converter", "jpg png webp converter"],
    intro:
      "Convert images between JPG, PNG and WebP in any direction. Pick your input, choose the output format, set the quality, and download — all in your browser.",
    content: [
      {
        heading: "One converter, every direction",
        body: [
          "ImgWus converts between the three formats that matter for the modern web. Whether you need a smaller WebP for performance, a lossless PNG for editing, or a universally compatible JPG for sharing, it is a single dropdown away.",
          "- Upload any JPG, PNG or WebP.",
          "- Choose the output format and quality.",
          "- Download instantly — no account, no watermark.",
        ],
      },
      {
        heading: "Choosing the right format",
        body: [
          "- JPG: best for photographs and sharing; smallest files at good quality, but no transparency.",
          "- PNG: lossless and supports transparency; best for graphics, logos and editing.",
          "- WebP: modern web format; smaller than both JPG and PNG at the same quality, with transparency support.",
        ],
      },
    ],
    faqs: [
      { q: "Which formats can I convert between?", a: "Any direction among JPG, PNG and WebP." },
      { q: "Can I control the quality?", a: "Yes, a quality slider is available for lossy outputs (JPG and WebP)." },
      { q: "Are my files kept private?", a: "Yes. Conversions run in memory and files are discarded immediately afterwards." },
    ],
  },
  "crop-image": {
    h1: "Crop Image Online",
    navLabel: "Crop",
    metaTitle: "Crop Image Online – Free Photo Cropper (1:1, 4:3, 16:9)",
    metaDescription:
      "Crop images online for free. Drag to select an area or use fixed ratios like 1:1, 4:3 and 16:9. Perfect for thumbnails, avatars and social posts. No watermark.",
    keywords: ["crop image", "image cropper", "crop photo online", "crop picture", "square crop", "16:9 crop"],
    intro:
      "Trim and reframe your photos by dragging a crop area, or lock to a fixed ratio such as 1:1, 4:3 or 16:9. Preview the selection and download the cropped result.",
    content: [
      {
        heading: "How to crop an image",
        body: [
          "Cropping removes the parts of a photo you don't want and changes its framing or aspect ratio. With ImgWus you simply drag a box over the area to keep.",
          "- Upload a JPG, PNG or WebP image.",
          "- Drag the corners of the crop box, or pick a ratio (free, 1:1, 4:3, 16:9).",
          "- Preview the selection and download the cropped image.",
        ],
      },
      {
        heading: "Fixed ratios for every platform",
        body: [
          "- 1:1 square — profile pictures, avatars and Instagram posts.",
          "- 4:3 — classic photo prints and presentations.",
          "- 16:9 — YouTube thumbnails, banners and widescreen displays.",
          "Locking a ratio guarantees your crop fits the destination perfectly without trial and error.",
        ],
      },
      {
        heading: "Pixel-accurate cropping",
        body: [
          "The crop is applied on the server at full resolution, so you keep every bit of detail inside the selected area. There is no upscaling and no quality loss from the crop itself.",
        ],
      },
    ],
    faqs: [
      { q: "Can I crop to a square?", a: "Yes. Select the 1:1 ratio and the crop box stays perfectly square as you drag." },
      { q: "Does cropping reduce quality?", a: "No. Cropping keeps the original pixels inside your selection at full resolution." },
      { q: "What ratios are available?", a: "Free-form plus fixed 1:1, 4:3 and 16:9. You can reposition and resize the selection freely." },
      { q: "Is it free?", a: "Yes, completely free with no watermark." },
    ],
  },
  "bulk-image-resizer": {
    h1: "Bulk Image Resizer & Compressor",
    navLabel: "Bulk",
    metaTitle: "Bulk Image Resizer Online – Resize & Compress Many Images at Once",
    metaDescription:
      "Resize, compress and convert many images at once online. Upload up to 30 files, process them together, and download everything as a ZIP. Free and private.",
    keywords: ["bulk image resizer", "batch resize images", "resize multiple images", "bulk compress images", "batch image converter"],
    intro:
      "Process many images in one go. Upload a batch, apply the same resize, compression or conversion to all of them, and download the whole set as a single ZIP file.",
    content: [
      {
        heading: "How bulk processing works",
        body: [
          "Editing images one by one is slow. The bulk tool applies the same operation to every file you upload and packages the results together.",
          "- Drop up to 30 JPG, PNG or WebP files at once.",
          "- Choose an operation: resize by percentage/dimensions, compress, or convert format.",
          "- Process them all together and download a single ZIP archive.",
        ],
      },
      {
        heading: "Perfect for stores and galleries",
        body: [
          "If you manage a shop, a real-estate listing or a photo gallery, you often have dozens of images that all need the same treatment. Bulk processing turns a tedious afternoon into a few clicks, and every output stays consistent in size and quality.",
        ],
      },
      {
        heading: "Heavy jobs, handled responsibly",
        body: [
          "Large batches are processed efficiently on the server and streamed back as a ZIP. When a Redis queue is configured, very large jobs can be offloaded to a background worker so the interface stays responsive. Uploaded files are never stored — they are discarded as soon as the ZIP is built.",
        ],
      },
    ],
    faqs: [
      { q: "How many images can I process at once?", a: "Up to 30 files per batch, each up to 20 MB." },
      { q: "How do I get my files back?", a: "All processed images are bundled into a single ZIP you download with one click." },
      { q: "Can I mix operations?", a: "Each batch applies one operation to every file. Run multiple batches for different operations." },
      { q: "Are the files stored anywhere?", a: "No. Everything is processed in memory and discarded once the ZIP is delivered." },
    ],
  },
};
