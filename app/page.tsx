import Image from "next/image";
import NavBar from "@/components/NavBar";
// import LocationSearch from "@/components/Search/Location";
// import Overview from "@/components/Weather/Overview";
import APIsSourceToggle from "@/components/APIsSourceToggle";
import LocationSearch from "@/components/Search/Location";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/Weather/Overview"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <main>
      <div className="bg-sky h-[70vh]">
        <NavBar />

        <div className="my-20 w-1/2 mx-auto text-center text-white flex flex-col gap-5">
          <p className=" text-center text-4xl font-semibold text-white">Your Flight. Your Sky. Your Weather.</p>
          <p className="text-[16px]">
          Get real-time, precise weather forecasts from multiple sources, and plan your perfect flight with ease. Stay safe, fly smart, and explore the skies with confidence.
          </p>
        </div>
      </div>

      <LocationSearch />
      <LazyMap />
      {/* <APIsSourceToggle /> */}
    </main>
  );
}