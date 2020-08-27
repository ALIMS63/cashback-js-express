const container = document.getElementById('container');

if (container) {
  container.addEventListener('click', async (event) => {
    if (event.target.getAttribute('id') === 'passGen') {
      const passGen = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
      event.target.previousElementSibling.value = passGen;
    }
  })
}
