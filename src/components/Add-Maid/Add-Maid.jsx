import React, { useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})


const AddMaidForm = ({ onCloseForm }) =>{
    const {verifyToken, staffName, staffId} = VerifyStaffToken();
    const [errorMessage, setErrorMessage] = useState(false)
    const [spinningLoader, setSpinningLoader] = useState(false)
    const [showOtherReligion, setShowOtherReligion] = useState(false);
    const [showOtherLanguage, setShowOtherLanguage] = useState(false);
    const [showOtherNationality, setShowOtherNationality] = useState(false);
    const [primaryImgPreview, setPrimaryImgPreview] = useState('');
    const [secondaryImgPreviews, setSecondaryImgPreviews] = useState(['', '', '']);
    const [videoPreview, setVideoPreview] = useState('');

    const handleNationalityChange = (event) => {
        setShowOtherNationality(event.target.value === 'Other');
    };

    const handleOtherReligionChange = (event) => {
        setShowOtherReligion(event.target.value === 'Other');
    };

    const handleOtherLanguageChange = (event) => {
        setShowOtherLanguage(event.target.checked);
    };

    const handlePrimaryImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrimaryImgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPrimaryImgPreview('');
        }
    };

    const handleSecondaryImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviews = [...secondaryImgPreviews];
                newPreviews[index] = reader.result;
                setSecondaryImgPreviews(newPreviews);
            };
            reader.readAsDataURL(file);
        } else {
            const newPreviews = [...secondaryImgPreviews];
            newPreviews[index] = '';
            setSecondaryImgPreviews(newPreviews);
        }
    };

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoPreview(URL.createObjectURL(file));
        } else {
            setVideoPreview('');
        }
    };

    const handleMaidFormSubmit = async (event) =>{
      event.preventDefault();
      setSpinningLoader(true)
      const formData = new FormData(event.currentTarget);
      formData.append('addedBy', staffName)
      formData.append('staffId', staffId)
      let isValid = true;

      const fieldsToValidate = [
        'name',
        'nationality',
        'salery',
        'price',
        'religion',
        'maritalStatus',
        'age',
        'education',
        'appliedFor',
        'remarks',
        'contractPeriod',
      ];

      const validatedData = {};

      fieldsToValidate.forEach((field) => {
        const fieldValue = formData.get(field)?.trim();
        if (!fieldValue) {
          isValid = false;
          setErrorMessage(true)
        }
        validatedData[field] = fieldValue;
      });

      if (!isValid) {
        setSpinningLoader(false);
        return;
      }


      try {
        const response = await axiosInstense.post("api/v1/maids",formData, {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log("Response from API:", response.data);
        setSpinningLoader(false)
        onCloseForm()
      } catch (error) {
        setSpinningLoader(false)
        onCloseForm()
        console.error("Error submitting form:", error);
      }
      
    }

    const secondaryImageInputs = [1, 2, 3].map((index) => (
        <div className="mb-4" key={`secondary-image-${index}`}>
        {secondaryImgPreviews[index - 1] && (
                    <img
                        src={secondaryImgPreviews[index - 1]}
                        alt={`Secondary Image ${index} Preview`}
                        className="w-[8rem] h-[8rem] rounded-full object-cover object-top outline-none border-none"
                    />
                )}
            <label className="block text-xl">Secondary Image {index}</label>
            <div className="flex items-center mb-4 justify-center w-full">
                <label htmlFor={`secondary-${index}-file`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    </div>
                    <input
                        id={`secondary-${index}-file`}
                        type="file"
                        name={`maidImg${index + 1}`}
                        onChange={(event) => handleSecondaryImageChange(event, index - 1)}
                        hidden
                    />
                </label>
                
            </div>
        </div>
    ));

    return(
        <>
        <div className="bg-[#F2F5FF] h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-semibold">Add New Maid</div>
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
                        <span className="font-medium">Error!</span> All Fields Required
                  </div>
                }
                      
                        <form onSubmit={handleMaidFormSubmit}>
                            <div className="mb-4">
                                <label class="form-label block text-xl">Name</label>
                                <input type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="name" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label block text-xl">Nationality</label>
                                <select
                                    type="text"
                                    className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                                    name="nationality"
                                    onChange={handleNationalityChange}
                                >
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="India">India</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Other">Other</option>
                                </select>
                                {showOtherNationality && (
                                    <div className="my-4">
                                    <input
                                        type="text"
                                        id="otherNationalityInput"
                                        className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                                        name="otherNationality"
                                        placeholder="Enter Nationality"
                                    />
                                    </div>
                                )}
                                </div>
                            <div>
                                <div className="mb-4">
                                    <label class="form-label block text-xl">Monthly Salary</label>
                                        <select name="salery" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    <option value="70">70</option>
                                    <option value="75">75</option>
                                    <option value="80">80</option>
                                    <option value="85">85</option>
                                    <option value="90">90</option>
                                    <option value="95">95</option>
                                    <option value="100">100</option>
                                    <option value="105">105</option>
                                    <option value="110">110</option>
                                    <option value="115">115</option>
                                    <option value="120">120</option>
                                    <option value="125">125</option>
                                    <option value="130">130</option>
                                    <option value="135">135</option>
                                    <option value="140">140</option>
                                    <option value="145">145</option>
                                    <option value="150">150</option>
                                    <option value="155">155</option>
                                    <option value="160">160</option>
                                    <option value="165">165</option>
                                    <option value="170">170</option>
                                    <option value="175">175</option>
                                    <option value="180">180</option>
                                    <option value="185">185</option>
                                    <option value="190">190</option>
                                        </select>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="form-label block text-xl">Price</label>
                                <input type="number" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="price" />
                            </div>
                            <div>
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Religion</label>
                                    <select
                                    name="religion"
                                    id="religionSelect"
                                    className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                                    onChange={handleOtherReligionChange}
                                    >
                                    <option value="Muslim">Muslim</option>
                                    <option value="Christian">Christian</option>
                                    <option value="Other">Other</option>
                                    </select>
                                    {showOtherReligion && (
                                    <div className="my-4">
                                        <input
                                        type="text"
                                        id="otherReligionInput"
                                        className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                                        name="otherReligion"
                                        placeholder="Enter Religion"
                                        />
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                            <label class="form-label block text-xl">Marital Status</label>
                                <select name="maritalStatus" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                </select>
                            </div>
                            <div className="mb-4">
                            <label class="form-label block text-xl">Childrens</label>
                            <select name="childrens" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            </div>
                            <div class="mb-4">
                                <label class="form-label block text-xl">Age</label>
                                <input type="number" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="age" />
                            </div>
                            <div class="mb-4">
                            <label class="block text-xl">Education</label>
                                <select name="education" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    <option value="Class 5th">Class 5th</option>
                                    <option value="Class 6th">Class 6th</option>
                                    <option value="Class 7th">Class 7th</option>
                                    <option value="Class 8th">Class 8th</option>
                                    <option value="Matric">Matric</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </div>

                            <div class="mb-4">
                            <label class="block text-xl">Applied For</label>
                                <select name="appliedFor" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    <option value="Domestic Worker">Domestic Worker</option>
                                    <option value="Barista">Barista</option>
                                    <option value="Waitress">Waitress</option>
                                    <option value="Nurses">Nurses</option>
                                    <option value="Driver">Driver</option>
                                    <option value="Cook">Cook</option>
                                </select>
                            </div>
                            
                            <div class="mb-4">
                            <label class="block text-xl">Experience</label>
                                <div className="flex flex-col items-center gap-4">
                                    <select name="experienceYears" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        <option value=""></option>
                                        <option value="2 Years">2</option>
                                        <option value="4 Years">4</option>
                                        <option value="6 Years">6</option>
                                        
                                    </select>
                                    <span>Years From</span>
                                    <select name="experienceCountry" className=" w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    <option value=""></option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Malaysia">Malaysia</option>
                                    </select>
                                    
                                </div>
                            </div>

                            <div>
                            <div className="mb-4">
                                <label className="block text-xl">Languages</label>
                                <div className="w-full md:grid flex gap-2 items-center flex-wrap md:grid-cols-3  bg-[#E3E3E3] md:w-[26rem] h-[6rem] sm:h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                <div>
                                  <input className="mr-2" type="checkbox" id="Arabic" name="languages[]" value="Arabic" />
                                  <label for="Arabic">Arabic</label>
                                </div>
                                <div>
                                  <input className="mr-2" type="checkbox" id="english" name="languages[]" value="English" />
                                  <label for="english">English</label>
                                </div>
                                <div>
                                  <input className="mr-2" type="checkbox" id="hindi" name="languages[]" value="Hindi" />
                                  <label for="hindi">Hindi</label>
                                </div>
                                <div>
                                  <input className="mr-2" type="checkbox" id="nepali" name="languages[]" value="Nepali" />
                                  <label for="nepali">Nepali</label>
                                </div>
                                <div>
                                  <input className="mr-2" type="checkbox" id="Burmese" name="languages[]" value="Burmese" />
                                    <label for="Burmese">Burmese</label>
                                </div>
                                <div>
                                    <input className="mr-2"
                                    type="checkbox"
                                    id="Other"
                                    value="Other"
                                    name="languages[]"
                                    onChange={handleOtherLanguageChange}
                                    />
                                    <label for="Other">Other</label>
                                </div>
                                
                                </div>
                                    {showOtherLanguage && (
                                        <div>
                                        <label htmlFor="Other">Other</label>
                                            <div className="my-4 block">
                                                <input
                                                type="text"
                                                id="otherLanguages"
                                                className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                                                name="otherLanguages"
                                                placeholder="Enter Other Language"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                            <div class="mb-4">
                                <label class="block text-xl">Contract Period</label>
                                <select name="contractPeriod" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    <option value="2 Years">2 Years</option>
                                </select>
                            </div>
                            </div>

                            <div>
                            <div class="mb-4">
                                <label class="block text-xl">Remarks</label>
                                <input defaultValue="She is good at cleaning, washing, ironing, and baby care. She is willing to learn cooking." type="text" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="remarks" />
                            </div>
                            </div>

                            {primaryImgPreview && (
                                <img
                                    src={primaryImgPreview}
                                    alt="Primary Image Preview"
                                    className="w-[8rem] h-[8rem] rounded-full object-cover object-top outline-none border-none"
                                />
                            )}

                            <label class="block text-xl">Primary Image</label>                                
                            <div class="flex items-center mb-4 justify-center w-full">
                                <label for="primary-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input onChange={handlePrimaryImageChange} required id="primary-file" type="file"  name="maidImg" hidden />
                                </label>
                            </div> 

                            {secondaryImageInputs && secondaryImageInputs}

                            {videoPreview && (
                                <video
                                    controls
                                    src={videoPreview}
                                    className="w-[8rem] h-[8rem] rounded-full object-cover object-top outline-none border-none"
                                />
                            )}
                            <label class="block text-xl">Video</label>                                
                            <div class="flex items-center mb-4 justify-center w-full">
                                <label for="video-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input onChange={handleVideoChange} id="video-file" accept="video/*" type="file" name="videoLink" hidden />
                                </label>
                            </div> 

                            {/* <div>
                                <div class="mb-4">
                                <label class="block text-xl">Video</label>
                                <input type="file" accept="video/*" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="videoLink" />
                                </div>
                            </div> */}
                            <div>
                                <div class="mb-4">
                                    <button className="w-full flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                      {spinningLoader && <img className="w-8" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"/>}
                                      {!spinningLoader && "Add to System"}
                                    </button>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
        
            
        </>
    )
}

export default AddMaidForm;


// const name = formData.get('name');
//       const nationality = formData.get('nationality');
//       const otherNationality = formData.get('otherNationality') || null;
//       const salery = formData.get('salery');
//       const price = formData.get('price');
//       const religion = formData.get('religion');
//       const otherReligion = formData.get('otherReligion') || null;
//       const maritalStatus = formData.get('maritalStatus');
//       const childrens = formData.get('childrens');
//       const age = formData.get('age');
//       const education = formData.get('education');
//       const appliedFor = formData.get('appliedFor');
//       const experienceYears = formData.get('experienceYears');
//       const experienceCountry = formData.get('experienceCountry');
//       const remarks = formData.get('remarks');
//       const contractPeriod = formData.get('contractPeriod');
//       const languages = formData.getAll('languages[]');
      
//       const otherLanguages = languages.includes('Other')
//         ? formData.get('otherLanguages')
//         : null;      
      
//       const maidImg = formData.get('maidImg');
//       const maidImg2 = formData.get('maidImg2');
//       const maidImg3 = formData.get('maidImg3');
//       const maidImg4 = formData.get('maidImg4');
//       const videoLink = formData.get('videoLink');

