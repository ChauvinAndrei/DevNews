// == styles
import './Widget.scss'


const WidgetPopulaire = ( props ) => {

    return (
            <div className="widgetPopulaire--wrapper">

                <div className='widget--title'>
                    <h3>Populaire</h3>
                </div>

                 <div className='widgetPopulaire--content'>
                     { props.children }
                 </div>
            </div>
    )
    
}

const WidgetMessage = ( props ) => {


    return (
        <div className="widgetMessage--wrapper">

            <div className='widget--title'>
                <h3>Message</h3>
            </div>

            <div className='widgetMessage--content'>
               { props.children }
            </div>

        </div>
    )

}

export {WidgetPopulaire, WidgetMessage};