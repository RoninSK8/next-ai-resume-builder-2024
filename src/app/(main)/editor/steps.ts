import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./form/general-info-form";
import PersonalInfoForm from "./form/personal-info-form";
import { WorkExperienceForm } from "./form/work-experience-form";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
];
