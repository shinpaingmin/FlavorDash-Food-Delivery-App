import MultiStep from 'react-multistep'
import ResSignUp from '../../components/customer/RestaurantSignupPage/ResSignUp'

const RestaurantSignUpPage = () => {
  return (
    <div className='px-8 pt-12 border-t border-t-gray-200 flex justify-center'>
        <MultiStep
            activeStep={0}
            prevButton={{
                title: "Back",
                style: {
                    background: "#ff6b35",
                    borderRadius: "4px",
                    padding: "2px 12px",
                    color: "#fff",
                    margin: "12px 0"
                }
            }}
            nextButton={{
                title: "Next",
                style: {
                    background: "#ff6b35",
                    borderRadius: "4px",
                    padding: "2px 12px",
                    color: "#fff",
                    float: "right",
                    margin: "12px 0"
                }
            }}
        >
            <ResSignUp title="Create account" />
        </MultiStep>
    </div>
  )
}

export default RestaurantSignUpPage
