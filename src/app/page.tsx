import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import ToolTray from "@/components/ToolTray";
import AppBootstrap from "@/features/settings/components/AppBootstrap";

const Home: React.FC = () => {
  return (
    <div className="min-h-[150vh] flex flex-col overflow-y-auto">
      <AppBootstrap />
      <Navbar />
      <ToolTray />
      <Footer />
    </div>
  );
};

export default Home;