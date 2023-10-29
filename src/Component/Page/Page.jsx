
import './Page.scss';

// == Structure de base a la creation d'une route + le inner wrapper

const Page = ( { children, isActive, isMatching } ) => {

    return (
        <main className={`main--wrapper ${isActive || isMatching ? 'active' : ''}`}>
            <div className='main--wrapper--div'>
                {/*  => {inner wrapper} */}
                    {children}  
                {/* => {inner wrapper} */}                        
            </div>
        </main>
    )
}

export default Page;