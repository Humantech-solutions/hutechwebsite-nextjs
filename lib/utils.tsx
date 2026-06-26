import React from 'react';

/**
 * Parses a string to dynamically apply line breaks, bolding, and accent colors.
 * 
 * Syntax:
 * - `|` : Adds a line break AND toggles the accent color
 * - `^` : Toggles the accent color without a line break
 * - `\n`, `\\n`, `\\` : Adds a line break without toggling color
 * - `"text"` or `'text'` : Makes the text bold
 */
export const renderTitle = (
  title: string | React.ReactNode, 
  baseColorClass: string = "text-inherit",
  accentColorClass: string = "text-[#F99D1C]",
  secondaryColorClass: string = "text-[#0171c1]"
) => {
  if (typeof title !== 'string') return title;
  
  // Split by separators including ~
  const parts = title.split(/(\||\n|\\\\|\\n|\^|~)/);
  
  let isAccent = false;
  let isSecondary = false;
  const renderedContent: React.ReactNode[] = [];
  let currentText = "";
  
  const pushCurrentText = (index: number) => {
    if (currentText) {
      let colorClass = baseColorClass;
      if (isAccent) colorClass = accentColorClass;
      else if (isSecondary) colorClass = secondaryColorClass;

      renderedContent.push(
        <span key={`text-${index}`} className={colorClass}>
          {formatQuotesToBold(currentText)}
        </span>
      );
    }
  };

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    if (part === '|') {
      pushCurrentText(i);
      renderedContent.push(<br key={`br-${i}`} />);
      isAccent = !isAccent;
      isSecondary = false;
      currentText = "";
    } else if (part === '^') {
      pushCurrentText(i);
      isAccent = !isAccent;
      isSecondary = false;
      currentText = "";
    } else if (part === '~') {
      pushCurrentText(i);
      isSecondary = !isSecondary;
      isAccent = false;
      currentText = "";
    } else if (part === '\\\\' || part === '\n' || part === '\\n') {
      pushCurrentText(i);
      renderedContent.push(<br key={`br-${i}`} />);
      currentText = "";
    } else {
      currentText += part;
    }
  }
  
  if (currentText) {
    pushCurrentText(parts.length);
  }

  if (renderedContent.length === 0) {
    return formatQuotesToBold(title);
  }

  return <>{renderedContent}</>;
};

export const formatQuotesToBold = (text: string) => {
  if (!text) return text;
  const parts = text.split(/(["“'‘].*?["”'’])/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      // Remove quotes and wrap in bold
      const content = part.slice(1, -1);
      return <span key={i} className="font-bold">{content}</span>;
    }
    return part;
  });
};
