import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useAuth } from '../AuthContext';
import EditIcon from './icons/EditIcon';

interface EditableTextProps {
  textKey: string;
  onUpdate: (key: string, value: string) => void;
  children: React.ReactElement;
}

const EditableText: React.FC<EditableTextProps> = ({ textKey, onUpdate, children }) => {
  const { isEditMode } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  // FIX: Cast children.props to `any` to safely access properties like `children`, `style`, and `className`.
  // This resolves TypeScript errors about properties not existing on type `unknown`.
  const childProps = children.props as any;
  const originalText = childProps.children;
  const [text, setText] = useState(originalText);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(originalText);
  }, [originalText]);

  useLayoutEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Auto-resize textarea
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [isEditing, text]);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  if (!isEditMode) {
    return children;
  }

  const handleSave = () => {
    if(text.trim() !== originalText) {
        onUpdate(textKey, text.trim());
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSave();
    }
    if (e.key === 'Escape') {
        setIsEditing(false);
        setText(originalText);
    }
  };
  
  const handleWrapperClick = () => {
    if (!isEditing) {
        setIsEditing(true);
    }
  }

  if (isEditing) {
    const style = {
        ...childProps.style,
        width: '100%',
        background: 'transparent',
        border: '2px solid var(--color-primary)',
        borderRadius: '4px',
        padding: '2px',
        margin: '-3px', // offset for border and padding
        resize: 'none',
        overflow: 'hidden',
        outline: 'none',
        color: 'inherit',
        font: 'inherit',
        textAlign: childProps.className?.includes('text-center') ? 'center' : 'inherit',
    };

    return (
        <textarea
            ref={inputRef}
            value={text}
            onChange={handleTextChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={childProps.className}
            style={style}
            rows={1}
        />
    );
  }

  return (
    <div className="relative group/editable editable-container" onClick={handleWrapperClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleWrapperClick()}>
      {children}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover/editable:opacity-100 transition-opacity p-1 bg-yellow-400 rounded-full cursor-pointer shadow-lg">
        <EditIcon className="w-4 h-4 text-black" />
      </div>
      <style>{`
        .editable-container {
          outline: 2px dashed transparent;
          transition: outline-color 0.2s;
          border-radius: 4px;
        }
        .editable-container:hover, .editable-container:focus {
          outline-color: rgba(251, 191, 36, 0.5); /* yellow-400 with opacity */
        }
      `}</style>
    </div>
  );
};

export default EditableText;
