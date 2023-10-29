import { getRandomSubset, checkTheme } from "../../utils";

export function filteredArticles(itemsArray, currentPagetheme, slug, currentLabel) {

    const filteredTheme = currentPagetheme?.find((item) => item.name === slug);

    const filteredArticlesArray = itemsArray.filter((item) => {
        return item.category_id == filteredTheme.id;
    });

    return checkTheme(slug, currentLabel) ?  getRandomSubset(filteredArticlesArray, 5) : filteredArticlesArray;
}

export function filteredTopLikes (array){

    const filterByOrder = array.sort((a, b) => {
      return b.likes - a.likes;
    })
  return filterByOrder;
}

export function filteredByLatestCreate (array){

    const descOrder = array.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return descOrder;
}


export function filteredByLatestCreateForum (array){

   const sorted = [...array].sort((a, b) => {

    const dateA = new Date(a.post.created_at);
    const dateB = new Date(b.post.created_at);

    return dateB - dateA;

   })
  
    return sorted;
}
