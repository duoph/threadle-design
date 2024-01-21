import BrowseDressByCategory from "@/components/Home/BrowseDressByCategory";
import FeaturedCatergory from "@/components/Home/FeaturedCatergory";
import Hero from "@/components/Home/Hero";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedCatergory />
      <BrowseDressByCategory/>
    </div>
  );
}
