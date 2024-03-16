import UserForm from "../../components/customer/RestaurantSignupPage/UserForm";
import RestaurantForm from "../../components/customer/RestaurantSignupPage/RestaurantForm";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import {  useEffect, useState } from "react";
import { useAddNewRestaurantMutation } from "../../services";
import MoreAboutRestaurant from "../../components/customer/RestaurantSignupPage/MoreAboutRestaurant";
import toast, { Toaster } from 'react-hot-toast';


const INIT_DATA = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    storeName: "",
    storeAddress: "",
    township: "",
    storePhone: "",
    type: "",
    pricing: "",
    opening_time: "",
    closing_time: "",
    from_day: "",
    to_day: "",
    image: "",
}

const RestaurantSignUpPage = () => {
    const [inputsData, setInputsData] = useState(INIT_DATA);

    function updateFields(fields) {
        setInputsData(prev => {
            return {...prev, ...fields};
        })
    }

    const [addNewRestaurant, {isSuccess, isError, error: storeError}] = useAddNewRestaurantMutation();

    const {
        steps,
        step,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        back,
        next,
        goTo
    } = useMultiStepForm([<UserForm {...inputsData} updateFields={updateFields} storeError={storeError} />,
                            <RestaurantForm {...inputsData} updateFields={updateFields} storeError={storeError} />,
                            <MoreAboutRestaurant  {...inputsData} updateFields={updateFields} storeError={storeError} />]);


    useEffect(() => {
        if(isError) {
            toast.error(storeError?.data?.message || storeError?.status, {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#fecaca",
                }
            })
            goTo(0);
        } else if(isSuccess) {
            toast.success('You have successfully registered!', {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#bbf7d0",
                }
            })
            goTo(0);
            setInputsData(INIT_DATA);
        }
    }, [isError, isSuccess])

    const onSubmit = (e) => {
        e.preventDefault();
        !isLastStep && next();
        if(isLastStep) {
            if(confirm("Are you sure to create a new account?")) {
                let formData = new FormData();
                // formData.append('image', data.image);
                // const postData = {...data, image: formData.get("image")};

                // looping each property of an obj and convert it into a formdata object
                for(const prop in inputsData) {
                    formData.append(`${prop}`, inputsData[prop]);
                }

                addNewRestaurant(formData);
            }
        }
    }



    return (
        <form
            onSubmit={onSubmit}
            className="px-8 pt-12 border-t border-t-gray-200"
            autoComplete="off"
        >
            {
                (isError || isSuccess) && <Toaster/>
            }
            <div className="max-sm:w-full w-[500px] m-auto relative">

                <div className="absolute top-0 right-0">
                    {currentStepIndex + 1} / {steps.length}
                </div>

            </div>

            { step  }

            <div className="max-sm:w-full w-[500px] m-auto relative">
                {!isFirstStep && (
                    <button
                        type="button"
                        className="absolute top-4 left-0 py-2 px-4 bg-orange rounded-md hover:bg-orange/90 text-white"
                        onClick={back}
                    >
                        Back
                    </button>
                )}

                <button
                    type="submit"
                    className="absolute top-4 right-0 py-2 px-4 bg-orange rounded-md hover:bg-orange/90 text-white"

                >
                    {isLastStep ? "Finish" : "Next"}
                </button>

            </div>
        </form>
    );
};

export default RestaurantSignUpPage;
