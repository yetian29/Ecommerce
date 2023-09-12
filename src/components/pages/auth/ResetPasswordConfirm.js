import Layout from '../Layout'
import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { Navigate, useParams } from 'react-router-dom'
import { reset_password_confirm } from '../../redux/actions/auth'
import setAlert from '../../redux/actions/alert'


function ResetPasswordConfirm({reset_password_confirm, setAlert, loading}) {


    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
      
       
    });

    const [sent, setSent] = useState(false);

    const {new_password, re_new_password} = formData;

    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const params = useParams();

    const onSubmit = e => {
        e.preventDefault();
        const uid = params.uid;
        const token = params.token;
        if(new_password === re_new_password) {   reset_password_confirm
       (uid, token, new_password, re_new_password);
          setSent(true);
        }
        else {
         setAlert('Mat khau nhap vao khong chinh xac', 'red')
        }
        window.scrollTo(0, 0);
        
    
    }
    if(sent && ! loading) {
      return <Navigate to='/'/>
    }

     
   
    
    
  return (
    <Layout>
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Dang nhap tai khoan cua ban</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={e => onSubmit(e)}>
              <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                 New Password
                </label>
                <div className="mt-1">
                  <input
                    name="new_password"
                    type="password"
                    value={new_password}
                    onChange={e => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                <label htmlFor="re_new_password" className="block text-sm font-medium text-gray-700">
                 RePeat New Password
                </label>
                <div className="mt-1">
                  <input
                    name="re_new_password"
                    type="password"
                    value={re_new_password}
                    onChange={e => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
              </div>
                
              </div>
              
              <div>
                {
                  loading? 
                    <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Oval color='#fff' width={20} height={20}/>
                   
                  </button>
                :
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                     Confirm Send
                  </button>
                  }
                              
              </div>
            </form>
            
          </div>
        </div>
      </div>




    </Layout>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
   reset_password_confirm,
   setAlert
}) (ResetPasswordConfirm)