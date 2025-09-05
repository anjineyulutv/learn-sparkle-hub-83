import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { SurrealNotification } from "@/components/ui/SurrealNotification";
import { Feed } from "@/components/social/Feed";
import { StudyGroups } from "@/components/social/StudyGroups";
import { AIAssistant } from "@/components/social/AIAssistant";
import { Explore } from "@/pages/Explore";
import { Messages } from "@/pages/Messages";
import { Achievements } from "@/pages/Achievements";
import { Progress } from "@/pages/Progress";
import { Profile } from "@/pages/Profile";
import { Settings } from "@/pages/Settings";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SurrealNotification />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/groups" element={<StudyGroups />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;