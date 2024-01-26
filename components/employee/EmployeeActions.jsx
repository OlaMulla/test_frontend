import { Calendar, Info, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "@/styles/employee/id.module.css";

const EmployeeActions = ({
    id,
    checkData,
    onCheckIn,
    onCheckOut,
  }) => {
    return (
      <section className={styles.actions}>
          <div className={styles.wrapper}>
            <Button
              variant="primary"
              disabled={
                checkData?.attendance?.checked_in ||
                moment().isBefore(moment({ hour: 7, minute: 0 }))
              }
              onClick={onCheckIn}
            >
              <PanelLeftOpen />
              Check In
            </Button>
            <p>
              <span>
                <Info size={18} />
              </span>{" "}
              Check-in starts from 07:00 AM and only once a day, any check-in
              after 08:30 AM will be marked as late check-in.
            </p>
          </div>
          <div className={styles.wrapper}>
            <Button
              variant="danger"
              onClick={onCheckOut}
              disabled={
                checkData?.attendance?.checked_out ||
                !checkData?.attendance?.checked_in
              }
            >
              <PanelLeftClose />
              Check Out
            </Button>
            <p>
              <span>
                <Info size={18} />
              </span>{" "}
              Check-out must be done at 04:00 PM and only once a day.
            </p>
          </div>
          <div className={styles.wrapper}>
            <Link
              href={`/employee/${id}/attendance`}
              style={{
                marginTop: "20px",
              }}
            >
              <Button
                variant="secondary"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "15px",
                }}
              >
                <Calendar />
                View My Attendance
              </Button>
            </Link>
            <p
              style={{
                marginTop: "15px",
              }}
            >
              <span>
                <Info size={18} />
              </span>{" "}
              View your attendance history.
            </p>
          </div>
        </section>
    )
  }

export default EmployeeActions