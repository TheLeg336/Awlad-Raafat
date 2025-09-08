import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  textKey: string;
  isEditMode: boolean;
  onUpdate: (key: string, value: string) => void;
  children: string;
  useTextarea?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  textKey,
  isEditMode,
  onUpdate,
  children,
  useTextarea = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(children);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentText(children);
  }, [children]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  const handleBlur = () => {
    setIsEditing(false);
    if (currentText.trim() !== children) {
      onUpdate(textKey, currentText.trim());
    } else {
      setCurrentText(children); // Revert if unchanged or just whitespace
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (!useTextarea || e.shiftKey === false)) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setCurrentText(children);
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    // Return as a fragment or string
    return <>{children}</>;
  }

  if (isEditing) {
    const commonProps = {
      ref: inputRef as any,
      value: currentText,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentText(e.target.value),
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
      className: `bg-[var(--color-background)] text-[var(--color-text-primary)] border-2 border-[var(--color-primary)] rounded-md outline-none w-full p-1 z-10 relative`,
    };

    return useTextarea ? (
      <textarea {...commonProps} rows={5} />
    ) : (
      <input type="text" {...commonProps} />
    );
  }

  return (
    <span
      className="cursor-pointer transition-all duration-200 hover:outline-dashed hover:outline-2 hover:outline-[var(--color-primary)] hover:outline-offset-2 rounded-sm"
      onClick={(e) => { e.stopPropagation(); setIsEditing(true);}}
      title="Click to edit"
    >
      {children}
    </span>
  );
};

export default EditableText;