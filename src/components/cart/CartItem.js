

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { connect } from 'react-redux'

function CartItem({item, remove_item}) {

  const [count, setCount] = useState(1)

   const addCount = () => {  
      setCount(count + 1)
    }

    const minusCount = () => {
      setCount(count - 1)
    }


  const handleRemove = (e) =>{
    e.preventDefault();
    remove_item(item.product.id)
    window.scrollTo(0, 0)
    
  }
  return (
   <li  className="flex py-6 sm:py-10">
                  <Link to={`product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={`${process.env.REACT_APP_API_URL}${item.product.photo}`}
                      alt=""
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </Link>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link to={`product/${item.product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.product.name}
                            </Link>
                          </h3>
                        </div>
                        {/* <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.size}</p>
                          ) : null}
                        </div> */}
                        <p className="mt-1 text-sm font-medium text-gray-900">${item.product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${item.product.quantity}`} className="sr-only">
                          Quantity, {item.product.name}
                        </label>
                       <div className='border flex w-[150px] h-[55px] bg-gray-100 justify-center items-center'>
                      <span onClick={minusCount}  className='text-[20px] w-full text-center'>-</span>
                      <span  className='border-x-4 border-gray-200 text-[25px] w-full text-center'>{count}</span>
                      <span onClick={addCount} className='text-[20px] w-full text-center'>+</span>
                      </div> 

                        <div className="absolute top-0 right-0">
                          <button onClick={e => handleRemove(e)} className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XCircleIcon className="h-5 w-5" aria-hidden="true" />

                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                      {product.inStock ? (
                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                    </p> */}
                  </div>
                </li> 
  )
}

export default connect(null, {
}) (CartItem)