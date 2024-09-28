//import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, ExpenseAddScreen } from './src/screens'
import { db, collection, auth, createUserWithEmailAndPassword, addDoc, signInWithEmailAndPassword } from './src/firebase/config';
import { doc, getDocFromCache, getDocs, query, where, } from "firebase/firestore";
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
export const AuthContext = React.createContext();
const Stack = createStackNavigator();
//export const AuthContextProvider = AuthContext.Provider;
export default function App({ navigation }) {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userData: action.data,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userData: action.data,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userData: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userData;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      console.log('In restore_token');
      console.log(userData);
      dispatch({ type: 'RESTORE_TOKEN', data: userData });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        console.log('In signIn');
        //const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            try {
              const q = query(collection(db, "users"), where("id", "==", user.uid));
              const querySnapshot = getDocs(q).then(data => {
                data.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  var doc = doc.data();
                  const data = {
                    id: user.uid,
                    email: doc.email,
                    username: doc.username,
                  };
                  console.log('dispatching');
                  dispatch({ type: 'SIGN_IN', data: data });
                });
              });
              // Document was found in the cache. If no cached document exists,
              // an error will be returned to the 'catch' block below.
              //console.log("Cached document data:", querySnapshot);
            } catch (e) {
              console.log("Error getting cached document:", e);
            }

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (username, email, password) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        createUserWithEmailAndPassword(auth, email, password)
          .then((response) => {
            const uid = response.user.uid
            const data = {
              id: uid,
              email,
              username,
            };
            try {
              //todo: how to insert doc with specific ID. to save useruid
              const usersRef = addDoc(collection(db, "users"), data)
                .then((res) => {
                  //console.log("Document written with ID: ", res.id);
                  dispatch({ type: 'SIGN_IN', data: data });
                });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          })
          .catch((error) => {
            alert(error)
          });
      },
    }),
    []
  );
  
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator>
          {state.userData != null ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={({ route }) => ({ title: 'Hi ' + state.userData.username })} />
              <Stack.Screen name="Add Expense" component={ExpenseAddScreen} />
            </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
