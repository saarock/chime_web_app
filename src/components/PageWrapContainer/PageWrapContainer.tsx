// Import all the necessary dependencies here
import React from 'react'
import { PageWrapperProps } from '../../types'


/**
 * Chime outlet wrapper  
 * @param {React.ReactNode}
 * @returns {React.ReactNode}
 */
const PageWrapContainer: React.FC<PageWrapperProps> = ({
    children
}): React.ReactNode => {
    return (
        <main>
            {children}
        </main>
    )
}

export default PageWrapContainer;
