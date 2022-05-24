import "./Screen.css";

const Screen = ({ value, error, disabled }) => {
  return (
    <div className="flex-direection">
      <input 
        className="screen" mode="single"
        value={value}
        disabled={disabled === 5 ? true : false}
      />
      {error ? <span className="color-text">Enter 6 Digits</span>: null}
    </div>
  );
};

export default Screen;