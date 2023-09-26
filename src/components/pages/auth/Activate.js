

import React, { useState } from 'react'
import Layout from '../Layout'
import {activate} from '../../redux/actions/auth'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { Navigate } from 'react-router-dom'


function Activate({activate, loading}) {
    const params = useParams();
    const [activated, setActivated] = useState(false);
    const onClick = () => {

        const uid = params.uid;

        const token = params.token;

        activate(uid, token);

        setActivated(true);
    }

    if (activated && !loading) {
        return <Navigate to='/'/>
    }


  return (
    <Layout>
    <div className="mt-[120px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div className="max-w-3xl mt-6">
        {
            loading ? 
            <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            <Oval color='#fff' width={20} height={20}/>
            
            </button>
        :
        <button
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Activate Account
        </button>
        }
       
      
	  </div>
  </div>
   
    </Layout>
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading
})
export default connect(mapStateToProps, {
    activate
}) (Activate)