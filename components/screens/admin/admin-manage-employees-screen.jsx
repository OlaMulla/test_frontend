import React from "react";
import styles from "@/styles/admin/manage-employees.module.css";
import useLoading from "@/hooks/use-loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import useWarningDialog from "@/hooks/use-warning-dialog";
import { Button, Form, Modal } from "react-bootstrap";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import useSession from "@/hooks/use-session";
import AdminManageEmployeesModals from "@/components/admin/AdminManageEmployeesModals";

function AdminManageEmployeesScreen() {
  const { setLoading } = useLoading();
  const { session } = useSession();
  const { openWarningDialog, closeWarningDialog } = useWarningDialog();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newEmployeeForm, setNewEmployeeForm] = React.useState({
    last_name: "",
    password: "",
    first_name: "",
    email: "",
  });
  const [viewedEmployee, setViewedEmployee] = React.useState();
  const [editedEmployee, setEditedEmployee] = React.useState();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "view-employees"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/admin/employees",
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });
  const {
    mutateAsync: deleteEmployee,
    data: deletionData,
    error: deletetionError,
    isPending: isDeletionPending,
  } = useMutation({
    mutationKey: ["admin", "delete-employee"],
    mutationFn: async (id) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/admin/employee/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });
  const {
    mutateAsync: createEmployee,
    data: creationData,
    error: creationError,
    isPending: isCreationPending,
  } = useMutation({
    mutationKey: ["admin", "create-employee"],
    mutationFn: async ({
      last_name,
      password,
      first_name,
      email,
    }) => {
      const body = JSON.stringify({
        last_name,
        password,
        first_name,
        email,
      });
      console.log({ body });
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/admin/employee",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session?.token}`,
              "Content-Type": "application/json",
            },
            body,
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const {
    mutateAsync: updateEmployee,
    data: updateData,
    error: updateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationKey: ["admin", "update-employee"],
    mutationFn: async ({
      last_name,
      password,
      first_name,
      email,
    }) => {
      console.log({ last_name, password, first_name, email });
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/admin/employee/" +
          editedEmployee?._id,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
          }),
        }
      );
      console.log({ response });
      return await response.json();
    },
  });

  const onDelete = React.useCallback(
    (id) => {
      openWarningDialog({
        title: "Delete Employee",
        content: "Are you sure you want to delete this employee?",
        withCancel: true,
        onCancel: () => closeWarningDialog(),
        onConfirm: async () => {
          closeWarningDialog();
          const data = await deleteEmployee(id);
          console.log({ data });
          if (deletetionError) {
            openWarningDialog({
              title: "Error",
              content: deletetionError.message,
            });
          } else {
            closeWarningDialog();
            openWarningDialog({
              title: "Success",
              content: "Employee deleted successfully",
            });
            refetch();
          }
        },
      });
    },
    [deletetionError]
  );

  const onCreate = React.useCallback(
    (enployeeForm) => {
      console.log({ enployeeForm });
      if (
        !enployeeForm.last_name ||
        !enployeeForm.password ||
        !enployeeForm.first_name ||
        !enployeeForm.email
      ) {
        openWarningDialog({
          title: "Error",
          content: "Please fill all the fields",
        });
        return;
      }

      openWarningDialog({
        title: "Create Employee",
        content: "Are you sure you want to create this employee?",
        onConfirm: async () => {
          closeWarningDialog();
          const creationData = await createEmployee(enployeeForm);
          if (creationError) {
            openWarningDialog({
              title: "Error",
              content: creationError.message,
            });
          } else if (!creationData?.employee) {
            openWarningDialog({
              title: "Error",
              content: "Something went wrong",
            });
          } else {
            closeWarningDialog();
            openWarningDialog({
              title: "Success",
              content: "Employee created successfully",
            });
            refetch();
          }
        },
      });
    },
    [openWarningDialog]
  );

  const onView = React.useCallback(
    (id) => {
      setViewedEmployee(data?.find((employee) => employee._id === id));
    },
    [data]
  );

  const onEdit = React.useCallback(() => {
    if (
      !editedEmployee?.last_name ||
      !editedEmployee?.first_name ||
      !editedEmployee?.email
    ) {
      openWarningDialog({
        title: "Error",
        content:
          "Please fill all the fields, only password is optional to update",
      });
      return;
    }

    return openWarningDialog({
      title: "Update Employee",
      content: "Are you sure you want to update this employee?",
      withCancel: true,
      onCancel: () => closeWarningDialog(),
      onConfirm: async () => {
        // setLoading(true);
        closeWarningDialog();
        const updateData = await updateEmployee({
          last_name: editedEmployee?.last_name,
          password:
            editedEmployee?.password !==
            data?.find((e) => e._id === editedEmployee._id)?.password
              ? editedEmployee?.password
              : undefined,
          first_name: editedEmployee?.first_name,
          email: editedEmployee?.email,
        });
        if (updateError) {
          openWarningDialog({
            title: "Error",
            content: updateError.message,
          });
        } else if (!updateData?.employee) {
          console.log({ updateData });
          openWarningDialog({
            title: "Error",
            content: "Something went wrong",
          });
        } else {
          closeWarningDialog();
          openWarningDialog({
            title: "Success",
            content: "Employee updated successfully",
          });
          refetch();
          // setLoading(false);
        }
      },
    });
  }, [editedEmployee, data]);

  React.useEffect(() => {
    setLoading(
      isLoading || isDeletionPending || isCreationPending || isUpdatePending
    );
  }, [
    isLoading,
    setLoading,
    isDeletionPending,
    isCreationPending,
    isUpdatePending,
  ]);

  return (
    <div className={styles.main}>
      {/* ------------------------- */}
      <Button
        onClick={() => setIsCreateDialogOpen(true)}
        className={styles.create}
      >
        <Plus /> New Employee
      </Button>
      <br />
      <br />
      
      {/* -------------------------- */}
      {!isLoading &&
        !error &&
        (data?.length < 1 ? (
          <p>No Employees Yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((employee, index) => (
                <tr key={index} className={styles.tr}>
                  <td>{index + 1}</td>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => onView(employee._id)}
                    >
                      <Eye />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() =>
                        setEditedEmployee(
                          data?.find((e) => e._id === employee._id)
                        )
                      }
                    >
                      <Edit />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(employee._id)}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      {/* -------------------------- */}
      <AdminManageEmployeesModals isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} newEmployeeForm={newEmployeeForm} setNewEmployeeForm={setNewEmployeeForm} viewedEmployee={viewedEmployee} setViewedEmployee={setViewedEmployee} editedEmployee={editedEmployee} setEditedEmployee={setEditedEmployee} onCreate={onCreate} onEdit={onEdit} />
    </div>
  );
}

export default AdminManageEmployeesScreen;