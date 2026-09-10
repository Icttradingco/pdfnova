/* ============================================================
   PDFNova — Tool page controller
   Reads ?t=<tool-id>, builds the UI, runs PDFEngine,
   and injects dynamic on-page SEO content.
   ============================================================ */
(function () {
  'use strict';

  buildHeaderDropdown();

  // ---- Mobile menu ----
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
      hamburger.innerHTML = nav.classList.contains('open')
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // ---- Resolve tool ----
  var params = new URLSearchParams(window.location.search);
  var tool = getToolById(params.get('t')) || getToolById('merge');

  // Update Page Title and SEO Meta
  document.title = (tool.seoTitle || (tool.name + ' — Free Online PDF Tool')) + ' | PDFNova';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && tool.seoDesc) metaDesc.setAttribute('content', tool.seoDesc);

  var heroIcon = document.getElementById('tool-hero-icon');
  if (heroIcon) {
    heroIcon.style.background = tool.color;
    heroIcon.style.boxShadow = '0 10px 24px -4px ' + tool.color;
    heroIcon.innerHTML = '<i class="fa-solid ' + tool.icon + '"></i>';
  }
  var heroTitle = document.getElementById('tool-hero-title');
  if (heroTitle) heroTitle.textContent = tool.name;
  var heroDesc = document.getElementById('tool-hero-desc');
  if (heroDesc) heroDesc.textContent = tool.desc;

  // Other tools strip (exclude current)
  var otherToolsGrid = document.getElementById('other-tools-grid');
  if (otherToolsGrid) {
    otherToolsGrid.innerHTML = PDF_TOOLS.filter(function (t) { return t.id !== tool.id; })
      .slice(0, 8).map(toolCardHTML).join('');
  }

  // ---- Elements ----
  var dropzone = document.getElementById('dropzone');
  var fileInput = document.getElementById('file-input');
  var fileListEl = document.getElementById('file-list');
  var addMoreBtn = document.getElementById('add-more-btn');
  var thumbsGrid = document.getElementById('thumbs-grid');
  var optionsPanel = document.getElementById('options-panel');
  var optionsBody = document.getElementById('options-body');
  var processBtn = document.getElementById('process-btn');
  var processLabel = document.getElementById('process-btn-label');
  var progressWrap = document.getElementById('progress-wrap');
  var progressFill = document.getElementById('progress-fill');
  var progressLabel = document.getElementById('progress-label');
  var errorBanner = document.getElementById('error-banner');
  var errorText = document.getElementById('error-text');
  var resultPanel = document.getElementById('result-panel');
  var resultSub = document.getElementById('result-sub');
  var resultDownloads = document.getElementById('result-downloads');
  var resultAgain = document.getElementById('result-again');

  var isImageTool = /^(jpg-to-pdf|png-to-pdf)$/.test(tool.id);
  var isDocxTool = tool.id === 'word-to-pdf';
  var isExcelTool = tool.id === 'excel-to-pdf';
  var isPptTool = tool.id === 'ppt-to-pdf';
  var isTextTool = tool.id === 'text-to-pdf';
  var isHtmlTool = tool.id === 'html-to-pdf';

  var dzTitle = document.getElementById('dz-title');
  if (dzTitle) {
    if (isImageTool) dzTitle.textContent = tool.multiple ? 'Select image files' : 'Select an image file';
    else if (isDocxTool) dzTitle.textContent = 'Select Word document (.docx)';
    else if (isExcelTool) dzTitle.textContent = 'Select Excel or CSV file';
    else if (isPptTool) dzTitle.textContent = 'Select PowerPoint presentation (.pptx)';
    else if (isTextTool) dzTitle.textContent = 'Select text file (.txt)';
    else if (isHtmlTool) dzTitle.textContent = 'Select HTML file (.html)';
    else if (tool.id === 'compare') dzTitle.textContent = 'Select two PDF files to compare';
    else dzTitle.textContent = tool.multiple ? 'Select PDF files' : 'Select a PDF file';
  }

  if (fileInput) {
    fileInput.accept = tool.accept || '.pdf';
    if (tool.multiple) fileInput.multiple = true;
  }

  var selectedFiles = [];
  var organizePages = []; // for organize tool: [{index, rotation, deleted}]
  var pdfjsDocCache = null;
  var objectUrls = [];

  // Signature canvas state
  var sigCanvas = null;
  var sigCtx = null;
  var isDrawingSig = false;

  // Camera stream state
  var cameraStream = null;

  // ---- File selection ----
  function openPicker() { fileInput.click(); }
  if (dropzone) {
    dropzone.addEventListener('click', openPicker);
    dropzone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker(); }
    });
  }
  if (addMoreBtn) addMoreBtn.addEventListener('click', openPicker);

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      addFiles(Array.prototype.slice.call(fileInput.files));
      fileInput.value = '';
    });
  }

  if (dropzone) {
    ['dragenter', 'dragover'].forEach(function (ev) {
      dropzone.addEventListener(ev, function (e) { e.preventDefault(); dropzone.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      dropzone.addEventListener(ev, function (e) { e.preventDefault(); dropzone.classList.remove('dragover'); });
    });
    dropzone.addEventListener('drop', function (e) {
      addFiles(Array.prototype.slice.call(e.dataTransfer.files));
    });
  }

  function acceptable(file) {
    if (isImageTool) return /image\//.test(file.type) || /\.(jpe?g|png)$/i.test(file.name);
    if (isDocxTool) return /\.docx$/i.test(file.name);
    if (isExcelTool) return /\.(xlsx|csv)$/i.test(file.name);
    if (isPptTool) return /\.pptx$/i.test(file.name);
    if (isTextTool) return /\.txt$/i.test(file.name) || file.type === 'text/plain';
    if (isHtmlTool) return /\.(html|htm)$/i.test(file.name) || file.type === 'text/html';
    return file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
  }

  function addFiles(files) {
    hideError();
    var valid = files.filter(acceptable);
    if (files.length && !valid.length) {
      showError('Selected file format does not match this tool (' + (tool.accept || 'PDF') + ').');
      return;
    }
    if (!tool.multiple) {
      selectedFiles = valid.slice(0, 1);
    } else {
      selectedFiles = selectedFiles.concat(valid);
    }
    resultPanel.classList.remove('active');
    refreshUI();
    if (tool.id === 'organize' && selectedFiles.length) buildOrganizeThumbs();
  }

  function removeFile(i) {
    selectedFiles.splice(i, 1);
    if (tool.id === 'organize') { organizePages = []; thumbsGrid.innerHTML = ''; pdfjsDocCache = null; }
    refreshUI();
    if (tool.id === 'organize' && selectedFiles.length) buildOrganizeThumbs();
  }

  function moveFile(i, dir) {
    var j = i + dir;
    if (j < 0 || j >= selectedFiles.length) return;
    var t = selectedFiles[i]; selectedFiles[i] = selectedFiles[j]; selectedFiles[j] = t;
    refreshUI();
  }

  function refreshUI() {
    fileListEl.innerHTML = selectedFiles.map(function (f, i) {
      var reorder = (tool.multiple && selectedFiles.length > 1)
        ? '<button type="button" data-act="up" data-i="' + i + '" title="Move up" aria-label="Move up"><i class="fa-solid fa-arrow-up"></i></button>' +
          '<button type="button" data-act="down" data-i="' + i + '" title="Move down" aria-label="Move down"><i class="fa-solid fa-arrow-down"></i></button>'
        : '';
      var iconClass = isImageTool ? 'fa-image' : isDocxTool ? 'fa-file-word' : isExcelTool ? 'fa-file-excel' : isPptTool ? 'fa-file-powerpoint' : 'fa-file-pdf';
      return '<div class="file-row">' +
        '<span class="fr-icon' + (isImageTool ? ' img' : '') + '"><i class="fa-solid ' + iconClass + '"></i></span>' +
        '<span class="fr-meta"><span class="fr-name">' + escapeHtml(f.name) + '</span><br><span class="fr-size">' + PDFEngine.formatSize(f.size) + '</span></span>' +
        '<span class="fr-actions">' + reorder +
        '<button type="button" class="fr-remove" data-act="remove" data-i="' + i + '" title="Remove" aria-label="Remove file"><i class="fa-solid fa-xmark"></i></button>' +
        '</span></div>';
    }).join('');

    var has = selectedFiles.length > 0;
    addMoreBtn.style.display = (has && tool.multiple) ? 'block' : 'none';
    dropzone.style.display = has ? 'none' : 'block';
    optionsPanel.style.display = (has && optionsBody.children.length) ? 'block' : 'none';
    processBtn.style.display = has ? 'inline-flex' : 'none';
    processBtn.disabled = selectedFiles.length < tool.minFiles;
    processLabel.textContent = selectedFiles.length < tool.minFiles
      ? 'Add at least ' + tool.minFiles + ' file' + (tool.minFiles > 1 ? 's' : '')
      : tool.cta;
  }

  fileListEl.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var i = parseInt(btn.getAttribute('data-i'), 10);
    var act = btn.getAttribute('data-act');
    if (act === 'remove') removeFile(i);
    else if (act === 'up') moveFile(i, -1);
    else if (act === 'down') moveFile(i, 1);
  });

  function escapeHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- Options UI per tool ----
  var OPTION_TEMPLATES = {
    split:
      '<div class="radio-cards" style="margin-bottom:16px">' +
      '<div class="radio-card"><input type="radio" name="split-mode" id="sm-ranges" value="ranges" checked><label for="sm-ranges"><span class="rc-title">Custom ranges</span><span class="rc-sub">e.g. 1-3, 4-6 → one file each</span></label></div>' +
      '<div class="radio-card"><input type="radio" name="split-mode" id="sm-every" value="every"><label for="sm-every"><span class="rc-title">Every page</span><span class="rc-sub">One PDF per page</span></label></div>' +
      '</div>' +
      '<div class="opt-field" id="split-ranges-field"><label for="opt-ranges">Page ranges</label>' +
      '<input type="text" id="opt-ranges" placeholder="e.g. 1-3, 4-6, 9">' +
      '<div class="opt-hint">Each comma-separated part becomes its own PDF.</div></div>',
    extract:
      '<div class="opt-field"><label for="opt-ranges">Pages to extract</label>' +
      '<input type="text" id="opt-ranges" placeholder="e.g. 1-3, 5, 8-10">' +
      '<div class="opt-hint">The selected pages are combined into one new PDF.</div></div>',
    remove:
      '<div class="opt-field"><label for="opt-ranges">Pages to remove</label>' +
      '<input type="text" id="opt-ranges" placeholder="e.g. 2, 5-6">' +
      '<div class="opt-hint">These pages will be deleted from the document.</div></div>',
    crop:
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-crop-margin">Margin trim</label>' +
      '<select id="opt-crop-margin"><option value="18">Light trim (0.25 inch / 18pt)</option><option value="36" selected>Recommended (0.5 inch / 36pt)</option><option value="72">Strong trim (1.0 inch / 72pt)</option></select>' +
      '<div class="opt-hint">Trims white borders evenly on all sides of every page.</div></div>' +
      '</div>',
    flatten:
      '<div class="opt-hint" style="font-size:13.5px;color:var(--slate)">' +
      '<i class="fa-solid fa-circle-info" style="color:var(--primary)"></i> Flattening will render all interactive form elements, text fields, checkboxes, and annotations as permanent non-editable graphics into the document page.' +
      '</div>',
    compress:
      '<div class="radio-cards">' +
      '<div class="radio-card"><input type="radio" name="c-level" id="cl-extreme" value="extreme"><label for="cl-extreme"><span class="rc-title">Extreme</span><span class="rc-sub">Smallest size, lower quality</span></label></div>' +
      '<div class="radio-card"><input type="radio" name="c-level" id="cl-rec" value="recommended" checked><label for="cl-rec"><span class="rc-title">Recommended</span><span class="rc-sub">Great balance</span></label></div>' +
      '<div class="radio-card"><input type="radio" name="c-level" id="cl-low" value="low"><label for="cl-low"><span class="rc-title">Light</span><span class="rc-sub">Best quality, larger file</span></label></div>' +
      '</div><div class="opt-hint" style="margin-top:10px;font-size:12px;color:var(--slate-light)">Note: pages are re-rendered as images; text will no longer be selectable in the compressed copy.</div>',
    ocr:
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-ocr-lang">Document language</label>' +
      '<select id="opt-ocr-lang"><option value="eng" selected>English</option><option value="spa">Spanish (Español)</option><option value="fra">French (Français)</option><option value="deu">German (Deutsch)</option><option value="ita">Italian (Italiano)</option><option value="por">Portuguese (Português)</option><option value="chi_sim">Chinese (Simplified)</option><option value="jpn">Japanese</option><option value="ara">Arabic</option><option value="hin">Hindi</option></select>' +
      '<div class="opt-hint">OCR is executed 100% locally inside your browser via Tesseract.js. No scans are sent anywhere.</div></div>' +
      '</div>',
    repair:
      '<div class="opt-hint" style="font-size:13.5px;color:var(--slate)">' +
      '<i class="fa-solid fa-wrench" style="color:var(--amber)"></i> Repair mode will parse damaged cross-reference tables and synthesize fresh, standards-compliant page catalogs.' +
      '</div>',
    'pdf-to-jpg':
      '<div class="radio-cards">' +
      '<div class="radio-card"><input type="radio" name="jpg-q" id="jq-normal" value="normal" checked><label for="jq-normal"><span class="rc-title">Normal</span><span class="rc-sub">Good quality, small files</span></label></div>' +
      '<div class="radio-card"><input type="radio" name="jpg-q" id="jq-high" value="high"><label for="jq-high"><span class="rc-title">High</span><span class="rc-sub">Print-ready resolution</span></label></div>' +
      '</div>',
    'pdf-to-png':
      '<div class="radio-cards">' +
      '<div class="radio-card"><input type="radio" name="png-res" id="pr-std" value="150" checked><label for="pr-std"><span class="rc-title">Standard PNG (150 DPI)</span><span class="rc-sub">Clean web graphics</span></label></div>' +
      '<div class="radio-card"><input type="radio" name="png-res" id="pr-hi" value="300"><label for="pr-hi"><span class="rc-title">Ultra PNG (300 DPI)</span><span class="rc-sub">Lossless print quality</span></label></div>' +
      '</div>',
    'jpg-to-pdf':
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-pagesize">Page size</label><select id="opt-pagesize">' +
      '<option value="a4" selected>A4</option><option value="letter">US Letter</option><option value="fit">Fit to image</option></select></div>' +
      '<div class="opt-field"><label for="opt-orient">Orientation</label><select id="opt-orient">' +
      '<option value="portrait" selected>Portrait</option><option value="landscape">Landscape</option></select></div>' +
      '<div class="opt-field"><label for="opt-margin">Margin</label><select id="opt-margin">' +
      '<option value="none">No margin</option><option value="small" selected>Small</option><option value="big">Big</option></select></div>' +
      '</div>',
    'png-to-pdf':
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-pagesize">Page size</label><select id="opt-pagesize">' +
      '<option value="a4" selected>A4</option><option value="letter">US Letter</option><option value="fit">Fit to image</option></select></div>' +
      '<div class="opt-field"><label for="opt-orient">Orientation</label><select id="opt-orient">' +
      '<option value="portrait" selected>Portrait</option><option value="landscape">Landscape</option></select></div>' +
      '<div class="opt-field"><label for="opt-margin">Margin</label><select id="opt-margin">' +
      '<option value="none">No margin</option><option value="small" selected>Small</option><option value="big">Big</option></select></div>' +
      '</div>',
    'text-to-pdf':
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-text-size">Font size</label><select id="opt-text-size">' +
      '<option value="10">Small (10pt)</option><option value="11" selected>Standard (11pt)</option><option value="13">Medium (13pt)</option><option value="16">Large (16pt)</option></select></div>' +
      '</div>',
    'excel-to-pdf':
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-excel-orient">Orientation</label><select id="opt-excel-orient">' +
      '<option value="landscape" selected>Landscape (Best for tables)</option><option value="portrait">Portrait</option></select></div>' +
      '</div>',
    rotate:
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-angle">Rotation</label><select id="opt-angle">' +
      '<option value="90" selected>90° clockwise</option><option value="180">180°</option><option value="270">90° counter-clockwise</option></select></div>' +
      '<div class="opt-field"><label for="opt-scope">Apply to</label><select id="opt-scope">' +
      '<option value="all" selected>All pages</option><option value="pages">Specific pages</option></select></div>' +
      '<div class="opt-field" id="rotate-ranges-field" style="display:none"><label for="opt-ranges">Pages</label>' +
      '<input type="text" id="opt-ranges" placeholder="e.g. 1, 3-5"></div>' +
      '</div>',
    watermark:
      '<div class="options-grid">' +
      '<div class="opt-field" style="grid-column:1/-1"><label for="opt-text">Watermark text</label>' +
      '<input type="text" id="opt-text" placeholder="e.g. CONFIDENTIAL" value="CONFIDENTIAL"></div>' +
      '<div class="opt-field"><label for="opt-size">Font size</label><input type="number" id="opt-size" value="48" min="8" max="200"></div>' +
      '<div class="opt-field"><label for="opt-color">Colour</label><input type="color" id="opt-color" value="#dc2626"></div>' +
      '<div class="opt-field"><label for="opt-opacity">Opacity</label><select id="opt-opacity">' +
      '<option value="0.15">Subtle (15%)</option><option value="0.25" selected>Light (25%)</option>' +
      '<option value="0.5">Medium (50%)</option><option value="0.8">Strong (80%)</option></select></div>' +
      '<div class="opt-field"><label for="opt-wangle">Angle</label><select id="opt-wangle">' +
      '<option value="45" selected>Diagonal (45°)</option><option value="0">Horizontal</option><option value="90">Vertical</option></select></div>' +
      '</div>',
    'page-numbers':
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-position">Position</label><select id="opt-position">' +
      '<option value="bottom" selected>Bottom (footer)</option><option value="top">Top (header)</option></select></div>' +
      '<div class="opt-field"><label for="opt-align">Alignment</label><select id="opt-align">' +
      '<option value="center" selected>Centre</option><option value="left">Left</option><option value="right">Right</option></select></div>' +
      '<div class="opt-field"><label for="opt-format">Format</label><select id="opt-format">' +
      '<option value="n" selected>1, 2, 3…</option><option value="n_of_total">Page 1 of N</option></select></div>' +
      '</div>',
    edit:
      '<div class="options-grid">' +
      '<div class="opt-field" style="grid-column:1/-1"><label for="opt-edit-text">Annotation text</label>' +
      '<input type="text" id="opt-edit-text" placeholder="Enter text to stamp on document" value="Approved"></div>' +
      '<div class="opt-field"><label for="opt-edit-page">Page number</label><input type="number" id="opt-edit-page" value="1" min="1"></div>' +
      '<div class="opt-field"><label for="opt-edit-size">Font size</label><input type="number" id="opt-edit-size" value="18" min="8" max="72"></div>' +
      '<div class="opt-field"><label for="opt-edit-color">Color</label><input type="color" id="opt-edit-color" value="#4f46e5"></div>' +
      '<div class="opt-field"><label for="opt-edit-x">X position (pts)</label><input type="number" id="opt-edit-x" value="50"></div>' +
      '<div class="opt-field"><label for="opt-edit-y">Y position (pts)</label><input type="number" id="opt-edit-y" value="720"></div>' +
      '</div>',
    sign:
      '<div style="margin-bottom:16px">' +
      '<div class="radio-cards" style="margin-bottom:14px">' +
      '<div class="radio-card"><input type="radio" name="sig-mode" id="sm-draw" value="draw" checked><label for="sm-draw"><span class="rc-title"><i class="fa-solid fa-signature"></i> Draw Signature</span></label></div>' +
      '<div class="radio-card"><input type="radio" name="sig-mode" id="sm-type" value="type"><label for="sm-type"><span class="rc-title"><i class="fa-solid fa-font"></i> Type Name</span></label></div>' +
      '</div>' +
      '<div id="sig-draw-wrap" style="background:#f8fafc;border:2px dashed var(--line);border-radius:12px;padding:12px;text-align:center">' +
      '<canvas id="sig-pad" width="460" height="150" style="background:#fff;border-radius:8px;touch-action:none;cursor:crosshair;box-shadow:inset 0 1px 3px rgba(0,0,0,.08);max-width:100%"></canvas>' +
      '<div style="margin-top:8px;display:flex;justify-content:center;gap:10px">' +
      '<button type="button" class="btn btn-ghost" id="sig-clear-btn" style="padding:6px 14px;font-size:12.5px"><i class="fa-solid fa-rotate-left"></i> Clear signature</button>' +
      '</div></div>' +
      '<div id="sig-type-wrap" style="display:none">' +
      '<div class="opt-field"><label for="opt-sig-name">Type your full name</label><input type="text" id="opt-sig-name" placeholder="e.g. John Doe"></div>' +
      '</div>' +
      '<div class="options-grid" style="margin-top:16px">' +
      '<div class="opt-field"><label for="opt-sig-page">Sign on page</label><input type="number" id="opt-sig-page" value="1" min="1"></div>' +
      '<div class="opt-field"><label for="opt-sig-pos">Position</label><select id="opt-sig-pos"><option value="bottom-right" selected>Bottom Right</option><option value="bottom-left">Bottom Left</option><option value="center">Center</option></select></div>' +
      '<div class="opt-field" style="display:flex;align-items:center;padding-top:24px"><label class="opt-check"><input type="checkbox" id="opt-sig-date" checked> Include signature timestamp</label></div>' +
      '</div></div>',
    redact:
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-redact-page">Page number</label><input type="number" id="opt-redact-page" value="1" min="1"></div>' +
      '<div class="opt-field"><label for="opt-redact-preset">Redaction zone</label><select id="opt-redact-preset">' +
      '<option value="custom" selected>Specify coordinates</option><option value="header">Header area</option><option value="footer">Footer area</option></select></div>' +
      '<div class="opt-field"><label for="opt-redact-x">X position (pts)</label><input type="number" id="opt-redact-x" value="50"></div>' +
      '<div class="opt-field"><label for="opt-redact-y">Y position (pts)</label><input type="number" id="opt-redact-y" value="650"></div>' +
      '<div class="opt-field"><label for="opt-redact-w">Width (pts)</label><input type="number" id="opt-redact-w" value="300"></div>' +
      '<div class="opt-field"><label for="opt-redact-h">Height (pts)</label><input type="number" id="opt-redact-h" value="30"></div>' +
      '</div>',
    protect:
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-pass">Password</label><input type="password" id="opt-pass" placeholder="Enter secure password"></div>' +
      '<div class="opt-field"><label for="opt-pass-confirm">Confirm password</label><input type="password" id="opt-pass-confirm" placeholder="Confirm password"></div>' +
      '</div>',
    unlock:
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-unlock-pass">Document password</label><input type="password" id="opt-unlock-pass" placeholder="Enter password to unlock"></div>' +
      '</div>',
    metadata:
      '<div class="options-grid">' +
      '<div class="opt-field"><label for="opt-meta-title">Title</label><input type="text" id="opt-meta-title" placeholder="Document title"></div>' +
      '<div class="opt-field"><label for="opt-meta-author">Author</label><input type="text" id="opt-meta-author" placeholder="Author name"></div>' +
      '<div class="opt-field"><label for="opt-meta-subject">Subject</label><input type="text" id="opt-meta-subject" placeholder="Subject / topic"></div>' +
      '<div class="opt-field"><label for="opt-meta-keywords">Keywords</label><input type="text" id="opt-meta-keywords" placeholder="keyword1, keyword2"></div>' +
      '</div>',
    'scan-to-pdf':
      '<div style="text-align:center;padding:10px 0">' +
      '<div id="camera-box" style="display:none;background:#000;border-radius:14px;overflow:hidden;max-width:480px;margin:0 auto 16px;position:relative">' +
      '<video id="camera-feed" autoplay playsinline style="width:100%;display:block"></video>' +
      '<button type="button" id="snap-btn" class="btn btn-primary" style="position:absolute;bottom:14px;left:50%;transform:translateX(-50%);box-shadow:0 4px 14px rgba(0,0,0,.5)"><i class="fa-solid fa-camera"></i> Snap page</button>' +
      '</div>' +
      '<button type="button" class="btn btn-primary btn-lg" id="open-cam-btn"><i class="fa-solid fa-video"></i> Start Document Scanner</button>' +
      '<div class="opt-hint" style="margin-top:10px">Point your webcam or mobile camera at your document pages to capture them instantly.</div>' +
      '</div>',
    'ai-summarize':
      '<div class="opt-hint" style="font-size:13.5px;color:var(--slate)">' +
      '<i class="fa-solid fa-sparkles" style="color:var(--accent)"></i> The AI Summarizer will extract document text, compute reading metrics, and generate an executive summary with key takeaways — 100% locally and privately.' +
      '</div>'
  };

  if (OPTION_TEMPLATES[tool.id]) {
    optionsBody.innerHTML = OPTION_TEMPLATES[tool.id];
  }

  // Setup signature canvas if sign tool
  if (tool.id === 'sign') {
    initSignaturePad();
  }

  // Setup camera scanner if scan-to-pdf
  if (tool.id === 'scan-to-pdf') {
    initCameraScanner();
  }

  function initSignaturePad() {
    sigCanvas = document.getElementById('sig-pad');
    if (!sigCanvas) return;
    sigCtx = sigCanvas.getContext('2d');
    sigCtx.lineWidth = 2.5;
    sigCtx.lineCap = 'round';
    sigCtx.strokeStyle = '#0f172a';

    function getCoords(e) {
      var rect = sigCanvas.getBoundingClientRect();
      var cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      var cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      return { x: cx * (sigCanvas.width / rect.width), y: cy * (sigCanvas.height / rect.height) };
    }

    function startDraw(e) {
      e.preventDefault();
      isDrawingSig = true;
      var c = getCoords(e);
      sigCtx.beginPath();
      sigCtx.moveTo(c.x, c.y);
    }
    function draw(e) {
      if (!isDrawingSig) return;
      e.preventDefault();
      var c = getCoords(e);
      sigCtx.lineTo(c.x, c.y);
      sigCtx.stroke();
    }
    function endDraw() { isDrawingSig = false; }

    sigCanvas.addEventListener('mousedown', startDraw);
    sigCanvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', endDraw);
    sigCanvas.addEventListener('touchstart', startDraw, { passive: false });
    sigCanvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', endDraw);

    var clearBtn = document.getElementById('sig-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      });
    }

    // Toggle signature modes (draw vs type)
    optionsBody.addEventListener('change', function (e) {
      if (e.target.name === 'sig-mode') {
        var isDraw = e.target.value === 'draw';
        document.getElementById('sig-draw-wrap').style.display = isDraw ? 'block' : 'none';
        document.getElementById('sig-type-wrap').style.display = isDraw ? 'none' : 'block';
      }
    });
  }

  function initCameraScanner() {
    var openBtn = document.getElementById('open-cam-btn');
    var cameraBox = document.getElementById('camera-box');
    var video = document.getElementById('camera-feed');
    var snapBtn = document.getElementById('snap-btn');

    if (!openBtn || !video || !snapBtn) return;

    openBtn.addEventListener('click', async function () {
      try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = cameraStream;
        cameraBox.style.display = 'block';
        openBtn.style.display = 'none';
      } catch (err) {
        showError('Camera access denied or unavailable: ' + err.message);
      }
    });

    snapBtn.addEventListener('click', function () {
      var c = document.createElement('canvas');
      c.width = video.videoWidth || 1280;
      c.height = video.videoHeight || 720;
      var ctx = c.getContext('2d');
      ctx.drawImage(video, 0, 0, c.width, c.height);
      c.toBlob(function (blob) {
        var file = new File([blob], 'scan-page-' + (selectedFiles.length + 1) + '.jpg', { type: 'image/jpeg' });
        addFiles([file]);
      }, 'image/jpeg', 0.9);
    });
  }

  // Conditional fields
  optionsBody.addEventListener('change', function (e) {
    if (tool.id === 'rotate' && e.target.id === 'opt-scope') {
      document.getElementById('rotate-ranges-field').style.display =
        e.target.value === 'pages' ? 'block' : 'none';
    }
    if (tool.id === 'split' && e.target.name === 'split-mode') {
      document.getElementById('split-ranges-field').style.display =
        e.target.value === 'every' ? 'none' : 'block';
    }
  });

  function val(id, fallback) {
    var el = document.getElementById(id);
    return el ? el.value : fallback;
  }
  function radioVal(name, fallback) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : fallback;
  }

  function collectOptions() {
    switch (tool.id) {
      case 'split': return { mode: radioVal('split-mode', 'ranges'), ranges: val('opt-ranges', '') };
      case 'extract':
      case 'remove': return { ranges: val('opt-ranges', '') };
      case 'crop': return { margin: val('opt-crop-margin', '36') };
      case 'compress': return { level: radioVal('c-level', 'recommended') };
      case 'ocr': return { lang: val('opt-ocr-lang', 'eng') };
      case 'pdf-to-jpg': return { quality: radioVal('jpg-q', 'normal') };
      case 'pdf-to-png': return { scale: radioVal('png-res', '150') };
      case 'jpg-to-pdf':
      case 'png-to-pdf':
        return { pageSize: val('opt-pagesize', 'a4'), orientation: val('opt-orient', 'portrait'), margin: val('opt-margin', 'small') };
      case 'text-to-pdf': return { fontSize: val('opt-text-size', '11') };
      case 'excel-to-pdf': return { orientation: val('opt-excel-orient', 'landscape') };
      case 'rotate': return { angle: val('opt-angle', '90'), scope: val('opt-scope', 'all'), ranges: val('opt-ranges', '') };
      case 'watermark': return { text: val('opt-text', ''), size: val('opt-size', '48'), color: val('opt-color', '#dc2626'), opacity: val('opt-opacity', '0.25'), angle: val('opt-wangle', '45') };
      case 'page-numbers': return { position: val('opt-position', 'bottom'), align: val('opt-align', 'center'), format: val('opt-format', 'n') };
      case 'organize': return { pages: organizePages };
      case 'edit':
        return {
          text: val('opt-edit-text', ''),
          page: val('opt-edit-page', '1'),
          size: val('opt-edit-size', '18'),
          color: val('opt-edit-color', '#4f46e5'),
          x: val('opt-edit-x', '50'),
          y: val('opt-edit-y', '720')
        };
      case 'sign':
        var sigMode = radioVal('sig-mode', 'draw');
        var dataUrl = (sigMode === 'draw' && sigCanvas) ? sigCanvas.toDataURL('image/png') : null;
        var typed = (sigMode === 'type') ? val('opt-sig-name', '') : null;
        var pos = val('opt-sig-pos', 'bottom-right');
        var addDate = document.getElementById('opt-sig-date') ? document.getElementById('opt-sig-date').checked : true;
        return {
          sigDataUrl: dataUrl,
          typedSig: typed,
          page: val('opt-sig-page', '1'),
          pos: pos,
          addDate: addDate
        };
      case 'redact':
        return {
          page: val('opt-redact-page', '1'),
          x: val('opt-redact-x', '50'),
          y: val('opt-redact-y', '650'),
          width: val('opt-redact-w', '300'),
          height: val('opt-redact-h', '30')
        };
      case 'protect':
        var p1 = val('opt-pass', '');
        var p2 = val('opt-pass-confirm', '');
        if (p1 && p2 && p1 !== p2) throw new Error('Passwords do not match. Please re-enter.');
        return { password: p1 };
      case 'unlock': return { password: val('opt-unlock-pass', '') };
      case 'metadata':
        return {
          title: val('opt-meta-title', ''),
          author: val('opt-meta-author', ''),
          subject: val('opt-meta-subject', ''),
          keywords: val('opt-meta-keywords', '')
        };
      default: return {};
    }
  }

  // ---- Organize thumbnails ----
  async function buildOrganizeThumbs() {
    thumbsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--slate)"><i class="fa-solid fa-spinner fa-spin"></i> Rendering page previews…</p>';
    try {
      pdfjsDocCache = await PDFEngine.loadPdfJsDoc(selectedFiles[0]);
    } catch (err) {
      thumbsGrid.innerHTML = '';
      showError(err.message);
      return;
    }
    organizePages = [];
    for (var i = 0; i < pdfjsDocCache.numPages; i++) organizePages.push({ index: i, rotation: 0, deleted: false });
    thumbsGrid.innerHTML = '';

    for (var p = 0; p < pdfjsDocCache.numPages; p++) {
      var card = document.createElement('div');
      card.className = 'thumb-card';
      card.setAttribute('data-pos', p);
      card.innerHTML =
        '<canvas></canvas>' +
        '<div class="thumb-label">Page ' + (p + 1) + '</div>' +
        '<div class="thumb-tools">' +
        '<button type="button" data-act="left" title="Move left" aria-label="Move left"><i class="fa-solid fa-arrow-left"></i></button>' +
        '<button type="button" data-act="rot" title="Rotate 90°" aria-label="Rotate"><i class="fa-solid fa-rotate-right"></i></button>' +
        '<button type="button" class="t-del" data-act="del" title="Remove page" aria-label="Remove page"><i class="fa-solid fa-trash-can"></i></button>' +
        '<button type="button" data-act="right" title="Move right" aria-label="Move right"><i class="fa-solid fa-arrow-right"></i></button>' +
        '</div>';
      thumbsGrid.appendChild(card);

      var page = await pdfjsDocCache.getPage(p + 1);
      var viewport = page.getViewport({ scale: 0.35 });
      var canvas = card.querySelector('canvas');
      canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;
    }
  }

  thumbsGrid.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var card = btn.closest('.thumb-card');
    var pos = Array.prototype.indexOf.call(thumbsGrid.children, card);
    var act = btn.getAttribute('data-act');
    if (act === 'del') {
      organizePages[pos].deleted = !organizePages[pos].deleted;
      card.classList.toggle('deleted', organizePages[pos].deleted);
    } else if (act === 'rot') {
      organizePages[pos].rotation = (organizePages[pos].rotation + 90) % 360;
      var cv = card.querySelector('canvas');
      cv.style.transform = 'rotate(' + organizePages[pos].rotation + 'deg)';
      cv.style.transition = 'transform .2s';
      cv.style.maxHeight = '160px';
      cv.style.margin = '0 auto';
    } else if (act === 'left' || act === 'right') {
      var to = act === 'left' ? pos - 1 : pos + 1;
      if (to < 0 || to >= organizePages.length) return;
      var tmp = organizePages[pos]; organizePages[pos] = organizePages[to]; organizePages[to] = tmp;
      var ref = act === 'left' ? thumbsGrid.children[to] : thumbsGrid.children[to].nextSibling;
      thumbsGrid.insertBefore(card, ref);
    }
  });

  // ---- Processing ----
  function setProgress(pct, label) {
    progressFill.style.width = Math.min(100, Math.max(0, pct)) + '%';
    if (label) progressLabel.textContent = label;
  }

  function showError(msg) {
    errorText.textContent = msg;
    errorBanner.classList.add('active');
  }
  function hideError() { errorBanner.classList.remove('active'); }

  processBtn.addEventListener('click', async function () {
    hideError();
    resultPanel.classList.remove('active');
    var handler = PDFEngine[tool.id];
    if (!handler) { showError('This tool is not available yet.'); return; }

    processBtn.disabled = true;
    progressWrap.classList.add('active');
    setProgress(4, 'Preparing…');

    try {
      var options = collectOptions();
      var result = await handler(selectedFiles, options, setProgress);
      setProgress(100, 'Done!');
      showResult(result);
    } catch (err) {
      showError(err && err.message ? err.message : 'Something went wrong while processing your file.');
    } finally {
      processBtn.disabled = false;
      setTimeout(function () {
        progressWrap.classList.remove('active');
        setProgress(0, '');
      }, 600);
    }
  });

  function showResult(result) {
    objectUrls.forEach(function (u) { URL.revokeObjectURL(u); });
    objectUrls = [];

    resultSub.textContent = result.note || 'Processed privately on your device — nothing was uploaded.';
    resultDownloads.innerHTML = '';
    result.files.forEach(function (f) {
      var url = URL.createObjectURL(f.blob);
      objectUrls.push(url);
      var a = document.createElement('a');
      a.className = 'dl-row';
      a.href = url;
      a.download = f.name;
      a.innerHTML = '<i class="fa-solid fa-download" style="color:var(--primary)"></i>' +
        '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escapeHtml(f.name) + '</span>' +
        '<span class="dl-size">' + PDFEngine.formatSize(f.blob.size) + '</span>';
      resultDownloads.appendChild(a);
    });
    resultPanel.classList.add('active');
    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (result.files.length === 1) {
      resultDownloads.querySelector('a').click();
    }
  }

  resultAgain.addEventListener('click', function () {
    selectedFiles = [];
    organizePages = [];
    thumbsGrid.innerHTML = '';
    resultPanel.classList.remove('active');
    hideError();
    refreshUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Inject Dynamic On-Page SEO Section
  renderToolSeoSection(tool);

  function renderToolSeoSection(t) {
    var seoContainer = document.getElementById('tool-seo-section');
    if (!seoContainer) return;

    var howToItems = (t.howTo || [
      'Select and upload your file into the workspace.',
      'Adjust tool-specific settings and preferences.',
      'Click the action button to process and download your file instantly.'
    ]).map(function (step, idx) {
      return '<div class="step-card"><div class="step-num">' + (idx + 1) + '</div><p style="font-weight:600;margin-top:6px">' + step + '</p></div>';
    }).join('');

    var featureItems = (t.features || [
      '100% Client-side and in-browser processing',
      'Zero server file uploads or data storage',
      'Unlimited free usage without registration',
      'Preserves original quality and formatting'
    ]).map(function (f) {
      return '<div class="feature-card" style="padding:22px"><div class="f-icon" style="width:40px;height:40px;font-size:16px"><i class="fa-solid fa-check"></i></div><h3>' + f + '</h3></div>';
    }).join('');

    seoContainer.innerHTML =
      '<div class="container" style="max-width:960px;margin-top:40px">' +
      '<div class="section-head" style="margin-bottom:32px">' +
      '<span class="eyebrow">User Guide</span>' +
      '<h2>How to ' + escapeHtml(t.name) + ' online</h2>' +
      '<p>Follow these quick, easy steps to ' + escapeHtml(t.name.toLowerCase()) + ' securely in seconds.</p>' +
      '</div>' +
      '<div class="steps-grid" style="margin-bottom:50px">' + howToItems + '</div>' +
      '<div class="section-head" style="margin-bottom:32px">' +
      '<span class="eyebrow">Why Choose PDFNova</span>' +
      '<h2>Key benefits of our ' + escapeHtml(t.name) + ' tool</h2>' +
      '</div>' +
      '<div class="features-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin-bottom:50px">' + featureItems + '</div>' +
      '</div>';
  }

  refreshUI();
})();
