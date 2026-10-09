import QuestionItem from './QuestionItem.jsx'

function QuestionList({ questions, onStatusChange, onDelete }) {
  return (
    <div className="grid gap-[9px]" aria-label="Questions">
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default QuestionList
