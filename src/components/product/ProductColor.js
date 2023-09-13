
import  {RadioGroup} from '@headlessui/react'
import { useState } from "react"


const product = {
 
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    { name: 'Tshirt Red', bgColor: 'bg-red-400', selectedColor: 'ring-red-400' },
    { name: 'Tshirt Blue', bgColor: 'bg-blue-700', selectedColor: 'ring-blue-600' },


    
  ],
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const ProductColor = () => {

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    return(
          <div>
                <h3 className="text-sm text-gray-600">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedColor,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="p" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.bgColor,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
    )
}

export default ProductColor;