import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";

const ChecPolicy = ({ checked, setChecked }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchPolicyContent = async () => {
      try {
        const response = await fetch("terminos_condiciones.html");
        const html = await response.text();
        setHtmlContent(html);
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
      <button className="span" onClick={handleDialogOpen}>
        Data Privacy Policy
      </button>
      <Dialog
        header="Política de Privacidad de Datos"
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

// Define PropTypes para validar las props
ChecPolicy.propTypes = {
  checked: PropTypes.bool.isRequired, // Propiedad 'checked' debe ser de tipo booleano y requerida
  setChecked: PropTypes.func.isRequired, // Propiedad 'setChecked' debe ser de tipo función y requerida
};

export default ChecPolicy;
