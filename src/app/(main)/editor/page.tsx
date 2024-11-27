import { Metadata } from "next";
import ResumeEditor from "./resume-editor";

export const metadata: Metadata = {
  title: "Design your resume",
};

export default function Page() {
  return <ResumeEditor />;
}
