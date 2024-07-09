import BrowseDressByCategory from "@/components/Home/BrowseDressByCategory";
import HomeFeaturedProductsBar from "@/components/Home/HomeFeaturedProductsBar";
import Hero from "@/components/Home/Hero";
import MapContainer from "@/components/Home/MapContainer";
import NewsLetterContainer from "@/components/Home/NewsLetterContainer";
import OurHappyCustomers from "@/components/Home/OurHappyCustomers";
import AlertMessageSlider from "@/components/AlertMessageSlider";


export default function Home() {


  return (
    <div className="h-full w-full">
      <AlertMessageSlider />
      <Hero />
      <HomeFeaturedProductsBar />
      <BrowseDressByCategory />
      <OurHappyCustomers />
      <MapContainer />
      <NewsLetterContainer />
    </div>
  );
}
