function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🐟</span>
          <span className="footer-name">MyRecipe</span>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} MyRecipe · Powered by{' '}
          <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">TheMealDB</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;