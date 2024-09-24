import Image from "next/image";
import NavBar from "@/components/NavBar";
// import LocationSearch from "@/components/Search/Location";
import Overview from "@/components/Weather/Overview";
import APIsSourceToggle from "@/components/APIsSourceToggle";
import LocationSearch from "@/components/Search/Location";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('./NoSSR'), { ssr: false });

const Home  = () => {
  return (
    <NoSSR>
      <div className="bg-sky h-[70vh]">
        <NavBar />
        <p className="my-16 text-center text-3xl text-white">Your safe Paraglide and sky guide search begins here</p>
      </div>
      <LocationSearch />
      <Overview />
      <APIsSourceToggle />
    </NoSSR>
  );
}


export default Home