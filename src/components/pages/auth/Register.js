import Layout from '../Layout'
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { sign_up } from '../../redux/actions/auth'
import { useState } from 'react'
import { Oval } from 'react-loader-spinner'

function Register({sign_up, loading}) {


    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const {email, first_name, last_name, password, re_password} = formData;

    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        sign_up(email, first_name, last_name, password, re_password);
        window.scrollTo(0, 0);
        setAccountCreated(true);

        
    }

    if (accountCreated && !loading) {
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Dang ky tai khoan cua ban</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={e => onSubmit(e)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                   
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => handleChange(e)}
                   
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

               <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <div className="mt-1">
                  <input
                    name="first_name"
                    type="text"
                    value={first_name}
                    onChange={e => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

               <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name 
                </label>
                <div className="mt-1">
                  <input
                    name="last_name"
                    type="text"
                    value={last_name}
                    onChange={e => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="re_password" className="block text-sm font-medium text-gray-700">
                    Repeat Password
                </label>
                <div className="mt-1">
                  <input
                    name="re_password"
                    type="password"
                    value={re_password}
                    onChange={e => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
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
                    Register
                  </button>
                  }
               

                     
              </div>
            </form>
            <p className="mt-5 text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
            </p>
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
    sign_up
}) (Register)