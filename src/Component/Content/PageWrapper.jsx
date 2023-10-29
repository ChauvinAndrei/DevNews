import { useRef } from 'react';
import Page from "../Page/Page";

/**
 * 
 * @param {React.ComponentType} ContentComponent - Retourne le composant ciblé depuis la route
 * @returns - retourne le composant avec son wrapper Page
 */
const withPageWrapper = (ContentComponent) => {

  return ({ isActive, label, icon, isMobile, isMatching, isLoading }) => {


    const mainContentRef = useRef(null);                    // - recuperation de l'élement inner wrapper

    // =======
    
    // ========

      return (
        <Page isActive={isActive} isMatching={isMatching}>                        {/* - passage de l'information de la page active au click du lien */}
     
          <div className={`main--wrapper--div-inner ${label}`} ref={ mainContentRef }>

            <ContentComponent 
            isActive={ isActive } 
            label={ label }
            isMobile={ isMobile }
            isMatching={ isMatching }
            isLoading={ isLoading }
            icon={ icon }/>              {/* - Composant trouver en retour du params ContentComponent et affichage au changement de la route */}

          </div>
          
        </Page>
      );
  };

};

export default withPageWrapper;