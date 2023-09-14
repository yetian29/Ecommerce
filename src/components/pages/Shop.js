
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusSmallIcon, PlusSmallIcon, ViewColumnsIcon } from '@heroicons/react/24/solid'
import { connect } from 'react-redux'
import {get_categories} from '../redux/actions/category'
import {get_products} from '../redux/actions/product'
import ProductCard from '../product/ProductCard'
import Layout from '../../components/pages/Layout'
import { prices } from '../price/fixedPrice'
import { filter_products } from '../redux/actions/product'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Shop({get_categories, categories, get_products, products, filter_products, filtered_products}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  let sortBy1 = '-date_created'
  let order1 = ''
  let limit1 = ''

  const[formData, setFormData] = useState({
    category_id: '',
    price_range: 'Any',
    sortBy: 'date_created', 
    order: ''

  })

  const {category_id, price_range, sortBy, order} = formData;

  const [filtered, setFiltered] = useState(false);

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name] : e.target.value


  })

  const handleSubmit = e => {
    e.preventDefault();
    filter_products(category_id, price_range, sortBy, order);
    setFiltered(true);
    window.scrollTo(0, 0);


  }

  useEffect(() =>{
    get_categories()
    get_products(sortBy1, order1, limit1)
  }, [])


  const showProducts = () => {

    if (!filtered && products){
    
        return(<ProductCard products={products}/>)
}
    else if(filtered){
     
        return(<ProductCard products={filtered_products}/>)
        
    }



    


     
    }

 
  return (
    <Layout className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form onSubmit={e => handleSubmit(e)} className="mt-4 border-t border-gray-200">
                   <Disclosure as="div"  className="border-t border-gray-200 px-4 py-6">


                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900 text-2xl">Categories</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">

                           {
                            categories?
                            categories.map(category =>{
                                return(
                                    <div key={category.id} className='flex items-center mb-4 '>
                                        <input
                                        name='category_id'               
                                        type='radio'
                                        value={category.id.toString()}
                                        onChange={e => handleChange(e)}
                                        className='h-4 w-4 border-gray-500 text-blue-500 focus:text-blue-700'
                                        
                                          />
                                        <label className='ml-4 f text-[20px] text-gray-500 flex-1'>{category.name}</label>
                                        </div>
                                    )
                                })
                                
                            :<></>
                              }
                            </div>
                            </Disclosure.Panel>
                          </h3>
                        </>
                      )}
                    </Disclosure>
                    
                    <Disclosure as="div"  className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900 text-2xl">Prices</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {
                              prices && prices.map((price, index) => {
                                  if (price.id === 0) {
                                      return (
                                          <div key={index} className='form-check'>
                                              <input
                                                  onChange={e => handleChange(e)}
                                                  value={price.name}
                                                  name='price_range'
                                                  type='radio'
                                                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                  defaultChecked
                                              />
                                              <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light text-[20px]'>{price.name}</label>
                                          </div>
                                      )
                                  } else {
                                      return (
                                          <div key={index} className='form-check'>
                                              <input
                                                  onChange={e => handleChange(e)}
                                                  value={price.name}
                                                  name='price_range'
                                                  type='radio'
                                                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                              />
                                              <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light text-[20px]'>{price.name}</label>
                                          </div>
                                      )
                                  }
                              })
                          }
                        </div>
                      </Disclosure.Panel>
                          </h3>
                        
                        </>
                      )}
                    </Disclosure>

                  <Disclosure as="div" className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900 text-2xl ml-4">Filter</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              <div>
                                 <label htmlFor='sortBy' className='text-gray-500 text-xl mr-5 flex-1'>SortBy</label>
                                 <select 
                                    id='sortBy'
                                     name='sortBy'
                                     value={sortBy}
                                     onChange={e => handleChange(e)}
                                     className='my-2  inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'

                                  >
                                    <option value="date_created">Date</option>
                                    <option value="sold">Sold</option>
                                    <option value="price">Price</option>
                                 </select>
                              </div>
                               <div className='mt-5'>
                                 <label htmlFor='order' className='text-gray-500 text-xl mr-5 flex-1'>Order</label>
                                 <select 
                                    id='order'
                                     name='order'
                                     value={order}
                                     onChange={e => handleChange(e)}
                                     className='my-2  inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'

                                  >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                 </select>
                              </div>
                              
                            </Disclosure.Panel>
                        </h3>
                       
                      </>
                    )}
                  </Disclosure>
                  <button type='submit' className="mt-3 float-right inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>                         Search
                  </button>
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-red-500">Shop</h1>

            <div className="flex items-center">     
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>


            <div className="">
              {/* Filters */}
              <form onSubmit={e => handleSubmit(e)} className="">
                <div className='grid grid-cols-4 gap-10 items-center'>
                
                  <Disclosure as="div"  className="px-1 py-6">


                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900 text-2xl">Categories</span>
                              <span className="flex items-center">
                                {open ? (
                                  <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6 ml-2">

                           {
                            categories?
                            categories.map(category =>{
                                return(
                                    <div key={category.id} className='flex items-center mb-4 '>
                                        <input
                                        name='category_id'               
                                        type='radio'
                                        value={category.id.toString()}
                                        onChange={e => handleChange(e)}
                                        className='h-4 w-4 border-gray-500 text-blue-500 focus:text-blue-700'
                                        
                                          />
                                        <label className='ml-4 f text-[20px] text-gray-500 flex-1'>{category.name}</label>
                                        </div>
                                    )
                                })
                                
                            :<></>
                              }
                            </div>
                            </Disclosure.Panel>
                          </h3>
                        </>
                      )}
                  </Disclosure>
                

                 
                    
                  <Disclosure as="div" className="py-6"> 
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900 text-2xl">Prices</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                            <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {
                              prices && prices.map((price, index) => {
                                  if (price.id === 0) {
                                      return (
                                          <div key={index} className='form-check'>
                                              <input
                                                  onChange={e => handleChange(e)}
                                                  value={price.name}
                                                  name='price_range'
                                                  type='radio'
                                                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                  defaultChecked
                                              />
                                              <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light text-[20px]'>{price.name}</label>
                                          </div>
                                      )
                                  } else {
                                      return (
                                          <div key={index} className='form-check'>
                                              <input
                                                  onChange={e => handleChange(e)}
                                                  value={price.name}
                                                  name='price_range'
                                                  type='radio'
                                                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                              />
                                              <label className='ml-3 min-w-0 flex-1 text-gray-500 font-sofiapro-light text-[20px]'>{price.name}</label>
                                          </div>
                                      )
                                  }
                              })
                          }
                        </div>
                      </Disclosure.Panel>
                        </h3>
                       
                      </>
                    )}
                  </Disclosure>
                
                    
                  <Disclosure as="div" className="py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900 text-2xl">Filter</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              <div>
                                 <label htmlFor='sortBy' className='text-gray-500 text-xl mr-5 flex-1'>SortBy</label>
                                 <select 
                                      id='sortBy'
                                     name='sortBy'
                                     value={sortBy}
                                     onChange={e => handleChange(e)}
                                     className='my-2  inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'

                                  >
                                    <option value="date_created">Date</option>
                                    <option value="sold">Sold</option>
                                    <option value="price">Price</option>
                                 </select>
                              </div>
                               <div className='mt-5'>
                                 <label htmlFor='order' className='text-gray-500 text-xl mr-5 flex-1'>Order</label>
                                 <select 
                                      id='order'
                                     name='order'
                                     value={order}
                                     onChange={e => handleChange(e)}
                                     className='my-2  inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'

                                  >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                 </select>
                              </div>
                            
                            </Disclosure.Panel>
                        </h3>
                       
                      </>
                    )}
                  </Disclosure>
                 

                


                
                <div>
                  <button type='submit' className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >                    Search
                  </button>
                </div>
                </div>

                 

               
   

                 


               
              </form>

              {/* Product grid */}
           
            </div>
          </section>
        </main>
      </div>
      <>
        {/* Replace with your content */}
              {showProducts()}
        {/* /End replace */}
      </>
    </Layout>
  )
}
const mapStateToProps = state => ({
    categories: state.Category.categories, 
    products: state.Product.products,
    filtered_products: state.Product.filtered_products
})
export default connect(mapStateToProps, {
    get_categories,
    get_products,
    filter_products
    
})(Shop)