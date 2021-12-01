import { useState, useEffect, createContext } from 'react';
import { auth, db } from '../utils/firebase-config';
import { getFirstElementArrayCollection } from '../Parsers';

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const createUser = async (user, uid) => {
    await db.collection('users').doc(uid).set(user);
  };

  const getUserByEmail = async (correo, collection) => {

    if(collection === "pacientes"){
      const usersReference = db.collection('pacientes')
      const snapshot = await usersReference.where('email', '==', correo).get();

      if (!snapshot.size) return null;
        const loggedUser = getFirstElementArrayCollection(snapshot);
        return loggedUser;
      
    } else if(collection === "especialistas"){
      const usersReference = db.collection('especialistas')
      const snapshot = await usersReference.where('email', '==', correo).get();

      if (!snapshot.size) return null;
        const loggedUser = getFirstElementArrayCollection(snapshot);
        return loggedUser;

    } else if(collection === "especialistas_pendientes"){
      const usersReference = db.collection('especialistas_pendientes')
      const snapshot = await usersReference.where('email', '==', correo).get();

      if (!snapshot.size) return null;
        const loggedUser = getFirstElementArrayCollection(snapshot);
        return loggedUser;
    } else{
      const usersReference = db.collection('users')
      const snapshot = await usersReference.where('email', '==', correo).get();

      if (!snapshot.size) return null;
        const loggedUser = getFirstElementArrayCollection(snapshot);
        return loggedUser;
    }

  };
  
  // const getUserByEmail = async (email) => {
  //   const usersReference = db.collection('users');
  //   const snapshot = await usersReference.where('email', '==', email).get();

  //   if (!snapshot.size) return null;

  //   const loggedUser = getFirstElementArrayCollection(snapshot);

  //   return loggedUser;
  // };


  useEffect(() => {

    
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      if (loggedUser) {
        const profile = await getUserByEmail(loggedUser.email, "pacientes" );
        const profile2 = await getUserByEmail(loggedUser.email, "especialistas" );
        const profile3 = await getUserByEmail(loggedUser.email, "especialistas_pendientes" );
        
        if (!profile && !profile2 && !profile3) {
          const newProfile = {
            name: loggedUser.displayName,
            email: loggedUser.email,
          };
          await createUser(newProfile, loggedUser.uid);
          setUser(newProfile);
        } else if (profile){
          setUser(profile);
        } else if (profile2){
          setUser(profile2);
        } else if (profile3){
          setUser(profile3);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        createUser,
        getUserByEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}