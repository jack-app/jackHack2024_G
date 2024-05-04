import PropTypes from "prop-types";

const CirclarButton = (props) => {
  // propsを分割代入
  const { color, icon } = props;
  const circlarButtonStyle = {
    border: `5px solid ${color}`,
    backgroundColor: "#FFFFFF",
    height: "70px",
    borderRadius: "50%",
    width: "70px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    color: `${color}`,
    transition: "0.2s cubic-bezier(0.45, 0, 0.55, 1)",
  };

  return (
    <>
      <div style={circlarButtonStyle} className="fuwatto">
        <i className={`fas fa-${icon} fa-2x`}></i>
      </div>
    </>
  );
};

CirclarButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
};

export default CirclarButton;
