import { useMemo, useState } from 'react';
import { Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';

const defaultFormState = {
  fullName: '',
  role: 'Nhân viên bán hàng',
  email: '',
  phone: '',
  shift: 'Ca sáng',
  status: 'Đang làm việc',
};

function StaffManagementSection({ staffMembers, onCreateStaff, onDeleteStaff, onUpdateStaff }) {
  const [formState, setFormState] = useState(defaultFormState);
  const [editingStaffId, setEditingStaffId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const staffSummary = useMemo(() => {
    const totalStaff = staffMembers.length;
    const activeStaff = staffMembers.filter((staff) => staff.status === 'Đang làm việc').length;
    const morningShift = staffMembers.filter((staff) => staff.shift === 'Ca sáng').length;

    return { totalStaff, activeStaff, morningShift };
  }, [staffMembers]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormState(defaultFormState);
    setEditingStaffId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingStaffId) {
      await onUpdateStaff(editingStaffId, formState);
      setFeedbackMessage('Đã cập nhật nhân sự.');
    } else {
      await onCreateStaff(formState);
      setFeedbackMessage('Đã thêm nhân sự mới.');
    }

    resetForm();
  };

  const handleEdit = (staffMember) => {
    setEditingStaffId(staffMember.id);
    setFormState({
      fullName: staffMember.fullName,
      role: staffMember.role,
      email: staffMember.email,
      phone: staffMember.phone,
      shift: staffMember.shift,
      status: staffMember.status,
    });
    setFeedbackMessage(`Đang chỉnh sửa: ${staffMember.fullName}`);
  };

  const handleDelete = async (staffId) => {
    await onDeleteStaff(staffId);

    if (editingStaffId === staffId) {
      resetForm();
    }

    setFeedbackMessage('Đã xóa nhân sự.');
  };

  return (
    <section className="mt-4">
      <Row className="g-4">
        <Col xl={5}>
          <Card className="data-card h-100">
            <Card.Body>
              <div className="section-head">
                <div>
                  <p className="section-kicker">Biểu mẫu</p>
                  <h3>{editingStaffId ? 'Cập nhật nhân sự' : 'Thêm nhân sự mới'}</h3>
                </div>
              </div>

              <Form className="product-form" onSubmit={handleSubmit}>
                <Form.Group controlId="staff-full-name">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control name="fullName" value={formState.fullName} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="staff-role">
                  <Form.Label>Chức vụ</Form.Label>
                  <Form.Select name="role" value={formState.role} onChange={handleChange}>
                    <option value="Quản trị viên">Quản trị viên</option>
                    <option value="Nhân viên kho">Nhân viên kho</option>
                    <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="staff-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" value={formState.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="staff-phone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control name="phone" value={formState.phone} onChange={handleChange} required />
                </Form.Group>

                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group controlId="staff-shift">
                      <Form.Label>Ca làm</Form.Label>
                      <Form.Select name="shift" value={formState.shift} onChange={handleChange}>
                        <option value="Ca sáng">Ca sáng</option>
                        <option value="Ca chiều">Ca chiều</option>
                        <option value="Ca tối">Ca tối</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="staff-status">
                      <Form.Label>Trạng thái</Form.Label>
                      <Form.Select name="status" value={formState.status} onChange={handleChange}>
                        <option value="Đang làm việc">Đang làm việc</option>
                        <option value="Đang nghỉ phép">Đang nghỉ phép</option>
                        <option value="Ngừng làm việc">Ngừng làm việc</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="hero-actions mt-4">
                  <Button type="submit" variant="dark">
                    {editingStaffId ? 'Lưu thay đổi' : 'Tạo nhân sự'}
                  </Button>
                  <Button type="button" variant="outline-dark" onClick={resetForm}>
                    Làm mới
                  </Button>
                </div>
              </Form>

              <div className="insight-panel">
                <p className="section-kicker mb-2">Tổng quan nhanh</p>
                <h4>{staffSummary.totalStaff} nhân sự đang quản lý</h4>
                <p className="mb-1">Đang làm việc: {staffSummary.activeStaff}</p>
                <p className="mb-0">Ca sáng hôm nay: {staffSummary.morningShift}</p>
              </div>

              {feedbackMessage ? <p className="product-feedback mb-0 mt-3">{feedbackMessage}</p> : null}
            </Card.Body>
          </Card>
        </Col>

        <Col xl={7}>
          <Card className="data-card h-100">
            <Card.Body>
              <div className="section-head">
                <div>
                  <p className="section-kicker">Danh sách</p>
                  <h3>Nhân sự trong hệ thống</h3>
                </div>
              </div>

              <Table responsive hover className="align-middle custom-table">
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Nhân sự</th>
                    <th>Chức vụ</th>
                    <th>Ca làm</th>
                    <th>Liên hệ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {staffMembers.map((staffMember) => (
                    <tr key={staffMember.id}>
                      <td>{staffMember.id}</td>
                      <td>
                        <strong>{staffMember.fullName}</strong>
                        <div className="table-subtext">{staffMember.email}</div>
                      </td>
                      <td>{staffMember.role}</td>
                      <td>{staffMember.shift}</td>
                      <td>{staffMember.phone}</td>
                      <td>
                        <Badge bg={staffMember.status === 'Đang làm việc' ? 'success' : staffMember.status === 'Đang nghỉ phép' ? 'warning' : 'secondary'}>
                          {staffMember.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="table-actions">
                          <Button variant="outline-dark" size="sm" onClick={() => handleEdit(staffMember)}>
                            Sửa
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(staffMember.id)}>
                            Xóa
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default StaffManagementSection;
