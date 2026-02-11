type Parms = {
  size: number;
};

const Spacing = (parms: Parms) => {
  const { size } = parms;
  return <div style={{ height: `${size}px`, width: "100%", flexShrink: 0 }} />;
};

export default Spacing;
