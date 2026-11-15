import re
from typing import List

from pypdf import PdfReader

from services.skill_gap import ROLE_SKILL_MAP


def extract_text_from_pdf(file_path: str) -> str:
    """Extract selectable text from each page of a PDF."""
    reader = PdfReader(file_path)
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def normalize_text(raw_text: str) -> str:
    if not raw_text:
        return ""
    text = raw_text.replace("\r", " ").replace("\u00a0", " ")
    return re.sub(r"[ \t]+", " ", text).strip()


def _extract_email(text: str) -> str:
    match = re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text)
    return match.group(0) if match else ""


def _extract_phone(text: str) -> str:
    match = re.search(r"(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})", text)
    return match.group(0) if match else ""


def _extract_name(text: str) -> str:
    for line in (line.strip() for line in text.splitlines() if line.strip()):
        if len(line) <= 60 and not re.search(r"@|\d{10,}", line) and re.search(r"[A-Za-z]", line):
            return line
    return "Unknown"


def _extract_education(text: str) -> List[str]:
    keywords = ("bachelor", "master", "phd", "diploma", "degree", "engineering", "university", "college", "school", "b.tech", "m.tech", "bsc", "msc")
    results = []
    for line in text.splitlines():
        line = line.strip()
        if line and any(keyword in line.lower() for keyword in keywords):
            results.append(line)
    return results[:5]


def _extract_skills(text: str) -> List[str]:
    skills = sorted({skill.lower() for role_skills in ROLE_SKILL_MAP.values() for skill in role_skills}, key=len, reverse=True)
    found = []
    for skill in skills:
        if re.search(rf"(?<![a-z0-9]){re.escape(skill)}(?![a-z0-9])", text, re.IGNORECASE):
            found.append(skill)
    return found[:12]


def extract_resume_data(file_path: str):
    """Extract selectable PDF text and basic resume fields."""
    raw_text = extract_text_from_pdf(file_path)
    text = normalize_text(raw_text)
    return {
        "success": True,
        "text": text,
        "file_path": file_path,
        "name": _extract_name(raw_text) if raw_text else "Unknown",
        "email": _extract_email(text),
        "phone": _extract_phone(text),
        "skills": _extract_skills(text),
        "education": _extract_education(raw_text),
        "experience": [],
        "summary": text[:400],
    }
