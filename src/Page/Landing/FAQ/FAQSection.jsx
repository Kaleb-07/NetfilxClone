import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQSection.css';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is Netflix?",
            answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
        },
        {
            question: "How much does Netflix cost?",
            answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from US$6.99 to US$22.99 a month. No extra costs, no contracts."
        },
        {
            question: "Where can I watch?",
            answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\nYou can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
        },
        {
            question: "How do I cancel?",
            answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
        },
        {
            question: "What can I watch on Netflix?",
            answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
        },
        {
            question: "Is Netflix good for kids?",
            answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.\n\nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."
        }
    ];

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleGetStarted = (e) => {
        e.preventDefault();

        const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
        const isRegistered = registeredEmails.includes(email.toLowerCase());

        if (isRegistered) {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
            const username = registeredUsers[email.toLowerCase()] || "User";

            localStorage.setItem('currentUser', JSON.stringify({
                username: username,
                email: email.toLowerCase()
            }));

            navigate('/home');
        } else {
            navigate('/signup', { state: { email } });
        }
    };

    return (
        <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <button className="faq-question" onClick={() => toggleAccordion(index)}>
                            {faq.question}
                            {activeIndex === index ? <CloseIcon /> : <AddIcon />}
                        </button>
                        <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="faq-cta">
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                <form className="hero-form" onSubmit={handleGetStarted}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">
                        Get Started
                        <span className="button-arrow">›</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FAQSection;
