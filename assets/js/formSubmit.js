const contactForm = document.querySelector('.contact-form');

// Form Validation
if (contactForm) {
  // Get alert elements
  const successAlert = document.querySelector('.alert-success');
  const errorAlert = document.querySelector('.alert-error');
  const alertCloseBtns = document.querySelectorAll('.alert-close');

  // Close alert function
  const closeAlert = (alert) => {
    alert.classList.remove('show');
    setTimeout(() => {
      alert.style.display = 'none';
    }, 300);
  };

  // Show alert function
  const showAlert = (alert) => {
    alert.style.display = 'flex';
    setTimeout(() => {
      alert.classList.add('show');
    }, 10);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      closeAlert(alert);
    }, 5000);
  };

  // Close buttons event listeners
  alertCloseBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      closeAlert(this.closest('.alert'));
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');

    // Validate Name
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
      nameInput.nextElementSibling.textContent = 'Name is required';
      isValid = false;
    }

    // Validate Email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      emailInput.nextElementSibling.textContent = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.nextElementSibling.textContent = 'Please enter a valid email';
      isValid = false;
    }

    // Validate Subject
    const subjectInput = document.getElementById('subject');
    if (subjectInput.value.trim() === '') {
      subjectInput.nextElementSibling.textContent = 'Subject is required';
      isValid = false;
    }

    // Validate Message
    const messageInput = document.getElementById('message');
    if (messageInput.value.trim() === '') {
      messageInput.nextElementSibling.textContent = 'Message is required';
      isValid = false;
    }

    // If form is valid, submit it
    if (isValid) {
      try {
        // For Netlify Forms
        const formData = new FormData(contactForm);

        // Show loading state (optional)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Submit to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
          // Show success alert
          showAlert(successAlert);
          // Reset form
          contactForm.reset();
        } else {
          // Show error alert
          showAlert(errorAlert);
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        // Show error alert
        showAlert(errorAlert);
        console.error('Error:', error);
      } finally {
        // Reset button state
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    }
  });
}