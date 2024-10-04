import React from 'react'

const MapIndicator = () => {
  return (
    <div className='bg-white/80 shadow-2xl text-secondary glass flex flex-col gap-2 border rounded absolute top-0 p-2 right-0 z-[1000]'>
        <div className="flex items-center gap-3">
            <div className="bg-red-600 h-[15px] w-[15px] rounded-full" />
            <p>Not Flyable</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-yellow-400 h-[15px] w-[15px] rounded-full" />
            <p>Marginable</p>
        </div>            
        <div className="flex items-center gap-3">
            <div className="bg-green-600 h-[15px] w-[15px] rounded-full" />
          <p>Flyable</p>
        </div>
    </div>
  )
}

export default MapIndicator