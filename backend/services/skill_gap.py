from typing import List, Dict

ROLE_SKILL_MAP: Dict[str, set[str]] = {
    "software engineer": {
        "python", "javascript", "typescript", "react", "node", "sql", "postgresql",
        "fastapi", "rest", "api", "docker", "git", "aws", "system design",
        "backend", "frontend", "full stack", "data structures", "algorithms"
    },
    "data scientist": {
        "python", "sql", "pandas", "numpy", "machine learning", "deep learning",
        "nlp", "pytorch", "tensorflow", "data analysis", "statistics", "ai", "ml"
    },
    "frontend developer": {
        "javascript", "typescript", "react", "html", "css", "tailwind", "figma",
        "api", "rest", "frontend", "ui", "ux"
    },
    "backend developer": {
        "python", "node", "sql", "postgresql", "redis", "docker", "api", "rest",
        "fastapi", "backend", "system design", "aws"
    },
    "product manager": {
        "product strategy", "sql", "analytics", "roadmap", "stakeholder management",
        "market research", "communication", "project management"
    },
}


def normalize_skill(skill: str) -> str:
    return skill.strip().lower()


def analyze_skill_gap(resume_skills: List[str], target_role: str) -> Dict[str, object]:
    norm_resume = {normalize_skill(skill) for skill in resume_skills if skill and skill.strip()}
    role_key = normalize_skill(target_role)
    required_skills = ROLE_SKILL_MAP.get(role_key, ROLE_SKILL_MAP["software engineer"])

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
