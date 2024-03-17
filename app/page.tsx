import BrowseDressByCategory from "@/components/Home/BrowseDressByCategory";
import FeaturedCatergory from "@/components/Home/FeaturedCatergory";
import Hero from "@/components/Home/Hero";
import NewsLetterContainer from "@/components/Home/NewsLetterContainer";
import OurHappyCustomers from "@/components/Home/OurHappyCustomers";


export default function Home() {



  return (
    <div className="h-full w-full">
      <Hero />
      {/* <FeaturedCatergory /> */}
      <BrowseDressByCategory />
      <OurHappyCustomers />
      <NewsLetterContainer />
    </div>
  );
}
