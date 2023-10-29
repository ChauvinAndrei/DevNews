import FormInscription from '../Inscription/forminscription/FormInscription';
import withPageWrapper from '../PageWrapper';

const Inscription = ({ positionTitle, label, isMatching, isActive }) => {

    return (
    
        <div id="main-content" className="main-content grid-content">
            <h2 
                className={`menu--title${isActive || isMatching ? ' active': ''}`} 
                style={positionTitle}
            >
                { label }
            </h2>
            <div className="duContenu">
                <FormInscription />
            </div>
        </div>
    );
}

const WrapperInscription = withPageWrapper(Inscription);

export default WrapperInscription;

