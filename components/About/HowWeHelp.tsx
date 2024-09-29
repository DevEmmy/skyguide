import React from 'react'
import { GiNigeria, GiNightVision } from 'react-icons/gi'
import { LuArrowUpRight, LuPencilRuler, LuTrophy } from 'react-icons/lu'
// import bg from '../assets/image/bg.jpg'
import Image from 'next/image'
import Link from 'next/link'


const HowWeHelp = () => {
  return (
    <div className='sm:section py-7 md:px-14 flex flex-col gap-10'>

        <div className="my-5 text-center">
            <h2 className="my-2 flex justify-center  md:text-[40px] sm:text-[30px] xs:text-[30px] text-[30px]">
            How we help
            </h2>
            <p className="flex justify-center text-[#444]">
            Redefining Paragliding Process
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 ">

            <div className=' bg-white shadow-sm rounded-3xl text-gray-800 py-7 px-3'>
                <LuPencilRuler size={40} className='mx-auto text-amber-800'/>
                <div className='max-w-sm text-center'>
                    <h2 className='text-[1.7rem] mt-4 mb-2'>Mission Statement</h2>
                    <p className='text-sm text-off'>
                        At SkyGuide, our mission is to bridge the gap between adventurous paragliders and trusted launch sites, ensuring safer and more enjoyable flights.
                    </p>
                </div>
            </div>

            <div className='bg-white shadow-sm rounded-3xl text-gray-800 py-7 px-3'>
                {/* <LuPencilRuler */}
                <GiNightVision size={40} className='mx-auto text-cyan-700'/>
                {/* <GiNigeria /> */}
                <div className='max-w-sm text-center'>
                    <h2 className='text-[1.7rem] mt-4 mb-2'>Our Vision</h2>
                    <p className='text-sm text-off'>
                        At SkyGuide, our mission is to bridge the gap between adventurous paragliders and trusted launch sites, ensuring safer and more enjoyable flights.
                    </p>
                </div>
            </div>

            <div className='bg-white shadow-sm text-gray-800 rounded-3xl py-7 px-3'>
                {/* <LuPencilRuler size={40}/> */}
                <LuTrophy size={40} className='mx-auto text-rose-600'/>
                <div className='max-w-sm text-center'>
                    <h2 className='text-[1.7rem] mt-4 mb-2'>Our Goals</h2>
                    <p className='text-sm text-off'>
                        At SkyGuide, our mission is to bridge the gap between adventurous paragliders and trusted launch sites, ensuring safer and more enjoyable flights.
                    </p>
                </div>
            </div>
        </div>

        <div className='py-6 md:w-3/4 mt-5 mx-auto text-center'>
            <h2 className='text-3xl  my-4'>Why SkyGuide?</h2>
            <p className='text-[#00030A99]'>
                At Skydive, we believe in the strength of the paragliding community and the impact of shared knowledge.
                Our mission is to link enthusiastic pilots with trusted launch sites, vital weather insights, and safety expertise, inspiring a culture of collaboration and aerial responsibility.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">

            <div className='bg-black/70 rounded-3xl text-white py-4 px-3 max-md:mb-3'>
                <div className=''>
                    <h2 className='text-3xl mt-4 mb-2'>
                        Innovation
                    </h2>
                    <p className='text-sm text-off'>
                        We continuously update and refine our features to stay ahead of the curve and We listen to your feedback and incorporate user suggestions
                    </p>
                </div>
                {/* <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                    <span className='text-lg'>Join Us now</span>
                    <span className='bg-black/80 size-8 rounded-full grid place-items-center'>
                        <LuArrowUpRight className='text-white '/>
                    </span>
                </div> */}
            </div>

            <div className='bg-black/70 rounded-3xl text-white p-3 px-3'>
                <div className=''>
                    <h2 className='text-3xl mt-4 mb-2'>
                        Passion
                    </h2>
                    <p className='text-sm text-off'>
                        We're paragliders ourselves, dedicated to enhancing the sport we love, We prioritize accuracy and reliability to ensure your well-being.
                    </p>
                </div>
                <Link href='/flight-planning' className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                    <span className='text-lg'>Plan your flight now</span>
                    <span className='bg-black size-8 rounded-full grid place-items-center'>
                        <LuArrowUpRight className='text-white '/>
                    </span>
                </Link>
            </div>

        </div>

        <div className=' py-5 flex flex-col gap-14'>
            <div className='md:flex justify-between items-center'>
                <div className='text-3xl font-semibold text-left my-4'>How SkyGuide <br className='max-md:hidden'/> works</div>
                
                <div className='md:w-1/4  text-[#00030A99]'>
                Linking paragliders with ideal launch sites and helping flight organizations access critical weather and safety information has never been simpler. Here's how it works
                </div>
            </div>

            <div className="how overflow-y-auto">
                <div className='bg-black/80 how-grid-cols md:mt-20'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-3xl font-medium'>
                            Planning
                        </h2>
                        <p className='text-sm text-off'>
                            Optimize your flight planning with our interactive maps and 3D terrain visualizations,
                            providing precise route guidance and enhanced situational awareness for a smoother journey.
                        </p>
                    </div>
                </div>

                <Image src='/howLeftArr.png' width={70} height={70} className='max-md:hidden si' alt='larr' />

                <div className=' bg-secondary how-grid-cols z-[10000] py-4'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-3xl font-medium'>
                            Real-time forecast
                        </h2>
                        <p className='text-sm text-off'>
                            Stay ahead of changing weather conditions with live updates and alerts,
                            ensuring safe and optimal flight planning.
                        </p>
                    </div>
                </div>

                <Image src='/howRightArr.png' width={70} height={70} className='max-md:hidden' alt='larr' />

                <div className=' bg-[#87A2B5] how-grid-cols md:mt-20'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-3xl font-medium'>
                            Safety
                        </h2>
                        <p className='text-sm text-off'>
                        "Stay aloft with confidence: report and track hazards, and benefit from paragliding community insights.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className=''>
            <h1 className='section-h1 text-center text-2xl my-5'>Success Stories</h1>
            <p className='section-p text-center md:px-32 lg:px-40'>
                Discover the incredible journeys of volunteers and organizations who have made a difference <br/> through our platform. 
            </p>
        </div>

        <div>
            <div className="flex overflow-x-scroll gap-7" style={{scrollbarWidth : 'none'}}>
                <div className=' border-2 p-3.5 border-tertiary min-w-[70%] md:min-w-[40%] flex flex-col gap-3.5 rounded-xl text-[13px]'>
                    <div className='flex items-center gap-2'>
                        <Image src='/team.jpg' width='1000' height='1000' alt='oi' className='rounded-full size-10 border' />
                        <p className='text-off-black'>Jane Doe, Volunteer</p>
                    </div>
                    <p className=''>
                    After retiring, I wanted to give back to my community and pursue my love for animals. Through VoluLink, I discovered an opportunity with a local animal rescue organization. Not only have I been able to spend time with rescued pets, but I've also helped with adoption events and community outreach. The platform made it easy to find an opportunity that matched my skills and interests
                    </p>
                </div>

                <div className=' border-2 p-3.5 border-[#0041C4] min-w-[70%] md:min-w-[40%] flex flex-col gap-3.5 rounded-xl text-[13px]'>
                    <div className='flex items-center gap-2'>
                        <Image src='/team.jpg' width='1000' height='1000' alt='oi' className='rounded-full size-10 border' />
                        <p className='text-off-black'>Jane Doe, Volunteer</p>
                    </div>
                    <p className=''>
                    After retiring, I wanted to give back to my community and pursue my love for animals. Through VoluLink, I discovered an opportunity with a local animal rescue organization. Not only have I been able to spend time with rescued pets, but I've also helped with adoption events and community outreach. The platform made it easy to find an opportunity that matched my skills and interests
                    </p>
                </div>

                <div className=' border-2 p-3.5 border-[#0041C4] min-w-[70%] md:min-w-[40%] flex flex-col gap-3.5 rounded-xl text-[13px]'>
                    <div className='flex items-center gap-2'>
                        <Image src='/team.jpg' width='1000' height='1000' alt='oi' className='rounded-full size-10 border' />
                        <p className='text-off-black'>Jane Doe, Volunteer</p>
                    </div>
                    <p className=''>
                    After retiring, I wanted to give back to my community and pursue my love for animals. Through VoluLink, I discovered an opportunity with a local animal rescue organization. Not only have I been able to spend time with rescued pets, but I've also helped with adoption events and community outreach. The platform made it easy to find an opportunity that matched my skills and interests
                    </p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default HowWeHelp