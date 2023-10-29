import './Loading.scss';
import { useSelector } from "react-redux";

const Loading = (  ) => {

    const isLoading = useSelector(state => state.page.isLoading);
    
    return (
        <div className={`wrapper-loading ${isLoading ? "" : "fadeOut"}`}>
           <span className="loader"></span>
        </div>
    )
}

export default Loading;