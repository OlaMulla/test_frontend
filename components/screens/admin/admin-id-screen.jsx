import React from "react";
import { Card } from "react-bootstrap";
import { Settings, Users } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/admin/id.module.css";

function AdminIdScreen({ id }) {
  return (
    <section>
      <Link href={`/admin/${id}/view-employees`}>
        <Card
          className={styles.card1}
          style={{
            textAlign: "center",
          }}
        >
          <Card.Body
            style={{
              padding: "40px",
              cursor: "pointer",
            }}
          >
            <Users size={80} />
            <br />
            <br />
            <Card.Title>
              <h3>View Employees</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
      {/* ---- */}
      <Link href={`/admin/${id}/manage-employees`}>
        <Card
          className={styles.card2}
          style={{
            textAlign: "center",
          }}
        >
          <Card.Body
            style={{
              padding: "40px",
              cursor: "pointer",
            }}
          >
            <Settings size={80} />
            <br />
            <br />
            <Card.Title>
              <h3>Manage Employees</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </section>
  );
}

export default AdminIdScreen;
