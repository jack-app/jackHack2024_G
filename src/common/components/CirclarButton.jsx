import PropTypes from "prop-types";

const CirclarButton = (props) => {
  // propsを分割代入
  const { color, icon, onClick } = props;
  const circlarButtonStyle = {
    border: `5px solid ${color}`,
    backgroundColor: "#FFFFFF",
    height: "80px",
    borderRadius: "50%",
    width: "80px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    color: `${color}`,
    transition: "0.2s cubic-bezier(0.45, 0, 0.55, 1)",
  };

  return (
    <>
      <div
        style={circlarButtonStyle}
        className="fuwatto"
        onClick={() => onClick()}
      >
        <i className={`fas fa-${icon} fa-2x`}></i>
      </div>
    </>
  );
};

CirclarButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default CirclarButton;
