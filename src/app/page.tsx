import AppBootstrap from "@/features/settings/components/AppBootstrap";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolTray } from "@/components/ToolTray";

import styles from "@/styles/Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <AppBootstrap />
      <Navbar />
      <ToolTray />
      <Footer />
    </div>
  );
};

export default Home;