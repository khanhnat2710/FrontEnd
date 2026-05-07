import { Card, ProgressBar } from 'react-bootstrap';

function StaffSection({ staffTasks }) {
  return (
    <Card className="data-card h-100">
      <Card.Body>
        <div className="section-head">
          <div>
            <p className="section-kicker">Vận hành</p>
            <h3>Tiến độ công việc nhân sự</h3>
          </div>
        </div>
        {staffTasks.map((task) => (
          <div className="task-block" key={task.label}>
            <div className="task-head">
              <span>{task.label}</span>
              <strong>{task.progress}%</strong>
            </div>
            <ProgressBar now={task.progress} />
          </div>
        ))}

        <div className="insight-panel">
          <p className="section-kicker mb-2">Gợi ý hệ thống</p>
          <h4>Ưu tiên cân bằng ca trực và tồn kho sắp hết</h4>
          <p className="mb-0">
            Dữ liệu này được đồng bộ từ trạng thái nhân sự và sản phẩm, nên thay đổi CRUD sẽ phản ánh ngay tại đây.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StaffSection;
