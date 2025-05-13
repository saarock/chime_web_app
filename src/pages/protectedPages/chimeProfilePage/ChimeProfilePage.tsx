
import { lazy, Suspense } from "react"
import "../../../styles/index"

// lazy loading 
const ChimeProfileComponent = lazy(() => import("../../../components/chimeProfileComponent/ChimeProfileComponent"));
const LoadingComponent = lazy(() => import("../../../components/loadingComponent/LoadingComponent"));




const ChimeProfilePage = () => {

    return (
        <div className="chime-your-own-container">
            <Suspense fallback={<LoadingComponent />}>
                <ChimeProfileComponent />
            </Suspense>
        </div>
    )
}

export default ChimeProfilePage