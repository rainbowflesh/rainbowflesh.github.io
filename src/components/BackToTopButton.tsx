export const BackToTopButton = () => {
  return (
    <button
      className="btn"
      onClick={() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }}
    >
      Back to top
    </button>
  );
};
