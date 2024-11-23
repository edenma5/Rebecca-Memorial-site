import FamilyTree from "@/components/family-tree/FamilyTree";
import Main from "@/components/main/Main";
import PhotosSlider from "@/components/photos-slider/PhotosSlider";
import Sentences from "@/components/sentences/Sentences";

const MainPage = () => {
  return (
    <>
      <Main />
      <Sentences />
      <FamilyTree />
      <PhotosSlider />
    </>
  );
};

export default MainPage;
