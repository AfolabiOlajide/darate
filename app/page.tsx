import Bottom from "@/components/Bottom"
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
      <Bottom />
    </div>
  )
}

export default Home