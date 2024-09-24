import React from 'react'

const NoSSR = ({children} : Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default NoSSR