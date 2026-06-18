import { Button } from 'react-bootstrap';

function CategoryStrip({ categories, selectedCategory, onSelectCategory }) {
  return (
    <section className="category-strip" id="categories" aria-label="Danh mục sách">
      {categories.map((category) => (
        <Button
          className={category === selectedCategory ? 'active-category' : ''}
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
