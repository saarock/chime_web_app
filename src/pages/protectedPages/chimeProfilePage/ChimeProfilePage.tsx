
import { lazy, Suspense } from "react"
import "../../../styles/pages/ChimeProfilePage.css";


// lazy loading 
const ChimeProfileComponent = lazy(() => import("../../../components/ChimeProfileComponent/ChimeProfileComponent"));
const LoadingComponent = lazy(() => import("../../../components/LoadingComponent/LoadingComponent"));

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