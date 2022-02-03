import React from 'react';
import { ReactComponent as Logo } from '../../assets/heart-logo.svg'
import './landing-page.styles.scss'


const LandingPage = () => (
  <div className="landing-page">
    <div className="title">
      Code By Heart
    </div>
    <div className="two-sections">
      <div className="section1">
        <div className="section1-title">About the App</div>
        <div className="section1-body">
          <span>One of the most effective ways to learn something new is through <b>spaced repetition</b>--a technique that involves reviewing and recalling information at spaced intervals until knowledge is fully  embedded in long-term memory.</span>
          <span>Code By Heart is an application specifically <b>designed for developers and programming language learners</b> that leverages spaced repetition and is based upon the <a href="https://www.supermemo.com/en/archives1990-2015/english/ol/sm2" target="_blank">SM-2 algorithm</a>.</span>
          <span>It allows a user to <b>create</b>, <b>execute</b>, and <b>save flashcards</b> in a particular programming language or markdown, and then later review these cards at spaced intervals for optimum retention.</span>
        </div>
        <div className="section1-body2">
          <div className="section1-body2-subtitle">
            Read More About Spaced Repetition & Coding
          </div>
          <div className="section1-body2-list">
            <a href="https://sive.rs/srs" target="_blank">
              Why One Developer Describes Spaced Repetition as "<b>the most helpful learning technique I've found in 14 years of computer programming</b>"
            </a>
            <a href="https://www.freecodecamp.org/news/why-i-studied-full-time-for-8-months-for-a-google-interview-cc662ce9bb13#.3d9qfnhq5" target="_blank">
              How Spaced Repetition Helped Another Developer Prep for a Google Interview
            </a>
            <a href="https://leetcode.com/discuss/general-discussion/1124635/how-to-leetcode-what-i-learned-from-a-year-of-leetcoding-challenge-problems" target="_blank">
              How Spaced Repetition Can Help with Leetcode-Style Interviews More Broadly
            </a>
            <a>One more link here</a>
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="section2-title">Get Started</div>
        <div className="section2-body">
          <span>Click the <b>sign-in button</b> above to sign in with your Google account. </span>
          <div>If it's your first time signing in, an account will be created for you, and any decks and/or flashcards you create will be saved to this account.</div>
          <div className='logo-wrapper'>
            <Logo className='logo' />
          </div>
        </div>
      </div>
    </div>
  </div>
  );

export default LandingPage;