import { Card } from 'react-bootstrap';

function PageHeader({ eyebrow, title, description }) {
  return (
    <Card className="hero-panel page-header-panel">
      <Card.Body>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="page-title">{title}</h2>
        <p className="hero-text page-description">{description}</p>
      </Card.Body>
    </Card>
  );
}

export default PageHeader;
