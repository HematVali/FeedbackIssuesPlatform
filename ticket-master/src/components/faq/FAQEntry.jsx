const FAQEntry = ({ question, answer }) => {
    return (
        <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
                {question}
            </div>
            <div className="collapse-content">
                <p>{answer}</p>
            </div>
        </div>
    )
}

export default FAQEntry;