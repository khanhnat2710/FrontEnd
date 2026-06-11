import { Button } from 'react-bootstrap';

// Component nhận prop categories từ App.js.
// categories là một mảng chuỗi, ví dụ: ['Văn học', 'Kinh tế', ...].
function CategoryStrip({ categories }) {
  return (
    <section className="category-strip" id="categories" aria-label="Danh mục sách">
      {/* map tạo một Button cho mỗi danh mục; key giúp React nhận diện từng phần tử trong danh sách. */}
      {categories.map((category) => (
        <Button variant="light" type="button" key={category}>
          {category}
        </Button>
      ))}
    </section>
  );
}

export default CategoryStrip;
