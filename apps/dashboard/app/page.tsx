import { LeftSidebar } from "./_components/left-sidebar";
import { RightSidebar } from "./_components/right-sidebar";
import { Contact } from "./_sections/contact";
import { Profile } from "./_sections/profile";
import { Projects } from "./_sections/projects";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory overflow-scroll h-screen">
      <LeftSidebar />
      <RightSidebar />
      <Profile />
      <Projects />
      <Contact />
    </div>
  );
}
