import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import ToolTray from "@/components/ToolTray";

const Home: React.FC = () => {
  return (
    <div className="min-h-[150vh] flex flex-col overflow-y-auto">
      <Navbar/>
      <ToolTray/>
      <Footer/>
    </div>
  );
};

export default Home;