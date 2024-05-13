"use client"

import { AppProgressBar } from 'next-nprogress-bar';

const ProgressBar = () => {
    return (
        <div>
            <AppProgressBar height="1px"
                color="#6A9AA7"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </div>
    )
}

export default ProgressBar