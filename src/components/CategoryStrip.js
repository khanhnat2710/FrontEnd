import { Button } from 'react-bootstrap';

function CategoryStrip({ categories, activeCategory, onSelectCategory }) {
  return (
    <section className="category-strip" id="categories" aria-label="Danh mục sách">
      {categories.map((category) => (
        <Button
          className={category === activeCategory ? 'active-category' : ''}
          variant="light"
          type="button"
          key={category}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </section>
  );
}

export default CategoryStrip;
