import { connect } from "react-redux"

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

const Alert = ({alert}) => {

    function displayAlert(){
      if (alert !== null){
        return (
            <div className={`rounded-md p-4`}>
                <div className="flex">
                    {
                        alert.alertType === 'green'?
                        <>
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className={`h-5 w-5 text-green-500`} aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm font-medium text-green-700`}>{alert.msg}</p>
                            </div>
                            
                        </>
                            
    
                        :
                        <>

                            <div className="flex-shrink-0">
                                    <XCircleIcon className={`h-5 w-5 text-red-500`} aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm font-medium text-red-700`}>{alert.msg}</p>
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