export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}


export function userQuestionData(users, authUser, questions) {

  const answeredId = Object.keys(users[authUser].answers)
    .map(ansId => {
      return questions[ansId].id;
    })
    .sort((a, b) => a.timestamp - b.timestamp)
    .reverse();

    const unansweredId = Object.keys(questions)
    .map(question => {
      return question;
    })
    .sort((a, b) => a.timestamp - b.timestamp)
    .reverse()
    .filter(question => !answeredId.includes(question));

  return {
    userId: users[authUser].id,
    answeredId,
    unansweredId,
  };
}