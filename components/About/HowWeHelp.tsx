import React from 'react'
import { GiNightVision } from 'react-icons/gi'
import { LuArrowUpRight, LuPencilRuler } from 'react-icons/lu'
// import bg from '../assets/image/bg.jpg'
import Image from 'next/image'


const HowWeHelp = () => {
  return (
    <div className='section py-7 md:px-14 flex flex-col gap-10'>

        <div className="my-14">
            <h2 className="my-2 flex justify-center  md:text-[40px] sm:text-[30px] font-semibold xs:text-[30px] text-[30px]">
            How we help
            </h2>
            <p className="flex justify-center text-[#444]">
            Redefining Paragliding Process
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 ">

            <div className='bg-[#0041c4] rounded-3xl text-white py-4 px-3'>
                <LuPencilRuler size={40}/>
                <div className='max-w-sm'>
                    <h2 className='text-3xl mt-4 mb-2'>Mission Statement</h2>
                    <p className='text-sm text-off'>
                        At SkyGuide, our mission is to bridge the gap between adventurous paragliders and trusted launch sites, ensuring safer and more enjoyable flights.
                    </p>
                </div>
                <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                    <span className='text-lg'>Join Us now</span>
                    <span className='bg-black size-8 rounded-full grid place-items-center'>
                        <LuArrowUpRight className='text-white '/>
                    </span>
                </div>
            </div>

            <div className='bg-[#ff5500] rounded-3xl text-white py-4 px-3'>
                {/* <LuPencilRuler */}
                <GiNightVision size={40}/>
                <div className='max-w-sm'>
                    <h2 className='text-3xl mt-4 mb-2'>Our Vision</h2>
                    <p className='text-sm text-off'>
                        At SkyGuide, our mission is to bridge the gap between adventurous paragliders and trusted launch sites, ensuring safer and more enjoyable flights.
                    </p>
                </div>
                <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                    <span className='text-lg'>Join Us now</span>
                    <span className='bg-black size-8 rounded-full grid place-items-center'>
                        <LuArrowUpRight className='text-white '/>
                    </span>
                </div>
            </div>

            <div className='bg-[#8000ff] rounded-3xl text-white py-4 px-3'>
                <LuPencilRuler size={40}/>
                <div className='max-w-sm'>
                    <h2 className='text-3xl mt-4 mb-2'>Our Goals</h2>
                    <p className='text-sm text-off'>
                        At SkyGuide, our mission is to bridge the gap between adventurous paragliders and trusted launch sites, ensuring safer and more enjoyable flights.
                    </p>
                </div>
                <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                    <span className='text-lg'>Join Us now</span>
                    <span className='bg-black size-8 rounded-full grid place-items-center'>
                        <LuArrowUpRight className='text-white '/>
                    </span>
                </div>
            </div>
        </div>

        <div className='py-6 md:w-3/4'>
            <h1 className='text-3xl font-semibold my-4'>Why SkyGuide?</h1>
            <p className='text-[#00030A99]'>
                At Skydive, we believe in the strength of the paragliding community and the impact of shared knowledge.
                Our mission is to link enthusiastic pilots with trusted launch sites, vital weather insights, and safety expertise, inspiring a culture of collaboration and aerial responsibility.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">

            <div className='bg-black/70 rounded-3xl text-white py-4 px-3 max-md:mb-3'>
                <div className=''>
                    <h2 className='text-3xl mt-4 mb-2'>
                        Looking to Volunteer?
                    </h2>
                    <p className='text-sm text-off'>
                        Discover opportunities that match your skills and interests. Whether you want to help with animal care, community projects, or educational programs
                    </p>
                </div>
                <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                    <span className='text-lg'>Join Us now</span>
                    <span className='bg-black/80 size-8 rounded-full grid place-items-center'>
                        <LuArrowUpRight className='text-white '/>
                    </span>
                </div>
            </div>

            <div className='bg-black/70 rounded-3xl text-white py-4 px-3'>
                <div className=''>
                    <h2 className='text-3xl mt-4 mb-2'>
                        Looking for opportunities
                    </h2>
                    <p className='text-sm text-off'>
                        Find passionate volunteers for your cause. Post opportunities, manage applications, and engage with a community dedicated to making an impact
                    </p>
                </div>
                <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                    <span className='text-lg'>Join Us now</span>
                    <span className='bg-black size-8 rounded-full grid place-items-center'>
                        <LuArrowUpRight className='text-white '/>
                    </span>
                </div>
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
                    <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                        <span className='text-base'>Sign Up</span>
                        <span className='bg-black/80 size-8 rounded-full grid place-items-center'>
                            <LuArrowUpRight className='text-white '/>
                        </span>
                    </div>
                </div>

                <Image src='/howLeftArr.png' width={100} height={100} className='max-md:hidden' alt='larr' />

                <div className=' bg-secondary how-grid-cols z-[10000]'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-3xl font-medium'>
                            Real-time forecast
                        </h2>
                        <p className='text-sm text-off'>
                            Stay ahead of changing weather conditions with live updates and alerts,
                            ensuring safe and optimal flight planning.
                        </p>
                    </div>
                    <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-secondary font-semibold'>
                        <span className='text-base'>Explore opportunities</span>
                        <span className='bg-secondary size-8 rounded-full grid place-items-center'>
                            <LuArrowUpRight className='text-white '/>
                        </span>
                    </div>
                </div>

                <Image src='/howRightArr.png' width={100} height={100} className='max-md:hidden' alt='larr' />

                <div className=' bg-tertiary how-grid-cols md:mt-20'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-3xl font-medium'>
                            Safety
                        </h2>
                        <p className='text-sm text-off'>
                        "Stay aloft with confidence: report and track hazards, and benefit from paragliding community insights.
                        </p>
                    </div>
                    <div className='mt-3 px-3 py-1.5 w-full flex items-center justify-between rounded-full bg-white text-black font-semibold'>
                        <span className='text-base'>Start Making an impact</span>
                        <span className='bg-tertiary size-8 rounded-full grid place-items-center'>
                            <LuArrowUpRight className='text-white '/>
                        </span>
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