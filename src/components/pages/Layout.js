
import Navbar from '../navigations/Navbar'
import Footer from '../navigations/Footer'
import { check_account, load_user, refresh } from '../redux/actions/auth'
import { useEffect } from 'react'
import { connect } from 'react-redux'

function Layout(props) {

  useEffect(() =>{
    
    props.check_account()
    props.load_user()
    props.refresh()

    }, [])
  return (
    <div>
        <Navbar/>
        {props.children}
        <Footer/>
    </div>
  )
}

export default connect(null,{
  check_account,
  load_user,
  refresh
}) (Layout)
