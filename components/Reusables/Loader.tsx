import React from 'react'

const Loader = () => {
  return (
    <>
      <div className='.loader' />
      <div className="flex justify-center">
      <div className="lds-ring">
        <div className="bg-gray-500 rounded-full w-4 h-4" />
        <div className="bg-gray-500 rounded-full w-4 h-4" />
        <div className="bg-gray-500 rounded-full w-4 h-4" />
        <div className="bg-gray-500 rounded-full w-4 h-4" />
      </div>
    </div>
    </>
  )
}

export default Loader