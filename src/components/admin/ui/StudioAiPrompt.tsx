"use client";

import { useRef } from "react";
import { ArrowUp, Paperclip, Sparkles, X } from "lucide-react";
import { clsx } from "clsx";
import { UPLOAD_ACCEPT } from "@/lib/cms/extract-upload-text";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  provider: "openai" | "anthropic";
  onProviderChange: (provider: "openai" | "anthropic") => void;
  files: File[];
  onFilesChange: (files: File[]) => void;
  placeholder?: string;
};

const PROVIDER_LABEL: Record<"openai" | "anthropic", string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
};

export function StudioAiPrompt({
  value,
  onChange,
  onSubmit,
  loading,
  provider,
  onProviderChange,
  files,
  onFilesChange,
  placeholder = "Describe what to change on this page…",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && (value.trim() || files.length > 0)) onSubmit();
    }
  }

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;
    onFilesChange([...files, ...picked].slice(0, 5));
    e.target.value = "";
  }

  function removeFile(index: number) {
    onFilesChange(files.filter((_, i) => i !== index));
  }

  const canSubmit = !loading && (value.trim().length > 0 || files.length > 0);

  return (
    <div className="studio-ai-prompt">
      {files.length > 0 ? (
        <div className="studio-ai-prompt__files">
          {files.map((file, i) => (
            <span key={`${file.name}-${i}`} className="studio-ai-prompt__file-chip">
              <Paperclip className="h-3 w-3 shrink-0" aria-hidden />
              <span className="max-w-[8rem] truncate">{file.name}</span>
              <button
                type="button"
                className="studio-ai-prompt__file-remove"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(i)}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        placeholder={placeholder}
        disabled={loading}
        className="studio-ai-prompt__input"
        aria-label="AI prompt"
      />
      <div className="studio-ai-prompt__toolbar">
        <div className="flex items-center gap-1">
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={UPLOAD_ACCEPT}
            className="sr-only"
            onChange={onPickFiles}
            disabled={loading || files.length >= 5}
          />
          <button
            type="button"
            disabled={loading || files.length >= 5}
            aria-label="Attach PDF, Word, or Excel files"
            title="Attach files (PDF, DOCX, Excel, CSV, TXT)"
            onClick={() => inputRef.current?.click()}
            className="studio-ai-prompt__attach"
          >
            <PlusIcon />
          </button>
          <select
            value={provider}
            onChange={(e) => onProviderChange(e.target.value as "openai" | "anthropic")}
            disabled={loading}
            className="h-8 max-w-[9rem] rounded-lg border-0 bg-transparent pl-1 text-xs font-semibold text-[var(--studio-muted)] outline-none"
            aria-label="AI provider"
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--studio-muted)]">{PROVIDER_LABEL[provider]}</span>
          <Sparkles className="h-4 w-4 text-[var(--studio-muted)]" aria-hidden />
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            aria-label="Send prompt"
            className={clsx(
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
              canSubmit
                ? "bg-[var(--studio-ink)] text-white hover:opacity-90"
                : "bg-[var(--studio-border)] text-[var(--studio-muted)]",
            )}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
