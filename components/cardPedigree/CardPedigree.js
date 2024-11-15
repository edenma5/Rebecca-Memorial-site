import { CAlert, CCard, CCardBody, CCardImage, CCardText } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

const CardPedigree = ({ data }) => {
  return (
    <>
      <CCard style={{ width: "12rem" }}>
        <CCardImage
          style={{ height: "9rem" }}
          orientation="top"
          src={data.imageSrc}
        />
        <CCardBody>
          <CCardText>{data.name}</CCardText>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CardPedigree;
