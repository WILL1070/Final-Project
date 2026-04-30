// script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        // Show loading state
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
        formStatus.className = 'form-status';
        formStatus.innerText = '';

        try {
            // Send request to Cloudflare Worker endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Success
            formStatus.innerText = 'Message sent successfully! I will get back to you soon.';
            formStatus.className = 'form-status success';
            contactForm.reset();
        } catch (error) {
            // Error
            formStatus.innerText = 'Oops! Something went wrong. Please try again.';
            formStatus.className = 'form-status error';
        } finally {
            // Reset button
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}
