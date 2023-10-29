
import './Loading.scss';

const LoadingComment = ( { isLoading }) => {

    return (
        <div className={`wrapper-loading-comment ${isLoading ? "" : "fadeOut"}`}>
           <span className="loader"></span>
        </div>
    )
}

export default LoadingComment;