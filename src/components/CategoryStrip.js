import { Button } from 'react-bootstrap';

function CategoryStrip({ categories }) {
  return (
    <section className="category-strip" id="categories" aria-label="Danh mục sách">
      {categories.map((category) => (
        <Button variant="light" type="button" key={category}>
          {category}
        </Button>
      ))}
    </section>
  );
}

export default CategoryStrip;
