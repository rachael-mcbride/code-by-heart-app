import './review-flashcards-msg.styles.scss'
import { ReactComponent as Logo } from '../../assets/heart-logo-small.svg'

const ReviewFlashcardsMsg = () => {
  return (
    <div className="review-msg-container">
      <div className='logo-wrapper'>
        <Logo className='logo' />
      </div>
      <div className="review-session-finished">
        <div className="review-session-finished-msg">
          <div>Select or create a deck</div>
        </div>
      </div>
        <div className='logo-wrapper'>
          <Logo className='logo' />
        </div>
      </div>
  );
}

export default ReviewFlashcardsMsg;