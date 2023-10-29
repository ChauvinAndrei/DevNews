import axios from "axios"
import DOMPurify from 'dompurify';

export const getData = async ( url ) => {
    const { data } = await axios.get(url)
    return data;
}

export const postData = async (url, payload) => {
    const { data } = await axios.post(url, payload);
    return data;
};


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomSubset(array, size) {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, size); 
}

export const getCurrentThemeInfo = (menuItems, themes, activeIndex) => {
    const currentPageTheme = menuItems[activeIndex];
    const theme = currentPageTheme && themes[currentPageTheme.label.toLowerCase()];
    const isThemeExist = currentPageTheme && 'themes' in currentPageTheme;

    return { currentPageTheme, theme, isThemeExist };
};


export function checkTheme(theme, currentLabel) {
    return currentLabel === 'Home' && theme;
}

export function getCurrentTime( time ) {
    const currentTime = new Date(time);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedPublicationDate = currentTime.toLocaleDateString('fr-FR', options);

    return formattedPublicationDate;
}


export const handleLastObjectIntoView = (parent, lastElement) => {
    
    const lastChild = lastElement?.children[lastElement.children.length - 1];

    if (lastChild) {
      const scrollOptions = {
        top: lastChild.offsetTop,  
        behavior: "smooth",     
      };
      
      parent.scrollTo(scrollOptions);
    }
};
  
export const getCleanHtml = (content) => {

    const formattedValue = content.replace(/\n/g, "<br>");

    const cleanUp = DOMPurify.sanitize(formattedValue);
    return {
      __html: cleanUp,
    };
}

