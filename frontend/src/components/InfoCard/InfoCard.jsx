import "./InfoCard.scss";

const InfoCard = ({ header, info }) => (
  <div className="info-card">
    <div className="info-card-header">
      <p>{header}</p>
    </div>
    <div className="info-card-body">
      <p>{info}</p>
    </div>
  </div>
);

export default InfoCard;
