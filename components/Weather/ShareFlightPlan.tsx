'use client';
import React from 'react'
import generatePDF, { Margin } from "react-to-pdf";

const ShareFlightPlan = () => {
  const downloadPDF = () => {
    // you can also pass React refs, e.g. `generatePDF(ref, options)`
    generatePDF(() => document.getElementById("container"), {
      method: "save",
      filename: "function-example.pdf",
      page: { margin: Margin.MEDIUM },
    });
  };
  return (
    <div>
      <button onClick={() => downloadPDF()}>Download PDF</button>
      <div id='container' className='flex flex-col gap-3'>
        <div className='flex justify-between'>
          <p className='text-2xl'>Skyguide</p>
          <p>&copy; 2024</p>
        </div>

        
      </div>
    </div>
  )
}

export default ShareFlightPlan