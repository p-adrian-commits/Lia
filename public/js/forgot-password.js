document.addEventListener('DOMContentLoaded', () => {
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');

  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value;

    // Simulate sending a password reset email without Firebase
    if (email) {
      successMessage.textContent = 'Password reset email sent! Please check your inbox.';
      errorMessage.textContent = '';
    } else {
      errorMessage.textContent = 'Please enter your email address.';
      successMessage.textContent = '';
    }
  });
});
