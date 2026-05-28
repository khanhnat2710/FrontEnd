import { Button, Form } from 'react-bootstrap';

function Hero({ data, searchTerm, onSearchTermChange, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">{data.eyebrow}</p>
        <h1>{data.title}</h1>
        <p>{data.description}</p>

        <Form className="search-box" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            value={searchTerm}
            placeholder={data.searchPlaceholder}
            onChange={(event) => onSearchTermChange(event.target.value)}
          />
          <Button type="submit">{data.searchButton}</Button>
        </Form>
      </div>

      <div className="hero-showcase" aria-label={data.showcaseLabel}>
        <div className="book-cover cover-main">
          <span>{data.coverBrand}</span>
          <strong>{data.coverTitle}</strong>
        </div>
        <div className="mini-card">
          <span>{data.dealLabel}</span>
          <strong>{data.dealText}</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;
