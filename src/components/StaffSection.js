import { Card, ProgressBar } from 'react-bootstrap';

function StaffSection({ staffTasks }) {
  return (
    <Card className="data-card h-100">
      <Card.Body>
        <div className="section-head">
          <div>
            <p className="section-kicker">Vận hành</p>
            <h3>Tiến độ công việc nhân viên</h3>
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
          <h4>Nhập thêm sách kỹ năng sống và thiếu nhi</h4>
          <p className="mb-0">
            Dữ liệu 14 ngày cho thấy 2 nhóm này có biên lợi nhuận tốt và tốc độ quay vòng nhanh.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StaffSection;
