
import Navbar from '../navigations/Navbar'
import Footer from '../navigations/Footer'


function Layout(props) {
  return (
    <div>
        <Navbar/>
        {props.children}
        <Footer/>
    </div>
  )
}

export default Layout
