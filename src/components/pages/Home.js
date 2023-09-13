

import Layout from "./Layout"
import Banner from "../home/Banner"
import ProductsByArrival from "../home/ProductsByArrival"
import ProductsBySold from "../home/ProductsBySold"
function Home() {
  return (
    <Layout>
      <Banner/>
      <ProductsByArrival/>
      <ProductsBySold/>
    </Layout>
  )
}

export default Home