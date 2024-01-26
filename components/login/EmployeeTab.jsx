import { Lock, User } from "lucide-react";
import { Button, Form, InputGroup } from "react-bootstrap";

const EmployeeTab = ({
  onEmployeeSubmit,
  setEmail,
  setPassword,
}) => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <User />
        </InputGroup.Text>
        <Form.Control
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon1"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <Lock />
        </InputGroup.Text>
        <Form.Control
          placeholder="Password"
          aria-label="Password"
          type="password"
          aria-describedby="basic-addon1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <Button onClick={onEmployeeSubmit}>Enter</Button>
    </>
  );
};

export default EmployeeTab;
