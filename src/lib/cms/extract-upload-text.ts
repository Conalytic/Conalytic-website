/**
 * Extract plain text from analyst uploads (PDF, Office, CSV, etc.) for the CMS agent.
 */

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 5;
const MAX_EXTRACTED_CHARS = 80_000;

const ALLOWED_EXT = new Set([
  "pdf",
  "docx",
  "xlsx",
  "xls",
  "csv",
  "txt",
  "md",
  "json",
  "rtf",
]);

export type ExtractedUpload = {
  name: string;
  type: string;
  text: string;
};

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

async function extractPdf(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const result = await parser.getText();
    return result.text ?? "";
  } finally {
    await parser.destroy();
  }
}

async function extractDocx(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return result.value ?? "";
}

async function extractExcel(buffer: Buffer): Promise<string> {
  const XLSX = await import("xlsx");
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const parts: string[] = [];
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) continue;
    const csv = XLSX.utils.sheet_to_csv(sheet);
    if (csv.trim()) parts.push(`--- Sheet: ${sheetName} ---\n${csv}`);
  }
  return parts.join("\n\n");
}

export async function extractTextFromUpload(file: File): Promise<ExtractedUpload> {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`"${file.name}" is too large (max ${MAX_FILE_BYTES / 1024 / 1024}MB).`);
  }

  const ext = extOf(file.name);
  if (!ALLOWED_EXT.has(ext)) {
    throw new Error(
      `"${file.name}" is not supported. Use PDF, DOCX, Excel, CSV, TXT, or Markdown.`,
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let text = "";

  switch (ext) {
    case "pdf":
      text = await extractPdf(buffer);
      break;
    case "docx":
      text = await extractDocx(buffer);
      break;
    case "xlsx":
    case "xls":
      text = await extractExcel(buffer);
      break;
    default:
      text = buffer.toString("utf8");
  }

  return {
    name: file.name,
    type: file.type || ext,
    text: text.replace(/\0/g, "").trim(),
  };
}

export async function extractTextFromUploads(files: File[]): Promise<ExtractedUpload[]> {
  if (files.length > MAX_FILES) {
    throw new Error(`You can attach up to ${MAX_FILES} files at a time.`);
  }

  const results: ExtractedUpload[] = [];
  let totalChars = 0;

  for (const file of files) {
    const extracted = await extractTextFromUpload(file);
    if (!extracted.text) {
      throw new Error(`Could not read any text from "${file.name}".`);
    }
    totalChars += extracted.text.length;
    if (totalChars > MAX_EXTRACTED_CHARS) {
      throw new Error("Attached files contain too much text. Remove a file or use a shorter document.");
    }
    results.push(extracted);
  }

  return results;
}

export function formatUploadsForPrompt(uploads: ExtractedUpload[]): string {
  if (uploads.length === 0) return "";
  return uploads
    .map(
      (u, i) =>
        `### Attachment ${i + 1}: ${u.name}\n${u.text.slice(0, 24_000)}${u.text.length > 24_000 ? "\n…[truncated]" : ""}`,
    )
    .join("\n\n");
}

export const UPLOAD_ACCEPT =
  ".pdf,.docx,.xlsx,.xls,.csv,.txt,.md,.json,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,text/csv";
