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
          <span>One of the most effective ways to learn something new is through <b>spaced repetition</b>—a technique that involves reviewing and recalling information at increasing intervals of time until knowledge is fully embedded in long-term memory.</span>
          <span>Code By Heart is an application specifically <b>designed for developers and programming language learners</b> that leverages this memory technique and is based upon the <a href="https://www.supermemo.com/en/archives1990-2015/english/ol/sm2" target="_blank" rel="noreferrer">SM-2 spaced repetition algorithm</a>.</span>
          <span>It allows you to <b>create</b>, <b>execute</b>, and <b>save flashcards</b> in a particular programming language, and then later review these cards at optimally-spaced intervals—thus helping you learn code <a href="https://dictionary.cambridge.org/us/dictionary/english/by-heart" target="_blank" rel="noreferrer">by heart</a>.</span>
        </div>
        <div className="section1-body2">
          <div className="section1-body2-subtitle">
            Read More About Spaced Repetition & Coding
          </div>
          <ul className="section1-body2-list">
            <li>
              <a href="https://sive.rs/srs" target="_blank" rel="noreferrer">
                Why one developer described spaced repetition as "<b>the most helpful learning technique I've found in 14 years of computer programming</b>"
              </a>
            </li>
            <li>
              <a href="https://senrigan.io/blog/chasing-10x-leveraging-a-poor-memory-in-software-engineering/" target="_blank" rel="noreferrer">
                Why another developer says spaced repetition "<b>saved my software career</b>"
              </a>
            </li>
            <li>
              <a href="https://www.freecodecamp.org/news/why-i-studied-full-time-for-8-months-for-a-google-interview-cc662ce9bb13#.3d9qfnhq5" target="_blank" rel="noreferrer">
                How spaced repetition helped one developer <b>prepare for a big interview</b>
              </a>
            </li>
            <li>
              <a href="https://leetcode.com/discuss/general-discussion/1124635/how-to-leetcode-what-i-learned-from-a-year-of-leetcoding-challenge-problems" target="_blank" rel="noreferrer">
                How spaced repetition can help you <b>recognize problem-solving patterns</b> for tough technical interviews more broadly
              </a>
            </li>
          </ul>
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