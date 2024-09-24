import FAQEntry from "./FAQEntry";

const FAQ = () => {
    return (
        <section className="min-h-[80vh] py-16 px-72 grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-primary">FAQ</h2>
                <h1 className="text-black font-bold text-4xl">Frequently Asked Questions</h1>
                <p>To prevent waiting for a member of staff to handle your request, please refer to this FAQ to see if your question has already been answered.</p>
            </div>


            <div className="join join-vertical w-full">
                <FAQEntry question="How do I create an account?" answer="To create an account, click on the 'Sign Up' button on the top right corner of the page. Fill in your details and click 'Submit'." />
                <FAQEntry question="How do I create a ticket?" answer="To create a ticket, click on the 'Create Ticket' button on the dashboard. Fill in the details and click 'Submit'." />
                <FAQEntry question="How do I view my tickets?" answer="To view your tickets, click on the 'My Tickets' button on the dashboard." />
                <FAQEntry question="How do I view resolved tickets?" answer="To view resolved tickets, click on the 'Resolved Tickets' button on the dashboard." />
                <FAQEntry question="How do I log out?" answer="To log out, click on the 'Log Out' button on the dashboard." />
            </div>
        </section>
    );
}
export default FAQ;