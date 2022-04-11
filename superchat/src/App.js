import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useState } from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyBQcFjqGIDKXoQ0kSeXWXQNkeMMyTSTAQY",
  authDomain: "talk-to-me-fca85.firebaseapp.com",
  projectId: "talk-to-me-fca85",
  storageBucket: "talk-to-me-fca85.appspot.com",
  messagingSenderId: "176127170227",
  appId: "1:176127170227:web:dbe616649d8a3c69f442c6",
  measurementId: "G-2KVNT8ZC25"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const[user] = useAuthState(auth)

  return (
    <div className="App">
        <section>
        {user ? <ChatRoom/> : <SignIn />}
      </section>

      <header className="App-header">
      </header>

  
    </div>
  );
}

function SignIn(){
const signInWithGoogle=()=>{
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

  return(
    <button onClick={signInWithGoogle}>Sign in!</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=>auth.signOut}>Sign Out</button>
  )
}

function ChatRoom(){

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25)

  const[messages] = useCollectionData(query, {idfield: 'id'})
  const [formvalue, SetFormValue] = useState('');

  return(
    <>
      <div>
        {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg}/>)}
      </div>

      <form>

      <input/>

      <button type="submit">🚀</button>

      </form>

    </>
  )

    function ChatMessage(props){
      const{text, uid, photoURL} = props.message;
      const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

      return(
      <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
      </div>
      
      )
    }

}

export default App;
