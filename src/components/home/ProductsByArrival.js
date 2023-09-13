import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { get_products_by_arrival } from "../redux/actions/product";


const ProductsByArrival = ({get_products_by_arrival, products_arrival}) =>{

    let sortBy = 'date_created';
    let order = 'desc';
    let limit = '4'
  


    useEffect(() => {
        get_products_by_arrival(sortBy, order, limit)
    },[])

    return(
    <div className="bg-white ">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 ">Cac san pham moi nhat</h2>

        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-24 ">
          {
          products_arrival?
          products_arrival.map((product) => (
            <div key={product.id} className="group relative transform hover:scale-110">
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
const mapStateToProps = state =>({
    products_arrival: state.Product.products_arrival
})
export default connect(mapStateToProps,{
    get_products_by_arrival
}) (ProductsByArrival);