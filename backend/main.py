from pathlib import Path
import re
from typing import List

from pypdf import PdfReader

from services.skill_gap import ROLE_SKILL_MAP


def extract_text_from_pdf(file_path: str) -> str:
    """Extract raw text from a PDF file."""
    try:
        reader = PdfReader(file_path)
        pages = []
        for page in reader.pages:
            text = page.extract_text() or ""
            if text.strip():
                pages.append(text)
        return "\n".join(pages)
    except Exception:
        return ""


def normalize_text(raw_text: str) -> str:
    if not raw_text:
        return ""
    cleaned = raw_text.replace("\r", " ").replace("\u00a0", " ")
    cleaned = re.sub(r"\s+", " ", cleaned)
    return cleaned.strip()


def _extract_email(text: str) -> str:
    match = re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text)
    return match.group(0) if match else ""


def _extract_phone(text: str) -> str:
    match = re.search(r"(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})", text)
    return match.group(0) if match else ""


def _extract_name(text: str) -> str:
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    for line in lines[:10]:
        cleaned = normalize_text(line)
        if not cleaned:
            continue
        if len(cleaned) > 60:
            continue
        if re.search(r"@|\d{10,}|\b(?:gmail|outlook|yahoo)\b", cleaned, re.IGNORECASE):
            continue
        if re.search(r"[A-Za-z]", cleaned):
            return cleaned
    return "Unknown"


def _extract_education(text: str) -> List[str]:
    keywords = [
        "bachelor", "master", "phd", "diploma", "degree", "engineering",
        "university", "college", "school", "b.tech", "m.tech", "bsc", "msc"
    ]
    matches = []
    for line in text.split("\n"):
        cleaned = normalize_text(line)
        if not cleaned:
            continue
        lowered = cleaned.lower()
        if any(keyword in lowered for keyword in keywords):
            matches.append(cleaned)
    return matches[:5]


def _extract_skills(text: str) -> List[str]:
    all_skills = sorted(
        {skill.lower() for role_skills in ROLE_SKILL_MAP.values() for skill in role_skills},
        key=len,
        reverse=True,
    )
    text_lower = text.lower()
    found = []
    for skill in all_skills:
        pattern = re.escape(skill)
        if re.search(rf"(?<![a-z0-9]){pattern}(?![a-z0-9])", text_lower):
            found.append(skill)
    return found[:12]


def extract_resume_data(file_path: str):
    """Extract resume data from PDF and return normalized structure."""
    raw_text = extract_text_from_pdf(file_path)
    if not raw_text:
        return {
            "success": True,
            "text": "",
            "file_path": file_path,
            "name": "Unknown",
            "email": "",
            "phone": "",
            "skills": [],
            "education": [],
            "experience": [],
            "summary": "",
        }

    text = normalize_text(raw_text)
    email = _extract_email(text)
    phone = _extract_phone(text)
    name = _extract_name(text)
    skills = _extract_skills(text)
    education = _extract_education(text)
    summary = text[:400]

    return {
        "success": True,
        "text": text,
        "file_path": file_path,
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "education": education,
        "experience": [],
        "summary": summary,
    }
