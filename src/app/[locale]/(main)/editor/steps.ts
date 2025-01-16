import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./form/general-info-form";
import PersonalInfoForm from "./form/personal-info-form";
import { WorkExperienceForm } from "./form/work-experience-form";
import { EducationForm } from "./form/education-form";
import { SkillsForm } from "./form/skills-form";
import { SummaryForm } from "./form/summary-form";

export const steps: {
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { component: GeneralInfoForm, key: "general-info" },
  { component: PersonalInfoForm, key: "personal-info" },
  {
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    component: EducationForm,
    key: "education",
  },
  {
    component: SkillsForm,
    key: "skill",
  },
  {
    component: SummaryForm,
    key: "summary",
  },
];
