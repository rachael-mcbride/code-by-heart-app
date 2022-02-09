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

  unsubscribeFromAuth = null;

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

  // clean up function
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

export default App;
