import { Link } from "react-router-dom"


function ProductCard({products}) {
  return (
     <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 ">Cac san pham moi nhat</h2>

        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-24 ">
          {
          products?
          products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-[250px] h-[250px] bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none ">
                <img
                  src={`${process.env.REACT_APP_API_URL}${product.photo}`}
                  alt=""
                  className="w-full h-full object-center object-cover md:w-full md:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      <p className="text-sm font-medium text-gray-900">${product.price}</p>

                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          )):<></>
        }
        </div>
      </div>
    </div>
  )
}

export default ProductCard