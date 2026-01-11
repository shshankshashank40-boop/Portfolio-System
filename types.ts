
export interface Project {
  title: string;
  problem: string;
  solution: string;
  tech: string[];
  outcome: string;
  link?: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface Certification {
  name: string;
  org: string;
  year: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  status: string;
  score?: string;
}
