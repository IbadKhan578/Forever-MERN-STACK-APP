import React from 'react'
import SectionTitle from '../components/SectionTitle'
import {assets} from '../assets/assets';
import NewLetterBox from '../components/NewLetterBox'

const Contact = () => {
  return (
    <>
    <div className='border-t pt-10 text-center border-gray-300 text-2xl'>
      <SectionTitle text1={'CONTACT'} text2={'US'} />
    </div>
    <div className='flex md:pl-15 flex-col md:flex-row sm:gap-10 '>
      <div className='my-10 flex flex-col md:flex-row  mb-28'>
      <img className='w-full md:w-[480px]' src={assets.contact_img} alt="" />
    </div>
    <div className='flex flex-col  mt-[-40px] text-gray-500 justify-center gap-6 items-start'>
      <p className='font-semibold text-xl text-gray-600' >Our Store</p>
      <p>54709 Dando <br />
        Suite 350, Sindh, Pakistan</p>
        <p>Tel: (415) 555-0132 <br />
Email: ibad@forever.com</p>
<p className='font-semibold text-xl text-gray-600 '>Careers at Forever</p>
<p>Learn more about our teams and job openings.</p>
<button className='border px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ease-in-out '>Explore Jobs</button>

    </div>
    </div>
    <div className='mt-12 sm:mt-0'>
      <NewLetterBox />
    </div>
    </>
  )
}

export default Contact