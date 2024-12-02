import Faq from "@/components/Faq"
import Features from "@/modules/Home/Features"
import Hero from "@/modules/Home/Hero"
import Inspire from "@/modules/Home/Inspire"

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Inspire />
      <Faq />
      <div className="bottom pt-[6rem]"></div>
    </div>
  )
}

export default Home