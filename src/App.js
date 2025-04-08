import React, { useRef } from 'react';
import Header from './sections/Header/Header';
import ContentSection from './sections/ContentSection/ContentSection';
import StatsSection from './sections/StatsSection/StatsSection';
import StarsSlider from './sections/StarsSlider/StarsSlider';
import VideoSection from './sections/VideoSection/VideoSection';
import ArtistsSection from './sections/ArtistsSection/ArtistsSection';
import ReviewsSection from './sections/ReviewsSection/ReviewsSection';
import FormSection from './sections/FormSection/FormSection';
import Footer from './sections/Footer/Footer';
import './App.css';

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //     document.body.classList.add('loaded');
  //   }, 2000);
  //
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="app">
      {/*{isLoading && <Preloader />}*/}
      <Header scrollRef={formRef} />
      <ContentSection />
      <StatsSection />
      <StarsSlider />
      <VideoSection />
      <ArtistsSection />
      <ReviewsSection />
      <FormSection ref={formRef} />
      <Footer scrollRef={formRef} />
    </div>
  );
}

export default App;