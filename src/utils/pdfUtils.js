import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export async function getPdfData(pdfDataUrl) {
  const pdf = await pdfjsLib.getDocument(pdfDataUrl).promise;
  const numPages = pdf.numPages;
  const pdfData = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1 });

    const textItems = textContent.items.map(item => item.str);
    const text = textItems.join(' ');

    console.log(`Page ${i} Text:`, text);

    const annotations = await page.getAnnotations();
    const images = annotations
      .filter(annotation => annotation.subtype === 'Link' && annotation.url)
      .map(annotation => annotation.url);

    console.log(`Page ${i} Images:`, images);

    pdfData.push({ text, images, viewport });
  }

  return pdfData;
}
