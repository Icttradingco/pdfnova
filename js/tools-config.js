/* ============================================================
   PDFNova — Tool catalogue (single source of truth)
   All features from iLovePDF & Smallpdf combined.
   Used by landing grid, header dropdown, tool page and SEO.
   ============================================================ */

const PDF_TOOLS = [
  // =================== ORGANIZE ===================
  {
    id: 'merge',
    name: 'Merge PDF',
    short: 'Combine multiple PDFs into one document in the order you choose.',
    desc: 'Combine several PDF files into a single document. Reorder the files before merging — everything happens 100% privately in your browser.',
    icon: 'fa-object-group',
    color: '#e11d48',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: true,
    minFiles: 2,
    cta: 'Merge PDF files',
    seoTitle: 'Merge PDF Files Online Free — Combine PDFs Privately',
    seoDesc: 'Combine multiple PDF documents into one single file in seconds. Free, unlimited, private in-browser PDF merger with zero server uploads.',
    howTo: ['Upload two or more PDF files.', 'Drag or use arrows to arrange them in the desired order.', 'Click "Merge PDF files" and download your combined document.'],
    features: ['Reorder documents effortlessly', '100% client-side privacy', 'No file size restrictions', 'Instant processing without queues']
  },
  {
    id: 'split',
    name: 'Split PDF',
    short: 'Separate one PDF into independent files by page ranges.',
    desc: 'Split a PDF into separate documents. Extract custom page ranges or break every page into its own file.',
    icon: 'fa-scissors',
    color: '#d97706',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Split PDF',
    seoTitle: 'Split PDF Online Free — Separate PDF Pages Privately',
    seoDesc: 'Split PDF files into individual pages or specific page ranges. Free online tool that runs entirely inside your browser with complete privacy.',
    howTo: ['Choose your PDF document.', 'Select split mode: custom page ranges (e.g. 1-3, 4-6) or every single page.', 'Click "Split PDF" to download your separated documents.'],
    features: ['Custom page ranges', 'One-click split into single pages', 'Batch ZIP download', 'Zero upload security']
  },
  {
    id: 'organize',
    name: 'Organize PDF',
    short: 'Reorder, rotate or delete pages with a visual page preview.',
    desc: 'See every page as a thumbnail, then reorder, rotate or remove pages and save a brand-new PDF.',
    icon: 'fa-table-cells-large',
    color: '#7c3aed',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Apply changes',
    seoTitle: 'Organize PDF Pages Online — Sort, Reorder & Delete Pages',
    seoDesc: 'Rearrange, rotate, and delete PDF pages visually with live interactive thumbnails. Free, private, and instant.',
    howTo: ['Upload your PDF file to load page thumbnails.', 'Drag and move pages to reorder, rotate pages 90°, or click delete to remove unwanted pages.', 'Click "Apply changes" to download your reorganized PDF.'],
    features: ['Live thumbnail previews', 'Visual rotation and removal', 'Drag and drop page sorting', 'Fast in-memory processing']
  },
  {
    id: 'extract',
    name: 'Extract Pages',
    short: 'Pull selected pages out of a PDF into a new file.',
    desc: 'Choose the exact pages you need (e.g. 1-3, 7, 10) and export them as a new PDF document.',
    icon: 'fa-file-export',
    color: '#0d9488',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Extract pages',
    seoTitle: 'Extract PDF Pages Online — Save Specific Pages Free',
    seoDesc: 'Extract individual pages or page intervals from any PDF document into a new clean file. 100% private in-browser utility.',
    howTo: ['Select the PDF you want to extract pages from.', 'Enter page numbers or ranges (e.g., 1-5, 8, 12).', 'Click "Extract pages" and save your new PDF.'],
    features: ['Select any page range', 'Preserves original document formatting', 'No software download required', 'Completely secure and private']
  },
  {
    id: 'remove',
    name: 'Remove Pages',
    short: 'Delete unwanted pages from your PDF document.',
    desc: 'Specify the pages you want gone (e.g. 2, 5-6) and download a clean copy without them.',
    icon: 'fa-trash-can',
    color: '#64748b',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Remove pages',
    seoTitle: 'Delete PDF Pages Online Free — Remove Unwanted Pages',
    seoDesc: 'Quickly remove blank or unwanted pages from any PDF document. Free, confidential, and instant client-side processing.',
    howTo: ['Choose the PDF containing pages to delete.', 'Input the page numbers or ranges you wish to delete (e.g. 2, 5-7).', 'Click "Remove pages" to generate your clean PDF.'],
    features: ['Delete single or multiple pages', 'Page boundary validation', 'Clean output without loss of quality', 'No files sent to external servers']
  },
  {
    id: 'rotate',
    name: 'Rotate PDF',
    short: 'Rotate all pages or specific pages by 90°, 180° or 270°.',
    desc: 'Fix sideways or upside-down documents. Rotate the whole file or only the pages you specify.',
    icon: 'fa-rotate-right',
    color: '#ea580c',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Rotate PDF',
    seoTitle: 'Rotate PDF Pages Online — Permanent Rotation Free',
    seoDesc: 'Rotate PDF pages 90, 180, or 270 degrees clockwise or counter-clockwise. Permanently save rotated orientation privately.',
    howTo: ['Upload your PDF file.', 'Select the rotation angle and whether to apply to all pages or specific pages.', 'Click "Rotate PDF" to download the correctly oriented document.'],
    features: ['Rotate 90°, 180°, or 270°', 'Target all or select pages', 'Permanent rotation embedding', 'Instant browser processing']
  },
  {
    id: 'crop',
    name: 'Crop PDF',
    short: 'Trim margins and crop specific areas of your PDF pages.',
    desc: 'Remove white borders or crop document pages to exact margin specifications or page dimensions.',
    icon: 'fa-crop-simple',
    color: '#0891b2',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Crop PDF',
    seoTitle: 'Crop PDF Online Free — Trim PDF Margins & Page Size',
    seoDesc: 'Easily crop margins or trim white borders from PDF pages. Clean, fast, and free client-side PDF cropping tool.',
    howTo: ['Upload the PDF you want to crop.', 'Select trimming preset (Small, Medium, Aggressive) or enter custom margin offsets.', 'Click "Crop PDF" and download your trimmed document.'],
    features: ['Automatic margin trimming', 'Preserves text and vector sharpness', 'Custom margin control', '100% private in-browser']
  },
  {
    id: 'flatten',
    name: 'Flatten PDF',
    short: 'Lock form fields, signatures and annotations into static content.',
    desc: 'Flatten fillable forms and annotations into permanent document layers so they cannot be edited or modified.',
    icon: 'fa-layer-group',
    color: '#475569',
    category: 'organize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Flatten PDF',
    seoTitle: 'Flatten PDF Online Free — Make PDF Forms & Signatures Read-Only',
    seoDesc: 'Flatten interactive PDF form fields, widgets, and comments into uneditable static pages. Keep your completed forms secure.',
    howTo: ['Upload your fillable form or signed PDF.', 'Review options and click "Flatten PDF".', 'Download your flattened, tamper-resistant document.'],
    features: ['Locks interactive form fields', 'Merges annotations into page stream', 'Prevents unwanted form edits', 'Ideal for legal and official submission']
  },

  // =================== OPTIMIZE & REPAIR ===================
  {
    id: 'compress',
    name: 'Compress PDF',
    short: 'Reduce PDF file size while keeping the best possible quality.',
    desc: 'Shrink heavy PDFs so they are easy to email and upload. Choose the compression level that suits you.',
    icon: 'fa-file-zipper',
    color: '#059669',
    category: 'optimize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Compress PDF',
    seoTitle: 'Compress PDF Online Free — Reduce PDF File Size Privately',
    seoDesc: 'Compress PDF documents online with high quality. Reduce file size for email, web, and submission without uploading to servers.',
    howTo: ['Upload your PDF file.', 'Select compression strength: Extreme (smallest size), Recommended, or Light.', 'Click "Compress PDF" and download your compact file.'],
    features: ['Three smart compression levels', 'Detailed percentage reduction feedback', 'No file upload waiting times', 'Unlimited free compressions']
  },
  {
    id: 'ocr',
    name: 'OCR PDF',
    short: 'Extract selectable, searchable text from scanned PDFs & images.',
    desc: 'Convert scanned documents and images into searchable, copyable text using client-side Optical Character Recognition.',
    icon: 'fa-wand-magic-sparkles',
    color: '#2563eb',
    category: 'optimize',
    accept: '.pdf,application/pdf,image/*',
    multiple: false,
    minFiles: 1,
    cta: 'Perform OCR',
    seoTitle: 'Free Online OCR PDF — Recognize Text in Scanned PDFs',
    seoDesc: 'Accurate in-browser Optical Character Recognition (OCR). Convert scanned PDFs and photos into searchable text without uploading files.',
    howTo: ['Upload a scanned PDF or photo document.', 'Choose OCR language and click "Perform OCR".', 'View recognized text directly on screen or download as TXT/Searchable document.'],
    features: ['Pure client-side OCR (Tesseract.js)', 'Zero data leakage — 100% confidential', 'Recognizes English and multilingual text', 'One-click text copying']
  },
  {
    id: 'repair',
    name: 'Repair PDF',
    short: 'Recover data from corrupted or damaged PDF documents.',
    desc: 'Fix broken PDF files, rebuild corrupted cross-reference tables, and recover unreadable documents.',
    icon: 'fa-screwdriver-wrench',
    color: '#d97706',
    category: 'optimize',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Repair PDF',
    seoTitle: 'Repair Corrupted PDF Online Free — Fix Damaged PDF Files',
    seoDesc: 'Restore and recover damaged or corrupted PDF files. Rebuilds cross-reference tables and recovers accessible pages in your browser.',
    howTo: ['Select the damaged or unreadable PDF file.', 'Click "Repair PDF" to trigger structural reconstruction.', 'Download your recovered, clean PDF document.'],
    features: ['Rebuilds damaged xref streams', 'Recovers unreadable page objects', 'Client-side recovery engine', 'Free with no limits']
  },

  // =================== CONVERT TO PDF ===================
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    short: 'Turn JPG and JPEG images into a single polished PDF.',
    desc: 'Combine photos and scans into one PDF. Pick page size, orientation and margins — perfect for receipts and documents.',
    icon: 'fa-images',
    color: '#4f46e5',
    category: 'convert',
    accept: '.jpg,.jpeg,image/jpeg',
    multiple: true,
    minFiles: 1,
    cta: 'Convert to PDF',
    seoTitle: 'Convert JPG to PDF Online Free — High Quality Image to PDF',
    seoDesc: 'Convert JPG/JPEG images to PDF in seconds. Set page size (A4, Letter, Fit), orientation and margins. 100% free and private.',
    howTo: ['Upload one or multiple JPG images.', 'Set page format (A4, Letter, Fit to image), orientation, and margins.', 'Click "Convert to PDF" and download your document.'],
    features: ['Multi-image batch combination', 'Custom page size & margins', 'Portrait or landscape orientation', 'Lossless image embedding']
  },
  {
    id: 'png-to-pdf',
    name: 'PNG to PDF',
    short: 'Convert PNG graphics and photos into clean PDF documents.',
    desc: 'Transform PNG pictures and graphics into PDF files with crisp lines and optional background padding.',
    icon: 'fa-file-image',
    color: '#06b6d4',
    category: 'convert',
    accept: '.png,image/png',
    multiple: true,
    minFiles: 1,
    cta: 'Convert to PDF',
    seoTitle: 'Convert PNG to PDF Online Free — Combine PNGs to PDF',
    seoDesc: 'Fast, secure PNG to PDF converter. Combine multiple transparent or high-res PNG images into a single multi-page PDF.',
    howTo: ['Select your PNG images.', 'Configure desired layout and page margins.', 'Click "Convert to PDF" to save your document.'],
    features: ['Preserves high resolution transparency', 'Combine multiple images in order', 'A4, US Letter, or Fit-to-image sizes', 'Zero server uploads']
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    short: 'Convert Word documents (.docx) to high-quality PDF files.',
    desc: 'Transform Microsoft Word documents into portable, read-only PDF files ready for printing and sharing.',
    icon: 'fa-file-word',
    color: '#2563eb',
    category: 'convert',
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PDF',
    seoTitle: 'Convert Word to PDF Online Free — DOCX to PDF In-Browser',
    seoDesc: 'Convert Word DOCX documents to PDF format for free. Retains typography, paragraphs, and formatting securely in your browser.',
    howTo: ['Select your .docx Word document.', 'Preview document details.', 'Click "Convert to PDF" to generate and download your PDF.'],
    features: ['Retains clean document typography', 'Works directly with .docx files', 'Perfect for resumes and contracts', 'Client-side privacy protection']
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    short: 'Convert Excel spreadsheets (.xlsx, .csv) to printable PDF tables.',
    desc: 'Turn your spreadsheet workbooks and CSV sheets into beautifully formatted PDF tables ready to distribute.',
    icon: 'fa-file-excel',
    color: '#16a34a',
    category: 'convert',
    accept: '.xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PDF',
    seoTitle: 'Convert Excel to PDF Online Free — XLSX & CSV to PDF',
    seoDesc: 'Transform Excel sheets and CSV data into clean, paginated PDF tables. Free in-browser tool with zero server latency.',
    howTo: ['Upload an Excel .xlsx or .csv spreadsheet.', 'Choose table layout and orientation.', 'Click "Convert to PDF" to download your printable report.'],
    features: ['Formatted table grids', 'Auto-pagination for wide spreadsheets', 'Supports CSV and modern XLSX', 'Confidential financial data stays local']
  },
  {
    id: 'ppt-to-pdf',
    name: 'PowerPoint to PDF',
    short: 'Convert PowerPoint presentations (.pptx) into PDF slide decks.',
    desc: 'Export presentation decks to compact, universal PDF files that display consistently on any device.',
    icon: 'fa-file-powerpoint',
    color: '#ea580c',
    category: 'convert',
    accept: '.pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PDF',
    seoTitle: 'Convert PowerPoint to PDF Online Free — PPTX to PDF',
    seoDesc: 'Convert PPTX presentations to PDF format. Easy sharing, universal viewing, and printer-ready slides.',
    howTo: ['Select your .pptx PowerPoint file.', 'Preview slide count and settings.', 'Click "Convert to PDF" and download your slides.'],
    features: ['Universal slide compatibility', 'Compact file size', 'Perfect for handouts and slide decks', 'Instant client-side generation']
  },
  {
    id: 'text-to-pdf',
    name: 'Text to PDF',
    short: 'Typeset plain text or notes (.txt) into formatted PDF documents.',
    desc: 'Turn raw text, logs, code, or written notes into polished, formatted PDF pages with custom typography.',
    icon: 'fa-font',
    color: '#475569',
    category: 'convert',
    accept: '.txt,text/plain',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PDF',
    seoTitle: 'Convert Text to PDF Online Free — TXT to Formatted PDF',
    seoDesc: 'Transform raw text files and notes into elegant, typeset PDF documents with custom font sizes, margins, and pagination.',
    howTo: ['Upload a .txt file or paste your text directly.', 'Select font style, font size, and line spacing.', 'Click "Convert to PDF" to download your clean document.'],
    features: ['Custom font size and line spacing', 'Automatic page breaking and headers', 'Great for code snippets & transcripts', 'Zero data upload']
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    short: 'Convert HTML code or formatted web snippets into PDF.',
    desc: 'Render HTML documents, formatted tables, and rich text into clean, printable multi-page PDF files.',
    icon: 'fa-code',
    color: '#9333ea',
    category: 'convert',
    accept: '.html,.htm,text/html',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PDF',
    seoTitle: 'Convert HTML to PDF Online Free — Webpage & Code to PDF',
    seoDesc: 'Convert HTML documents or code into printable PDF files. Preserves layout, tables, and typography in your browser.',
    howTo: ['Upload an HTML file or paste your HTML code.', 'Preview the layout structure.', 'Click "Convert to PDF" to generate your document.'],
    features: ['Clean HTML rendering', 'Preserves CSS styling & layout', 'Generates standard A4/Letter pages', 'Completely private and instant']
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF',
    short: 'Capture documents with your webcam/camera and create a PDF.',
    desc: 'Use your phone or laptop camera as a document scanner. Snap multiple pages and instantly compile into a PDF.',
    icon: 'fa-camera',
    color: '#0d9488',
    category: 'convert',
    accept: 'image/*,.pdf',
    multiple: true,
    minFiles: 0,
    cta: 'Generate PDF from Scans',
    seoTitle: 'Free Online Document Scanner — Scan to PDF with Camera',
    seoDesc: 'Scan documents, receipts, and IDs directly from your webcam or smartphone camera into a multi-page PDF without an app.',
    howTo: ['Open your device camera with one click.', 'Capture photos of pages in sequence.', 'Preview and reorder snapshots, then click "Generate PDF from Scans".'],
    features: ['Direct webcam & phone camera access', 'Multi-page document capture', 'Live flash and alignment guide', '100% in-browser — no app install']
  },

  // =================== CONVERT FROM PDF ===================
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    short: 'Convert every PDF page into a high-quality JPG image.',
    desc: 'Turn each page of a PDF into a crisp JPG image. Download pictures one by one or all at once as a ZIP.',
    icon: 'fa-file-image',
    color: '#0284c7',
    category: 'convert',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to JPG',
    seoTitle: 'Convert PDF to JPG Online Free — High Quality PDF to Image',
    seoDesc: 'Extract all pages of a PDF to high-resolution JPG images. Download single images or batch as a ZIP file. Fast and free.',
    howTo: ['Select your PDF document.', 'Pick output quality (Normal or Print-Ready High Resolution).', 'Click "Convert to JPG" and download your images.'],
    features: ['Crisp high-DPI rendering', 'Batch ZIP archive included', 'Extract individual pages', 'Runs locally on your device']
  },
  {
    id: 'pdf-to-png',
    name: 'PDF to PNG',
    short: 'Extract PDF pages as crisp, lossless PNG images.',
    desc: 'Convert PDF document pages to crystal-clear PNG images with transparency support and sharp typography.',
    icon: 'fa-image',
    color: '#0284c7',
    category: 'convert',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PNG',
    seoTitle: 'Convert PDF to PNG Online Free — Lossless PDF to PNG',
    seoDesc: 'Extract pages from PDF to lossless PNG images. Perfect for diagrams, presentations, and vector-sharp graphics.',
    howTo: ['Upload your PDF file.', 'Select resolution scale (150 DPI or 300 DPI).', 'Click "Convert to PNG" to save all pages.'],
    features: ['Lossless PNG image export', 'Ultra-sharp text and graphics', 'ZIP package for multi-page documents', 'No watermarks or limits']
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    short: 'Extract all selectable text from a PDF into a .txt file.',
    desc: 'Pull the text content out of your PDF and download it as a plain-text file you can edit anywhere.',
    icon: 'fa-file-lines',
    color: '#9333ea',
    category: 'convert',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Extract text',
    seoTitle: 'Convert PDF to Text Online Free — Extract Text from PDF',
    seoDesc: 'Instantly extract all readable text from any PDF document into a clean TXT file. Free, fast, and completely confidential.',
    howTo: ['Select the PDF you want to extract text from.', 'Click "Extract text" to process all pages.', 'Download the resulting .txt file or copy the text directly.'],
    features: ['Extracts text from all pages', 'Clean formatting with page headers', 'One-click copy to clipboard', 'Instant client-side extraction']
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    short: 'Convert PDF documents into editable Word (.docx) files.',
    desc: 'Turn non-editable PDF files into clean, fully editable Microsoft Word documents with paragraph structures.',
    icon: 'fa-file-word',
    color: '#2563eb',
    category: 'convert',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to Word',
    seoTitle: 'Convert PDF to Word Online Free — PDF to Editable DOCX',
    seoDesc: 'Convert PDF to editable DOCX format for Microsoft Word and Google Docs. Free in-browser converter with high privacy standards.',
    howTo: ['Upload your PDF document.', 'Click "Convert to Word" to parse document structure.', 'Download your editable .docx file.'],
    features: ['Exports standard .docx format', 'Preserves headings and paragraphs', 'Compatible with Microsoft Word & Google Docs', 'Zero server storage']
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    short: 'Extract tabular data from PDF into Excel & CSV spreadsheets.',
    desc: 'Automatically detect tables in your PDF and export them into structured spreadsheet files (.csv, .xlsx).',
    icon: 'fa-file-excel',
    color: '#16a34a',
    category: 'convert',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to Excel',
    seoTitle: 'Convert PDF to Excel Online Free — Extract Tables from PDF',
    seoDesc: 'Extract tables and numerical data from PDF into Excel spreadsheet and CSV formats. Fast, free, and accurate client-side tool.',
    howTo: ['Choose the PDF containing financial or tabular data.', 'Click "Convert to Excel".', 'Download your structured spreadsheet file.'],
    features: ['Automatic column and row detection', 'Exports to CSV and Excel-compatible formats', 'Ideal for bank statements and invoices', 'Private in-browser processing']
  },
  {
    id: 'pdf-to-ppt',
    name: 'PDF to PowerPoint',
    short: 'Transform PDF pages into a PowerPoint (.pptx) presentation.',
    desc: 'Convert PDF documents into slide presentations. Each page becomes a distinct slide ready to present.',
    icon: 'fa-file-powerpoint',
    color: '#ea580c',
    category: 'convert',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PPTX',
    seoTitle: 'Convert PDF to PowerPoint Online Free — PDF to PPTX Slides',
    seoDesc: 'Convert PDF documents into PowerPoint presentations. Turn each page into a clear presentation slide easily.',
    howTo: ['Upload the PDF presentation file.', 'Click "Convert to PPTX".', 'Download your ready-to-present PowerPoint slide deck.'],
    features: ['Converts pages to presentation slides', 'Compatible with PowerPoint and Keynote', 'High quality visual reproduction', 'Instant client-side conversion']
  },
  {
    id: 'pdf-to-pdfa',
    name: 'PDF to PDF/A',
    short: 'Convert standard PDF to PDF/A for long-term ISO archiving.',
    desc: 'Transform your document into an ISO-standardized PDF/A file with embedded color profiles and archival metadata.',
    icon: 'fa-box-archive',
    color: '#0d9488',
    category: 'convert',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Convert to PDF/A',
    seoTitle: 'Convert PDF to PDF/A Online Free — ISO Archival PDF Format',
    seoDesc: 'Convert your PDF documents to PDF/A standard for legal and long-term document preservation. Compliant and private.',
    howTo: ['Upload your standard PDF document.', 'Select PDF/A conformance level (PDF/A-1b).', 'Click "Convert to PDF/A" to embed archival metadata.'],
    features: ['ISO 19005 compliant format', 'Embeds standard sRGB color intent', 'Ensures long-term document readability', 'No server uploads']
  },

  // =================== EDIT & SECURITY ===================
  {
    id: 'edit',
    name: 'Edit PDF',
    short: 'Add custom text, annotations, shapes & drawings on PDF.',
    desc: 'Annotate your PDF directly in your browser. Add text notes, highlight key sections, draw shapes, and add signatures.',
    icon: 'fa-pen-to-square',
    color: '#4f46e5',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Save Edited PDF',
    seoTitle: 'Edit PDF Online Free — Add Text, Annotations & Shapes',
    seoDesc: 'Free online PDF editor. Add text, highlights, shapes, and notes directly onto PDF pages without installing software.',
    howTo: ['Upload your PDF file.', 'Select page and tool (Text, Highlight, Rectangle, Freehand pen).', 'Click "Save Edited PDF" to export your changes.'],
    features: ['Add text anywhere on the page', 'Highlight and draw rectangles', 'Adjust colors, font sizes, and opacity', '100% private in-browser editing']
  },
  {
    id: 'sign',
    name: 'Sign PDF',
    short: 'Draw, type or upload your signature to place on any page.',
    desc: 'Sign contracts and agreements with an intuitive digital signature pad. Draw by hand, choose cursive fonts, or stamp an image.',
    icon: 'fa-signature',
    color: '#10b981',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Sign & Download',
    seoTitle: 'Sign PDF Online Free — Add Electronic Signature to PDF',
    seoDesc: 'Add your electronic signature to any PDF document for free. Draw your signature, type cursive script, or upload a stamp.',
    howTo: ['Upload the document you need to sign.', 'Create your signature: draw with pen, type your name, or upload an image.', 'Place signature on page and click "Sign & Download".'],
    features: ['Smooth canvas signature pad', 'Beautiful cursive calligraphy fonts', 'Upload signature image or stamp', 'Legally sound client-side signing']
  },
  {
    id: 'watermark',
    name: 'Watermark PDF',
    short: 'Stamp a custom text watermark across every page.',
    desc: 'Protect your documents with a text watermark. Control the wording, size, colour, opacity and angle.',
    icon: 'fa-stamp',
    color: '#0891b2',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Add watermark',
    seoTitle: 'Add Watermark to PDF Online Free — Protect Your PDFs',
    seoDesc: 'Stamp customized text watermarks across all pages of your PDF. Set custom text, font size, color, opacity, and rotation angle.',
    howTo: ['Upload your PDF file.', 'Type your watermark text (e.g., CONFIDENTIAL, DRAFT).', 'Customize color, opacity, and angle, then click "Add watermark".'],
    features: ['Custom text and diagonal angle', 'Adjustable transparency/opacity', 'Stamps across every page cleanly', 'Instant in-memory processing']
  },
  {
    id: 'page-numbers',
    name: 'Page Numbers',
    short: 'Add elegant page numbers exactly where you want them.',
    desc: 'Insert page numbers in the header or footer, left, centre or right, with your preferred format.',
    icon: 'fa-list-ol',
    color: '#be185d',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Add page numbers',
    seoTitle: 'Add Page Numbers to PDF Online Free — Header & Footer',
    seoDesc: 'Insert clean page numbers into any PDF file. Position at header or footer, align left, center, or right, with custom numbering format.',
    howTo: ['Select the PDF you want to number.', 'Choose position (top header or bottom footer) and alignment (left, center, right).', 'Click "Add page numbers" and download your numbered PDF.'],
    features: ['Header or footer positioning', 'Format options: "1, 2, 3" or "Page 1 of N"', 'Matches original typography', 'Zero server uploads']
  },
  {
    id: 'redact',
    name: 'Redact PDF',
    short: 'Permanently black-out sensitive text, SSNs, and data.',
    desc: 'Irrevocably remove confidential information, account numbers, or personal data by applying permanent black-out blocks.',
    icon: 'fa-user-secret',
    color: '#1e293b',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Redact PDF',
    seoTitle: 'Redact PDF Online Free — Permanently Black Out Sensitive Info',
    seoDesc: 'Black out confidential text, financial numbers, and private data permanently. Ensures sensitive data cannot be recovered.',
    howTo: ['Upload your sensitive PDF file.', 'Specify the page and area to redact, or use our visual blackout selector.', 'Click "Redact PDF" to permanently purge hidden layers.'],
    features: ['Permanent non-reversible redaction', 'Purges underlying text stream', 'Ideal for legal, HR, and medical records', '100% private in-browser']
  },
  {
    id: 'protect',
    name: 'Protect PDF',
    short: 'Encrypt and lock your PDF document with a secure password.',
    desc: 'Add strong password protection to prevent unauthorized opening, viewing, or copying of your confidential PDF files.',
    icon: 'fa-lock',
    color: '#dc2626',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Protect PDF',
    seoTitle: 'Password Protect PDF Online Free — Encrypt PDF Documents',
    seoDesc: 'Protect your PDF with a password. Add strong encryption to ensure only authorized users can view your documents.',
    howTo: ['Upload the PDF file to encrypt.', 'Enter your secure password and confirmation.', 'Click "Protect PDF" and download your encrypted file.'],
    features: ['Prevents unauthorized access', 'In-browser cryptographic security', 'No passwords transmitted to servers', 'Works across all PDF readers']
  },
  {
    id: 'unlock',
    name: 'Unlock PDF',
    short: 'Remove password and restrictions from protected PDF files.',
    desc: 'Unlock password-protected PDF documents by entering the valid key once and exporting an unencrypted, open copy.',
    icon: 'fa-lock-open',
    color: '#10b981',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Unlock PDF',
    seoTitle: 'Unlock PDF Online Free — Remove PDF Password Security',
    seoDesc: 'Remove password restrictions from secured PDF files. Fast and secure client-side PDF password remover.',
    howTo: ['Upload your password-protected PDF.', 'Type the current document password.', 'Click "Unlock PDF" to download a permanently unlocked copy.'],
    features: ['Instant password removal', 'Unlocks printing and editing restrictions', 'Private processing inside your browser', 'Zero file storage']
  },
  {
    id: 'metadata',
    name: 'PDF Metadata',
    short: 'View and edit PDF Title, Author, Subject & Keywords tags.',
    desc: 'Inspect or change embedded metadata properties including Document Title, Author, Subject, Keywords, and Creator.',
    icon: 'fa-tags',
    color: '#6366f1',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Save Metadata',
    seoTitle: 'Edit PDF Metadata Online Free — Change Title, Author & Tags',
    seoDesc: 'View and modify PDF metadata tags (Title, Author, Subject, Keywords) online. Fast, clean, and confidential in-browser tool.',
    howTo: ['Upload any PDF document to read existing tags.', 'Edit or wipe Title, Author, Subject, and Keywords fields.', 'Click "Save Metadata" to apply your changes.'],
    features: ['Clean metadata inspection', 'Strip or add author details', 'Improves SEO & cataloging of PDF documents', 'No software installation required']
  },
  {
    id: 'compare',
    name: 'Compare PDF',
    short: 'Compare two PDF files side-by-side to highlight differences.',
    desc: 'Upload two versions of a document to easily spot changes, text modifications, and layout differences side-by-side.',
    icon: 'fa-code-compare',
    color: '#0891b2',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: true,
    minFiles: 2,
    cta: 'Compare Documents',
    seoTitle: 'Compare PDF Files Online Free — Side-by-Side PDF Diff Tool',
    seoDesc: 'Compare two PDF documents side by side. Highlight differences in text, numbers, and layout between revisions.',
    howTo: ['Upload the original PDF and the revised PDF.', 'Click "Compare Documents" to initiate page-by-page comparison.', 'Review side-by-side visual and textual diff report.'],
    features: ['Side-by-side document viewer', 'Identifies added and deleted words', 'Page-by-page navigation', 'Completely secure and private']
  },
  {
    id: 'reader',
    name: 'PDF Reader',
    short: 'View and read PDFs with zoom, page navigation & printing.',
    desc: 'A distraction-free, lightning-fast in-browser PDF viewer. Read documents, jump between pages, zoom in/out, and print.',
    icon: 'fa-book-open-reader',
    color: '#7c3aed',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Open in Reader',
    seoTitle: 'Free Online PDF Reader — View and Read PDFs in Browser',
    seoDesc: 'Open and read PDF documents instantly in your browser with full zoom, thumbnail navigation, and high-fidelity text rendering.',
    howTo: ['Select any PDF file from your device.', 'Use intuitive navigation controls (Zoom, Next/Prev, Rotate).', 'Enjoy clean, distraction-free reading with zero lag.'],
    features: ['High-DPI text rendering', 'Page jumping and thumbnail rail', 'Direct print support', 'Opens 100% locally without upload']
  },
  {
    id: 'ai-summarize',
    name: 'AI PDF Summarizer',
    short: 'Get instant executive summaries, key bullet points & Q&A chat.',
    desc: 'Analyze any PDF in seconds with client-side intelligence. Extract key takeaways, calculate reading metrics, and chat with your document.',
    icon: 'fa-brain',
    color: '#ec4899',
    category: 'edit',
    accept: '.pdf,application/pdf',
    multiple: false,
    minFiles: 1,
    cta: 'Analyze Document',
    seoTitle: 'AI PDF Summarizer Online Free — Summarize and Chat with PDF',
    seoDesc: 'Generate instant executive summaries and key bullet points from any PDF document. Free client-side document analysis and Q&A.',
    howTo: ['Upload any report, research paper, or book in PDF format.', 'Click "Analyze Document" to generate instant key takeaways.', 'Read the summary, review document statistics, or search specific questions.'],
    features: ['Instant executive summary generation', 'Key takeaways and highlights list', 'Word count and estimated reading time', 'Zero server transmission — 100% private']
  }
];

const TOOL_CATEGORIES = {
  all: 'All tools',
  organize: 'Organize',
  optimize: 'Optimize & Repair',
  convert: 'Convert',
  edit: 'Edit & Security'
};

function getToolById(id) {
  return PDF_TOOLS.find(function (t) { return t.id === id; });
}

/* Render a tool card (shared by landing grid + "other tools" strips) */
function toolCardHTML(tool) {
  var catLabels = {
    organize: 'Organize',
    optimize: 'Optimize',
    convert: 'Convert',
    edit: 'Edit & Security'
  };
  var catName = catLabels[tool.category] || 'Tool';
  return '<a class="tool-card" href="tool.html?t=' + tool.id + '" style="--tool-color:' + tool.color + '" data-category="' + tool.category + '">' +
    '<div class="tool-card-head">' +
      '<span class="tool-icon"><i class="fa-solid ' + tool.icon + '"></i></span>' +
      '<span class="tool-badge">' + catName + '</span>' +
    '</div>' +
    '<h3>' + tool.name + '</h3>' +
    '<p>' + tool.short + '</p>' +
    '<div class="tool-card-footer">' +
      '<span class="tool-action-btn">Use tool <i class="fa-solid fa-arrow-right"></i></span>' +
    '</div>' +
    '</a>';
}

/* Build the header tools dropdown (grouped by category into a modern mega-menu) */
function buildHeaderDropdown() {
  var menu = document.getElementById('nav-tools-menu');
  if (!menu) return;

  var categories = [
    { id: 'organize', title: 'Organize', icon: 'fa-folder-tree', color: '#e11d48' },
    { id: 'optimize', title: 'Optimize & Repair', icon: 'fa-gauge-high', color: '#059669' },
    { id: 'convert', title: 'Convert', icon: 'fa-repeat', color: '#2563eb' },
    { id: 'edit', title: 'Edit & Security', icon: 'fa-shield-halved', color: '#7c3aed' }
  ];

  menu.innerHTML = categories.map(function (cat) {
    var tools = PDF_TOOLS.filter(function (t) { return t.category === cat.id; });
    var items = tools.map(function (t) {
      return '<a href="tool.html?t=' + t.id + '">' +
        '<i class="fa-solid ' + t.icon + '" style="background:' + t.color + '"></i>' +
        '<span>' + t.name + '</span>' +
      '</a>';
    }).join('');

    return '<div class="nav-cat-group">' +
      '<div class="nav-cat-title"><i class="fa-solid ' + cat.icon + '" style="color:' + cat.color + '"></i> ' + cat.title + '</div>' +
      '<div class="nav-cat-items">' + items + '</div>' +
    '</div>';
  }).join('');
}

