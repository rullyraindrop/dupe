document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('show');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255,255,255,0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'white';
        }
    });
});
// Contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    try {
      const response = await fetch('http://localhost:3001/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok) {
        showFormMessage('Message sent successfully!', 'success');
        contactForm.reset();
      } else {
        showFormMessage(result.error || 'Error sending message', 'error');
      }
    } catch (error) {
      showFormMessage('Network error. Please try again.', 'error');
    }
  });
}

function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = type;
  setTimeout(() => formMessage.textContent = '', 5000);
}
