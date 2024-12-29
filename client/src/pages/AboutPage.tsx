export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="prose prose-lg">
          <p>
            Welcome to our online store! We are dedicated to providing high-quality
            products and exceptional customer service to our valued customers.
          </p>

          <h2>Our Story</h2>
          <p>
            Founded in 2024, we started with a simple mission: to make quality
            products accessible to everyone. Our journey began with a small
            collection of carefully curated items, and we've grown steadily since
            then, always maintaining our commitment to quality and customer
            satisfaction.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Quality:</strong> We carefully select each product to ensure
              it meets our high standards.
            </li>
            <li>
              <strong>Customer Service:</strong> We believe in building lasting
              relationships with our customers through excellent service.
            </li>
            <li>
              <strong>Transparency:</strong> We maintain open communication and
              honest business practices.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously adapt and improve to
              better serve our customers.
            </li>
          </ul>

          <h2>Our Promise</h2>
          <p>
            We promise to continue providing excellent products and service to our
            customers. Your satisfaction is our top priority, and we're always here
            to assist you with any questions or concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
