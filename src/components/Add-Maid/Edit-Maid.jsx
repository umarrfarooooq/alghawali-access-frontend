import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const EditMaidForm = ({ onCloseForm }) => {

  const {verifyToken} = VerifyStaffToken();

  const [maidDetails, setMaidDetails] = useState(null);
  const { maidID } = useParams();
  const [errorMessage, setErrorMessage] = useState(false);
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [imagePreview, setImagePreview] = useState(maidDetails?.maidImg || '');

  useEffect(() => {
    const fetchMaidData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/maids/${maidID}`, {
          headers: {
            Authorization:
              `Bearer ${verifyToken}`,
          },
        });
        setMaidDetails(response.data);
      } catch (error) {
        console.error("Error fetching maids:", error);
      }
    };

    fetchMaidData();
  }, [maidID]);

  
  const handleInputChange = (e, field) => {
    const updatedMaidDetails = { ...maidDetails, [field]: e.target.value };
    setMaidDetails(updatedMaidDetails);
  };

  const handleMaidEditFormSubmit = async (event) => {
    event.preventDefault();
    setSpinningLoader(true);
    const formData = new FormData(event.currentTarget);

    try {
      if (maidDetails && maidDetails._id) {
        const response = await axiosInstance.put(
            `/api/v1/maids/${maidDetails._id}`,
          formData,
          {
            headers: {
              Authorization:
              `Bearer ${verifyToken}`,
            },
          }
        );

        console.log("Response from API:", response.data);
        setSpinningLoader(false);
        onCloseForm();
      } else {
        console.error("Maid details or ID not available");
      }
    } catch (error) {
      setErrorMessage(true);
      console.error("Error submitting form:", error);
      console.log("Error submitting form:", error.response);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      const updatedMaidDetails = { ...maidDetails };
      updatedMaidDetails.maidImg = file;
      setMaidDetails(updatedMaidDetails);
    }
  };

    return(
        <>
        <div className="bg-[#F2F5FF] h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-semibold">Edit Maid</div>
            <div className="p-3 rounded-md bg-[#EBEBEB] cursor-pointer" onClick={ onCloseForm }>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 18L6 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 18L18 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
        </div>
            <div className="bg-[#EBEBEB] p-3 sm:p-8 rounded-xl shadow-lg">
                <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
                {errorMessage && 
                  <div className="p-4 mb-4 w-full md:w-[26rem] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error!</span> Something Went Wrong
                  </div>
                }
                {maidDetails && <form onSubmit={handleMaidEditFormSubmit}>
                            <div className="mb-4 w-full">
                                <label htmlFor="primary-file" className="flex relative items-center justify-center cursor-pointer">
                                    <img className="w-[8rem] h-[8rem] rounded-full object-cover object-top outline-none border-none" src={imagePreview || `${import.meta.env.VITE_API_URL}${maidDetails?.maidImg}`}/>
                                    <div className="bg-[#FDFCFF] absolute bottom-0 right-[32%] p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 3C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12H19V19H5V5H12V3H5ZM17.78 4C17.6 4.00152 17.4278 4.07329 17.3 4.2L16.08 5.41L18.58 7.91L19.8 6.7C20.06 6.44 20.06 6 19.8 5.75L18.25 4.2C18.12 4.07 17.95 4 17.78 4ZM15.37 6.12L8 13.5V16H10.5L17.87 8.62L15.37 6.12Z" fill="#434146"/>
                                    </svg>
                                    </div>
                                    <input onChange={handleFileInputChange} id="primary-file" type="file"  name="maidImg" hidden />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label class="form-label block text-xl">Name</label>
                                <input onChange={(e) => handleInputChange(e, 'name')} value={maidDetails.name} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="name" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label block text-xl">Nationality</label>
                                <input onChange={(e) => handleInputChange(e, 'nationality')} value={maidDetails.nationality} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="nationality" />
                                </div>
                            <div>
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Monthly Salary</label>
                                    <input onChange={(e) => handleInputChange(e, 'salery')} value={maidDetails.salery} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="salery" />
                                </div>
                            </div>
                            <div class="mb-4">
                                <label className="form-label block text-xl">Price</label>
                                <input onChange={(e) => handleInputChange(e, 'price')} value={maidDetails.price} type="number" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="price" />
                            </div>
                            <div>
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Religion</label>
                                    <input onChange={(e) => handleInputChange(e, 'religion')} value={maidDetails.religion} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="religion" />
                                </div>
                            </div>
                            <div className="mb-4">
                            <label class="form-label block text-xl">Marital Status</label>
                                <input onChange={(e) => handleInputChange(e, 'maritalStatus')} value={maidDetails.maritalStatus} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="maritalStatus" />

                            </div>
                            <div className="mb-4">
                            <label class="form-label block text-xl">Childrens</label>
                                <input onChange={(e) => handleInputChange(e, 'childrens')} value={maidDetails.childrens} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="childrens" />
                            </div>
                            <div class="mb-4">
                                <label class="form-label block text-xl">Age</label>
                                <input onChange={(e) => handleInputChange(e, 'age')} value={maidDetails.age} type="number" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="age" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-xl">Education</label>
                                <input onChange={(e) => handleInputChange(e, 'education')} value={maidDetails.education} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="education" />
                            </div>

                            <div class="mb-4">
                            <label class="block text-xl">Applied For</label>
                                <input onChange={(e) => handleInputChange(e, 'appliedFor')} value={maidDetails.appliedFor} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="appliedFor" />
                            </div>
                            
                            <div class="mb-4">
                            <label class="block text-xl">Experience</label>
                                <input onChange={(e) => handleInputChange(e, 'experience')} value={maidDetails.experience} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="experience" />
                            </div>

                            <div>
                            <div className="mb-4">
                                <label className="block text-xl">Languages</label>
                                <input onChange={(e) => handleInputChange(e, 'languages')} value={maidDetails.languages} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="languages" />
                                </div>
                            </div>

                            <div>
                            <div class="mb-4">
                                <label class="block text-xl">Contract Period</label>
                                <input onChange={(e) => handleInputChange(e, 'contractPeriod')} value={maidDetails.contractPeriod} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="contractPeriod" />
                            </div>
                            </div>

                            <div>
                            <div class="mb-4">
                                <label class="block text-xl">Remarks</label>
                                <input onChange={(e) => handleInputChange(e, 'remarks')} value={maidDetails.remarks} type="text" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="remarks" />
                            </div>
                            </div>
                            
                            <div>
                                <div class="mb-4">
                                    <button className="w-full flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        {spinningLoader && <img className="w-8" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"/>}
                                        {!spinningLoader && "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        }
                        
                </div>
            </div>
        </div>
        
            
        </>
    )
}

export default EditMaidForm;
