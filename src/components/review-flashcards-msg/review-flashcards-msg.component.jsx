const ReviewFlashcardsMsg = (decksLength) => {
  let msg = "Select a deck to review"
  if (decksLength === 0) {
    msg = "To get started, create a new deck and add some flashcards"
  }

  return (msg)
}

export default ReviewFlashcardsMsg;