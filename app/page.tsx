import { Hero } from '@/components/Hero'
import { LandingComp } from '@/components/LandingComp'
import { PropertyCard } from '@/components/PropertyCard'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div>
    <Hero />
    <LandingComp />
  </div>
}

export default Page