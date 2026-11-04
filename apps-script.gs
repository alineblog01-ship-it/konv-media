// Konv.media — recebe os leads do formulário e grava na aba "Konv"
// Cole aqui o ID da planilha (o trecho da URL entre /d/ e /edit)
const SPREADSHEET_ID = 'COLE_O_ID_DA_PLANILHA_AQUI';
const SHEET_NAME = 'Konv';
const FIELDS = ['data', 'nome', 'empresa', 'email', 'whatsapp', 'site', 'units', 'objetivo', 'faturamento', 'origem'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(FIELDS);
    const p = (e && e.parameter) || {};
    sheet.appendRow(FIELDS.map(f => p[f] || ''));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
