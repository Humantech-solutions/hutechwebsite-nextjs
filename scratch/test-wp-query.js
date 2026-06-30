const query = `{
  hutechTestimonials(first: 5) {
    nodes {
      title
      content
    }
  }
}`;

fetch('http://localhost/hutech-website/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
