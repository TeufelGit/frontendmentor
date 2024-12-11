document.addEventListener('DOMContentLoaded', function() {
    function handleArrowKeys(event, currentIndex) {
        const questions = Array.from(document.querySelectorAll('.faq-question'));
        let newIndex;

        if (event.key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % questions.length;
        } else if (event.key === 'ArrowUp') {
            newIndex = (currentIndex - 1 + questions.length) % questions.length;
        } else {
            return;
        }

        event.preventDefault();
        questions[newIndex].focus();
    }

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => toggleFAQ(item, question, answer));

        question.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleFAQ(item, question, answer);
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                handleArrowKeys(event, index);
            }
        });
    });

    function toggleFAQ(item, question, answer) {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';

        // Close all other items
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherAnswer.hidden = true;
            }
        });

        // Toggle the clicked item
        question.setAttribute('aria-expanded', !isExpanded);
        answer.hidden = isExpanded;

        // No need to manually change icon visibility, CSS will handle it
    }

    // Open the first FAQ item by default
    const firstQuestion = faqItems[0].querySelector('.faq-question');
    const firstAnswer = faqItems[0].querySelector('.faq-answer');
    firstQuestion.setAttribute('aria-expanded', 'true');
    firstAnswer.hidden = false;

    // Set focus to the first question
    faqItems[0].querySelector('.faq-question').focus();
});
