import Bottom from "@/components/Bottom"
import Faq from "@/components/Faq"
import Features from "@/modules/Home/Features"
import Hero from "@/modules/Home/Hero"
import HowItWorks from "@/modules/Home/HowItWorks"
import Inspire from "@/modules/Home/Inspire"

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Inspire />
      <Faq />
      <Bottom />
      <Bottom />
    </div>
  )
}

export default Home