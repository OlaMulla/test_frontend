import { Nunito } from "next/font/google";

import React from "react";
import useLoading from "@/hooks/use-loading";
import useWarningDialog from "@/hooks/use-warning-dialog";

const nunito = Nunito({ subsets: ["latin"] });

function AppWrapper({
  children,
}) {
  const { Loading } = useLoading();
  const { WarningDialog } = useWarningDialog();
  return (
    <div className={nunito.className}>
      <Loading />
      <WarningDialog />
      {children}
    </div>
  );
}

export default AppWrapper;
