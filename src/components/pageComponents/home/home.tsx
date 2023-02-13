import BookIntroducer from "src/components/bookIntroducer/bookIntroducer";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import { useHomeStore } from "src/store/home/homeStoreHooks";
import style from "./home.module.css";

const Home = () => {
  const { mainIntroducers } = useHomeStore((s) => s.booksIntroducers);
  return (
    <div data-testid="homepageHolder" className={style.holder}>
      <Navbar />
      <div
        data-testid="homepageIntroducerHolder"
        className={style.introducersHolder}
      >
        {mainIntroducers.map((introducer) => {
          return (
            <BookIntroducer key={introducer.introducingName} {...introducer} />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
