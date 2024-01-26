import { Mail, User } from "lucide-react";
import { Card } from "react-bootstrap";
import styles from "@/styles/employee/id.module.css";

const EmployeeInfo = (
    {
      employee
    }) => {
    return (
      <section>
          <Card>
            <Card.Header>Employee Info</Card.Header>
            <Card.Body className={styles.info}>
              <div className={styles.infoWrapper}>
                <User />
                {employee?.first_name} {employee?.last_name}
              </div>
              <hr />
              <div className={styles.infoWrapper}>
                <Mail />
                {employee?.email}
              </div>
            </Card.Body>
          </Card>
        </section>
    )
  }

export default EmployeeInfo