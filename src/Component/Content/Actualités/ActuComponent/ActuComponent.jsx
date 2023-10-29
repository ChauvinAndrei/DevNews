import Card from '../../../Card/Card';

const ActuComponent = ( { articles , label} ) => {

    return (
        <>
            {articles?.map((articleItem) => (
                <Card {...articleItem} contentType="Actualités" key={articleItem.id} />
            ))}
        </>
    )

}

export default ActuComponent;
