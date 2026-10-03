from pathlib import Path
import re


def extract_text_from_pdf(file_path: str):
    """Placeholder parser for PDF resume text extraction."""
    return {
        "file_path": file_path,
        "status": "not_implemented",
        "text": "",
    }


def normalize_text(raw_text: str) -> str:
    text = raw_text.replace("\r", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()
