const EditorPreview = ({ content }) => {
  return (
    <div
      className="flex flex-col"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default EditorPreview;
