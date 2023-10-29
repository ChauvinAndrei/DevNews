// == COMPONENT
import Card from '../../../Card/Card';

import './ActuMain.scss';

const ActuMain = ( { toplikes } ) => {

    return (
        <>
        {toplikes.map((toplikeItem) => (

            <Card 
            {...toplikeItem.article} 
            categoryTopLike={toplikeItem.category} 
            likes={ toplikeItem.article.likes }
            contentType="Home"
            comment={ toplikeItem.comment}
            key={toplikeItem.article.id}/>

        ))}

        </>
    )

}

export default ActuMain;
