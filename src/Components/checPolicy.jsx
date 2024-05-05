import React, { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";

const ChecPolicy = ({ checked, setChecked }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchPolicyContent = async () => {
      try {
        const response = await fetch("poli.html");
        const html = await response.text();
        setHtmlContent(html);
        setVisible(true);
      } catch (error) {
        console.error("Error fetching policy content:", error);
      }
    };

    fetchPolicyContent();
  }, []);


  const handleDialogOpen = () => {
    setShowDialog(true);
  };


  const handleDialogClose = () => {
    setShowDialog(false);
  };
  return (
    <div className="check card flex justify-content-center">
      <Checkbox
        onChange={(e) => setChecked(e.checked)}
        checked={checked}
      ></Checkbox>{" "}
      I agree to HandyFix's{" "}
      <span className="span" onClick={handleDialogOpen}>
        Data Privacy Policy
      </span>
      <Dialog
        header="Data Privacy Policy"
        visible={showDialog}
        onHide={handleDialogClose}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
      >
        {/* Contenido de la política de privacidad */}
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{ maxWidth: "100%", overflowWrap: "break-word" }} // Aplicamos estilos CSS para ajustar el ancho y envolver el contenido
        />
      </Dialog>
    </div>
  );
};

export default ChecPolicy;
