import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import SectionHeadings from "./SectionHeadings";

export function Experience() {
  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      skills: [
        "Adobe Commerce (Magento)",
        "React.js & Next.js",
        "Redux & Context API",
        "Tailwind CSS",
        "React Native for mobile apps (Expo)",
      ],
    },
    backend: {
      title: "Backend Development",
      skills: [
        "Node.js & Express.js",
        "RESTful APIs",
        "GraphQL",
        "PHP",
        "Microservices Architecture",
      ],
    },
    databases: {
      title: "Databases & Storage",
      skills: [
        "MySQL & PostgreSQL",
        "Redis Cache",
        "Firebase, Supabase",
      ],
    },
    devops: {
      title: "DevOps & Cloud",
      skills: [
        "AWS EC2",
        "Docker & Kubernetes",
        "CI/CD (GitHub Actions)",
        "Version Control (Git)",
      ],
    },
    tools: {
      title: "Development Tools",
      skills: [
        "VS Code, IntelliJ IDEA",
        "Postman for API testing",
        "JIRA & Confluence",
        "npm & yarn package managers",
      ],
    },
  };

  const SkillSection = ({ title, skills }: { title: string; skills: string[] }) => (
    <div>
      <h3 className="font-semibold mb-2 font-libreFranklint">{title}</h3>
      <ul className="list-disc pl-5 ">
        {skills.map((skill, index) => (
          <li className="text-sm md:text-lg font-libreFranklin dark:text-neutral-300 tracking-wide font-libreFranklint" key={index}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center items-center py-10">
        <SectionHeadings
          title="The Family Legacy"
          seoTitle="Skills & Tech Stack"
          description="Respect earned over time."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {Object.entries(skillCategories).map(([key, { title, skills }]) => (
          <SkillSection key={key} title={title} skills={skills} />
        ))}
      </div>
    </div>
  );
}
