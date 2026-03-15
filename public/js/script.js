(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Update rating display value in real-time
const ratingInput = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

if (ratingInput && ratingValue) {
  ratingInput.addEventListener('input', (e) => {
    ratingValue.textContent = e.target.value;
  });
}