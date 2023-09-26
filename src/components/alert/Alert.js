import { connect } from "react-redux"

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

const Alert = ({alert}) => {

    function displayAlert(){
      if (alert !== null){
        return (
            <div className={`flex justify-center rounded-md  mt-[160px]`}>
                <div className="flex">
                    {
                        alert.alertType === 'green'?
                        <>
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className={`h-8 w-8 text-green-500`} aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className={`text-2xl font-medium text-green-700`}>{alert.msg}</p>
                            </div>
                            
                        </>
                            
    
                        :
                        <>

                            <div className="flex-shrink-0">
                                    <XCircleIcon className={`h-8 w-8 text-red-500`} aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className={`text-2xl font-medium text-red-700`}>{alert.msg}</p>
                            </div>
                        </>
                           
                    }
                </div>
            </div>
    
               
        )
      }
           
          
           
       
    }

    return (
        displayAlert()
    )


}


const mapStateToProps = state =>({
    alert: state.Alert.alert
})
export default connect(mapStateToProps, {
   
}) (Alert)