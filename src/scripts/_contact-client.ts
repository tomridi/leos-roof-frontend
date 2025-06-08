document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const messageBox = document.getElementById('form-message') as HTMLDivElement;
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

  function showMessage(text: string, success = true) {
    messageBox.textContent = text;
    messageBox.className = `mt-4 text-sm font-semibold ${
      success ? 'text-green-600' : 'text-red-600'
    }`;
    messageBox.classList.remove('hidden');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    messageBox.classList.add('hidden'); // reset before new message

    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        showMessage(result.message, true);
        form.reset();
      } else {
        showMessage(result.message, false);
      }
    } catch (err) {
      console.error('Form error:', err);
      showMessage('An unexpected error occurred. Please try again.', false);
    } finally {
      submitBtn.disabled = false;
    }
  });
});
