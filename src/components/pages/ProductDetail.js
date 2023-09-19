

import Layout from './Layout'
import { useEffect, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { useParams } from "react-router-dom"
import { connect } from "react-redux"
import ProductColor from "../product/ProductColor"
import { get_product} from '../redux/actions/product'
import { add_item } from '../redux/actions/cart'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}





const ProductDetail = ({get_product, product, add_item, item_add}) =>{

    const params = useParams()

    const product_id = params.product_id

    const [count, setCount] = useState(1)

    const addCount = () => {  
      setCount(count + 1)
    }

    const minusCount = () => {
      setCount(count - 1)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      add_item(product_id, count)
      window.scrollTo(0, 0)
    }


    useEffect(() => {
        get_product(product_id)
       
    },[])

    
    
    return(
        <Layout>
            {product?
            <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
           

            <Tab.Panels className="w-[300px] h-[300px]">
            
                <Tab.Panel>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${product.photo}`}
                    alt=""
                    className="w-full h-full object-center object-cover sm:rounded-lg"
                  />
                </Tab.Panel>
            
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
            <ProductColor/>
                <div className='items-center mt-10 flex flex-row gap-5 cursor-pointer'>
                  <h3>Quantity</h3>
                  <div className='border flex w-[150px] h-[55px] bg-gray-100 justify-center items-center'>
                    <span onClick={minusCount}  className='text-[30px] w-full text-center'>-</span>
                    <span  className='border-x-4 border-gray-200 text-[35px] w-full text-center'>{count}</span>
                    <span onClick={addCount} className='text-[30px] w-full text-center'>+</span>
                   </div>
                  <h3>{product.quantity} products are available in stock</h3>

                        
                </div>
                

              <div className="mt-10 flex sm:flex-col1">
                
                <button
                  onClick={e => handleSubmit(e)}
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  Add to shopping cart
                </button>

                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

             
            </section>
          </div>
        </div>
      </div>
            </div>
            
            :<></>
            }
         
        </Layout>
    )
}

const mapStateToProps = state => ({
   product: state.Product.product,
   item_add: state.Cart.item_add

})
export default connect(mapStateToProps,{
   get_product,
   add_item
})(ProductDetail)