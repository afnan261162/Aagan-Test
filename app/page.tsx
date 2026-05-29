export const dynamic = "force-dynamic";
export const revalidate = 0;

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuHighlights from "@/components/MenuHighlights";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import VisitUs from "@/components/VisitUs";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import MenuBanner from "@/components/MenuBanner";
import { getGalleryData } from "@/lib/gallery-store";

export default async function Home() {
  const galleryImages = await getGalleryData();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuHighlights />
        <Gallery images={galleryImages} />
        <Testimonials />
        <VisitUs />
      </main>
      <Footer />
      <MobileCallButton />
      <MenuBanner />
    </>
  );
}
