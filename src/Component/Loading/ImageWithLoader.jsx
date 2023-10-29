import { useState, useEffect } from "react";
import LoadingItem from "./loadingItem";


const ImageWithLoader = ({ src, alt, className }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    useEffect(() => {
        if (!isLoading) {

            setTimeout(() => {
                setShowLoader(false);
            }, 500);
        }
    }, [isLoading]);

    return (
        <>
            {showLoader && (
                <LoadingItem className={isLoading ? '' : 'fadeOut'}/>
            )}

            {isError ? (
                <span>Error loading image</span>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
        </>
    );
};

export default ImageWithLoader;