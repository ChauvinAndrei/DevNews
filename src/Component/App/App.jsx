import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect} from 'react';
import pusher from "../../Pusher/Pusher";



// == COMPONENT
import { MenuDispatch } from '../Menu/MenuDispatch';

import Home from '../Content/Home/Home';
import Profil from '../Content/Profil/Profil';
import Connexion from '../Content/Connexion/Connexion';
import Inscription from '../Content/Inscription/Inscription';
import Actualités from '../Content/Actualités/Actualités';
import Forum from '../Content/Forum/Forum';
import Search from "../HeaderMain/Search/SearchResponse";

import SingleArticle from '../Content/SingleArticle/SingleArticle';
// == UTILS
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
// == STYLES

import './App.scss';
import HeaderMain from '../HeaderMain/HeaderMain';
import Loading from '../Loading/Loading';
import { Error } from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedComponent';

// === ACTION
import { addOneNotif } from "../../Action/user";

const App = () => {

  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.User.currentUserProfil);  // === recuperation de l'id de l'utilisateur
  
  const currentLocation = useLocation();
  
  const { isLoggedIn } = useSelector((state) => state.User);

  const { NavLinks } = useSelector((state) => state.page);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1080);           //- == Check si format mobile ou desktop
  const isLoading = useSelector(state => state.page.isLoading);
  

   //====== 

    const handlePage = (label) => {

      const filterLinks =  NavLinks.find((link) => link.label === label )       // filtre le tableau créer au préalable et check lors du mappage du tableau qu'elle label est retourner

      const components = {
        Actualités,
        Home,
        Profil,
        Connexion,
        Forum,
        Inscription,
        Search,
      };
      
      const Component = components[label];
      return (
        <ProtectedRoute                                                          // HOC et gestion de route proteger puis creation du composant demander
          label={label}
          isLoggedIn={isLoggedIn}
          >
          {Component ? <Component {...filterLinks} isMobile={ isMobile } label={label} /> : null}
        </ProtectedRoute>
      );
    
    }

    //======                                                                    //- == Check du premier rendu pour connaitre le format a afficher

      useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth < 1120);
        }

        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);       //- == Reset de l'écoute d'évenement
        
    }, [])


   

   //====== 
    
   const [showLoader, setShowLoader] = useState(isLoading);

   useEffect(() => {
       if (!isLoading) {

           const timeoutId = setTimeout(() => {
               setShowLoader(false);
           }, 500); 

           return () => {
               clearTimeout(timeoutId);
           };
       } else {
           setShowLoader(true);
       }
   }, [isLoading]);

  //====== 

  const navigate = useNavigate();

  useEffect(() => {
    if (currentLocation.pathname === '/') {
      navigate('/home');
    }
  }, [currentLocation.pathname, navigate]);

    // ====== PUSHER REQUEST

    useEffect(() => {
        const channel = pusher.subscribe('my-channel');

        channel.bind('notification-'+id, function (data) {

            const newNotif = data;

            dispatch(addOneNotif());

        });
    });


  // ========


  
  return (

    // autoHide={false}

    <SimpleBar className='App' style={{ maxHeight: '100vh' }}>

          <HeaderMain />

            <div className='app--container'>

              <MenuDispatch isMobile={isMobile}/>


              <Routes>

                {NavLinks.map((pageLink, index) => (

                  <React.Fragment key={pageLink.label}>

                    <Route
                      key={pageLink.label}
                      path={`/actualités/:articleTitle/:id`}             //- ===== Route de base et filtre actualité unique
                      element={<SingleArticle />}
                    />
                    <Route
                      key={pageLink.label}
                      path={`${pageLink.to}/:theme`}
                      element={<>{handlePage(pageLink.label)}</>}       //- ===== Route de base et filtre par themes
                    />
                    <Route
                      key={pageLink.label}
                      path={`${pageLink.to}`}                          //- ===== Route de base sans aucun theme
                      element={<>{handlePage(pageLink.label)}</>}
                    />

                  </React.Fragment>
                ))}

                <Route path="/search" label={'Search'} element={<>{handlePage('Search')}</>} />

                <Route path="*" element={<Error/>} />

          </Routes>
        

              </div>


              {showLoader && <Loading className={!isLoading ? `fadeOut` : ''}/>}

    </SimpleBar>


    );
};

export default App;

