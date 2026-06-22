
async function check() {
  const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://localhost/hutech-website/graphql";
  const query = `
    query TestQuery {
      pages(where: { title: "Contact" }) {
        nodes {
          title
          contactPageFields {
            contactHeroTitle
            contactFormTitle
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    console.log("Contact Us Query:", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
}

check();
