export function getDashboardStats(questions) {
  const completed = questions.filter((question) => question.status === 'Completed')

  return {
    totalQuestions: questions.length,
    completedDsa: completed.filter((question) => question.category === 'DSA').length,
    completedInterview: completed.filter(
      (question) => question.category === 'Git' || question.category === 'Technical',
    ).length,
  }
}
