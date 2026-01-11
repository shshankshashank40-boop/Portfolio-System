
import { Project, SkillCategory, Certification, Education } from './types';

export const CONFIG = {
  profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&h=800&fit=crop", // Professional placeholder
  resumeUrl: "#", 
  name: "Shashank K M",
  email: "shshankshashank40@gmail.com",
  phone: "+91 8660856374",
  linkedin: "https://www.linkedin.com/in/shashashank-k-m-a3473431a",
  github: "https://github.com/shshankshashank40-boop"
};

export const PROJECTS: Project[] = [
  {
    title: "AI-Powered Smart GYM Management",
    problem: "Saving Time and AI acts as alternate to Trainers.",
    solution: "Developed a computer vision system using MERN stack to Build an efficient system",
    tech: ["MERN", "HTML, CSS, JS", "ATLAS", "FastAPI"],
    outcome: "Simulated results showed an Reliable AI Interaction.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Internals Management System",
    problem: "Manual tracking of internal assessments leading to errors and delays.",
    solution: "Built a peer-to-peer System to Store all Exam Related Docx and Plans all Examinations Requirements.",
    tech: ["HTML", "Python", "Flask", "SQL"],
    outcome: "Achieved 99.9% System Perfomance.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" // A clean, professional dashboard/management style image
  },
  {
    title: "Sanchari Travels - Online Tour Booking",
    problem: "Fragmented tour booking experience for local Indian tourism.",
    solution: "Architected 'Sanchari Travels', a modern web platform to explore and book unforgettable adventures across India with a seamless UI.",
    tech: ["HTML", "CSS", "JAVASCRIPT", "VERCEL"],
    outcome: "Successfully tested with 50+ concurrent booking sessions.",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=800" // Sanchari Travels mountain landscape matching the screenshot
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: ["Java", "C", "Python", "JavaScript", "HTML", "SQL"]
  },
  {
    title: "Core CS Fundamentals",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems", "Computer Networks"]
  },
  {
    title: "Tools & Technologies",
    items: ["React.js", "Node.js", "Docker", "Git & GitHub", "Gen AI"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Microsoft Azure AI Essentials Professional Certificate",
    org: "Microsoft and LinkedIn",
    year: "2025"
  },
  {
    name: "Generative AI in HR - Impact and Application of Gen AI",
    org: "Coursera",
    year: "2025"
  },
  {
    name: "Website Development Tutorial",
    org: "Infosys Springboard",
    year: "2025"
  },
  {
    name: "Cloud Computing",
    org: "NPTEL Online Certification",
    year: "2025"
  },
  {
    name: "Javascript Training",
    org: "eduPyramids",
    year: "2025"
  },
  {
    name: "Web Development Intern",
    org: "Unified Mentors",
    year: "2024"
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Navkis College of Engineering, Hassan",
    period: "2024 - 2027",
    status: "3rd Year (Current)",
    score: "CGPA: 8.2/10"
  },
  {
    degree: "Higher Secondary Education (Science)",
    institution: "Sri BGS PU College, Hassan",
    period: "2021 - 2023",
    status: "Completed",
    score: "Percentage: 92%"
  }
];
