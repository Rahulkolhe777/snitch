export const Loader = ({ message = 'Loading...', size = 'md', fullScreen = false }) => {
  const content = (
    <div className={`loader-container loader-${size}`}>
      <div className="spinner" />
      {message && <p className="loader-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="loader-fullscreen-backdrop">{content}</div>;
  }

  return content;
};

export default Loader;
