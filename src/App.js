import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import Header from "./components/header/header.component";
import LandingPage from "./pages/landing-page/landing-page.component";
import FlashcardPage from "./pages/flashcard-page/flashcard-page.component";
import NotFoundPage from "./pages/not-found-page/not-found-page.component";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null; // class method?

  // lets our app listen to authentication state changes
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  // will close subscription upon app unmounting (clean up function)
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const SignInWrapper = ({ children, currentUser }) => {
      return currentUser ? <Navigate to="/flashcards" replace /> : children;
    };

    const SignOutWrapper = ({ children, currentUser }) => {
      return currentUser ? children : <Navigate to="/" replace />;
    };

    // Note to self - CONSIDER ADDING A "PAGE NOT FOUND" ROUTE
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route
            path="/"
            element={
              <SignInWrapper currentUser={this.state.currentUser}>
                <LandingPage />
              </SignInWrapper>
            }
          />
          <Route
            path="/flashcards"
            element={
              <SignOutWrapper currentUser={this.state.currentUser}>
                <FlashcardPage currentUser={this.state.currentUser} />
              </SignOutWrapper>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
  }
}

// Note to self: can't figure out how to use hooks instead of classes here! Too confused!
// Question: Should I convert this over with the help of a teacher/TA so I don't have 2 different styles in one project?
// const App = () => {
//   [currentUser, setCurrentUser] = useState(null);
//   // let unsubscribeFromAuth = null;

// Note: this would take the place of componentDidMount
//   useEffect(() => {
//     const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);
//           userRef.onSnapshot((snapShot) => {
//             setCurrentUser({
//               currentUser: {
//                 id: snapShot.id,
//                 ...snapShot.data(),
//               },
//             });
//           });
//         }
//         this.setState({ currentUser: userAuth }); // sets currentUser to null if user logs out
//   }, [currentUser])

// Note: this would take the place of componentWillUnmount
// unEffect(() => {
// const unsubscribeFromAuth = something

// return () => {
//   unsubscribeFromAuth();
// }
// }, [])
// }

export default App;
