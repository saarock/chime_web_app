import React from 'react'
import { PageWrapperProps } from '../../types'

const PageWrapper: React.FC<PageWrapperProps> = ({
    children
}) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default PageWrapper