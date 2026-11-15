import re
from typing import Dict, List

ROLE_SKILL_MAP: Dict[str, set[str]] = {
    "software engineer": {
        "python", "javascript", "typescript", "react", "node", "sql", "postgresql",
        "fastapi", "rest", "api", "docker", "git", "aws", "system design",
        "backend", "frontend", "full stack", "data structures", "algorithms",
    },
    "data scientist": {
        "python", "sql", "pandas", "numpy", "machine learning", "deep learning",
        "nlp", "pytorch", "tensorflow", "data analysis", "statistics", "ai", "ml",
    },
    "data analyst": {
        "sql", "python", "excel", "statistics", "data analysis", "pandas", "numpy",
        "tableau", "power bi", "data visualization", "business intelligence",
    },
    "machine learning engineer": {
        "python", "machine learning", "deep learning", "pytorch", "tensorflow",
        "scikit-learn", "mlops", "docker", "aws", "model deployment", "statistics",
    },
    "ai engineer": {
        "python", "machine learning", "deep learning", "nlp", "llm", "generative ai",
        "pytorch", "tensorflow", "api", "docker", "vector databases",
    },
    "frontend developer": {
        "javascript", "typescript", "react", "html", "css", "tailwind", "figma",
        "api", "rest", "frontend", "ui", "ux",
    },
    "backend developer": {
        "python", "node", "sql", "postgresql", "redis", "docker", "api", "rest",
        "fastapi", "backend", "system design", "aws",
    },
    "devops engineer": {
        "linux", "docker", "kubernetes", "aws", "azure", "terraform", "ci/cd",
        "jenkins", "git", "python", "monitoring", "networking",
    },
    "qa engineer": {
        "testing", "test automation", "selenium", "cypress", "playwright", "api testing",
        "python", "javascript", "sql", "pytest", "quality assurance",
    },
    "product manager": {
        "product strategy", "sql", "analytics", "roadmap", "stakeholder management",
        "market research", "communication", "project management",
    },
}

ROLE_ALIASES = {
    "software developer": "software engineer",
    "software engineering": "software engineer",
    "full stack developer": "software engineer",
    "full-stack developer": "software engineer",
    "data science": "data scientist",
    "ml engineer": "machine learning engineer",
    "machine learning developer": "machine learning engineer",
    "artificial intelligence engineer": "ai engineer",
    "ai developer": "ai engineer",
    "front end developer": "frontend developer",
    "frontend engineer": "frontend developer",
    "back end developer": "backend developer",
    "backend engineer": "backend developer",
    "devops": "devops engineer",
    "quality assurance engineer": "qa engineer",
    "test engineer": "qa engineer",
    "product owner": "product manager",
}


def normalize_skill(skill: str) -> str:
    return re.sub(r"\s+", " ", skill.strip().lower())


def resolve_target_role(target_role: str) -> str | None:
    role_key = normalize_skill(target_role)
    role_key = ROLE_ALIASES.get(role_key, role_key)
    return role_key if role_key in ROLE_SKILL_MAP else None


def analyze_skill_gap(resume_skills: List[str], target_role: str) -> Dict[str, object]:
    role_key = resolve_target_role(target_role)
    if role_key is None:
        raise ValueError(
            f"Unsupported target role '{target_role}'. Supported roles: "
            + ", ".join(sorted(ROLE_SKILL_MAP))
        )

    norm_resume = {normalize_skill(skill) for skill in resume_skills if skill and skill.strip()}
    required_skills = ROLE_SKILL_MAP[role_key]
    matched = sorted(norm_resume.intersection(required_skills))
    missing = sorted(required_skills.difference(norm_resume))
    match_score = round((len(matched) / len(required_skills)) * 100, 1) if required_skills else 0

    recommendations = [
        f"Focus on strengthening {skill} for the {target_role} role." for skill in missing[:4]
    ]
    if not recommendations:
        recommendations = [
            f"Your profile already aligns strongly with the {target_role} role. Keep refining your practical projects and interview storytelling."
        ]

    return {
        "target_role": target_role,
        "match_score": match_score,
        "matched_skills": matched,
        "missing_skills": missing[:8],
        "recommendations": recommendations,
        "summary": (
            f"You match {len(matched)} out of {len(required_skills)} core skills for {target_role}. "
            f"Your current profile is at {match_score}% alignment."
        ),
    }
