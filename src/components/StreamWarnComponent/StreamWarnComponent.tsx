import { Loader2 } from 'lucide-react'


const StreamWarnComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white px-4 text-center">
            <div className="animate-spin mb-6">
                <Loader2 size={64} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
                Searching for Camera Access...
            </h2>
            <p className="text-base text-gray-300 max-w-md">
                Please allow access to your camera and microphone in the browser
                settings to start video chatting.
            </p>
        </div>
    )
}

export default StreamWarnComponent